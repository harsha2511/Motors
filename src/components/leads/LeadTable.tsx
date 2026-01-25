import { Lead } from '@/data/mockLeads';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { Phone, Mail, MoreVertical, Eye, Star } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

interface LeadTableProps {
  leads: Lead[];
  selectedLeads: string[];
  onSelectLead: (id: string) => void;
  onSelectAll: () => void;
  onViewLead: (lead: Lead) => void;
}

const priorityColors = {
  high: 'text-destructive',
  medium: 'text-warning',
  low: 'text-muted-foreground',
};

export function LeadTable({ 
  leads, 
  selectedLeads, 
  onSelectLead, 
  onSelectAll,
  onViewLead 
}: LeadTableProps) {
  const allSelected = leads.length > 0 && selectedLeads.length === leads.length;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 w-12">
                <Checkbox 
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Lead</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Contact</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Interest</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Source</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Assigned To</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Created</th>
              <th className="text-left p-4 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                className="table-row-hover border-b border-border last:border-0"
                onClick={() => onViewLead(lead)}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={() => onSelectLead(lead.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <Star className={`w-3 h-3 ${priorityColors[lead.priority]}`} fill="currentColor" />
                      </div>
                      <p className="text-sm text-muted-foreground">{lead.budget}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[180px]">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lead.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground font-medium">{lead.interestedIn}</p>
                </td>
                <td className="p-4">
                  <SourceBadge source={lead.source} />
                </td>
                <td className="p-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{lead.assignedTo || '-'}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                  </p>
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewLead(lead)}>
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="w-4 h-4 mr-2" /> Call Now
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" /> Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Mark as Not Interested
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
