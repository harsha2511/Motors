import { useState } from 'react';
import { Lead, LeadStatus, teamMembers } from '@/data/mockLeads';
import { useLeads } from '@/context/LeadsContext';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  Phone, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  GripVertical,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const columns: { status: LeadStatus; label: string; icon: React.ElementType; color: string }[] = [
  { status: 'new', label: 'New Leads', icon: Users, color: 'bg-info' },
  { status: 'contacted', label: 'Contacted', icon: Phone, color: 'bg-warning' },
  { status: 'qualified', label: 'Qualified', icon: CheckCircle, color: 'bg-success' },
  { status: 'converted', label: 'Converted', icon: ArrowRight, color: 'bg-accent' },
];

const statusFlow: LeadStatus[] = ['new', 'contacted', 'qualified', 'converted'];

export default function LeadManagement() {
  const { leads, updateLeadStatus } = useLeads();
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const visibleLeads =
    assigneeFilter === 'all'
      ? leads
      : leads.filter(
          (lead) =>
            lead.assignedTo ===
            teamMembers.find((m) => m.id === assigneeFilter)?.name
        );

  const getLeadsByStatus = (status: LeadStatus) =>
    visibleLeads.filter((lead) => lead.status === status);

  const moveLead = (lead: Lead, direction: 'forward' | 'back') => {
    const index = statusFlow.indexOf(lead.status);
    const nextIndex = direction === 'forward' ? index + 1 : index - 1;
    if (index === -1 || nextIndex < 0 || nextIndex >= statusFlow.length) return;
    updateLeadStatus(lead.id, statusFlow[nextIndex]);
  };

  const markNotInterested = (lead: Lead) => {
    updateLeadStatus(lead.id, 'not-interested');
    toast({
      title: 'Lead updated',
      description: `${lead.name} marked as not interested.`,
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
          <p className="text-muted-foreground mt-1">
            Drag and drop leads to update their status
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Assigned to:</span>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm font-medium text-foreground"
            >
              <option value="all">All Team Members</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-6">
        {columns.map((column) => {
          const columnLeads = getLeadsByStatus(column.status);
          return (
            <div key={column.status} className="flex flex-col">
              {/* Column Header */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-card rounded-xl border border-border">
                <div className={`w-8 h-8 rounded-lg ${column.color} flex items-center justify-center`}>
                  <column.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{column.label}</h3>
                  <p className="text-xs text-muted-foreground">{columnLeads.length} leads</p>
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-3 min-h-[400px] p-3 bg-secondary/30 rounded-xl">
                {columnLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onMoveForward={() => moveLead(lead, 'forward')}
                    onMoveBack={() => moveLead(lead, 'back')}
                    onMarkNotInterested={() => markNotInterested(lead)}
                  />
                ))}
                {columnLeads.length === 0 && (
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-xl">
                    <p className="text-sm text-muted-foreground">Drop leads here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Not Interested Section */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-destructive flex items-center justify-center">
            <XCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Not Interested</h3>
            <p className="text-xs text-muted-foreground">
              {getLeadsByStatus('not-interested').length} leads
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap p-4 bg-destructive/5 rounded-xl border border-destructive/20 min-h-[80px]">
          {getLeadsByStatus('not-interested').map((lead) => (
            <div 
              key={lead.id}
              className="px-3 py-2 bg-card rounded-lg border border-border flex items-center gap-2"
            >
              <span className="text-sm font-medium">{lead.name}</span>
              <span className="text-xs text-muted-foreground">• {lead.interestedIn}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface LeadCardProps {
  lead: Lead;
  onMoveForward: () => void;
  onMoveBack: () => void;
  onMarkNotInterested: () => void;
}

function LeadCard({ lead, onMoveForward, onMoveBack, onMarkNotInterested }: LeadCardProps) {
  const canMoveForward = lead.status !== 'converted';
  const canMoveBack = lead.status !== 'new';

  return (
    <Card className="p-4 cursor-grab hover:shadow-md transition-shadow bg-card">
      <div className="flex items-start gap-3">
        <div className="p-1 text-muted-foreground hover:text-foreground cursor-grab">
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-sm text-foreground truncate">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{lead.phone}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onMoveForward} disabled={!canMoveForward}>
                  Move to Next Stage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onMoveBack} disabled={!canMoveBack}>
                  Move Back a Stage
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={onMarkNotInterested}>
                  Mark Not Interested
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-foreground font-medium mb-2 truncate">{lead.interestedIn}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{lead.budget}</span>
            {lead.assignedTo && (
              <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                {lead.assignedTo.split(' ')[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
