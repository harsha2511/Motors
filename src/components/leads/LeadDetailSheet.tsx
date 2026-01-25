import { Lead, statusLabels, teamMembers } from '@/data/mockLeads';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Phone, 
  Mail, 
  Calendar, 
  Car, 
  DollarSign, 
  User, 
  Clock,
  MessageSquare,
  Plus,
  CheckCircle2
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface LeadDetailSheetProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailSheet({ lead, open, onOpenChange }: LeadDetailSheetProps) {
  const [newNote, setNewNote] = useState('');

  if (!lead) return null;

  const timeline = [
    { 
      type: 'created', 
      date: lead.createdAt, 
      text: 'Lead created from ' + lead.source 
    },
    ...(lead.lastContactedAt ? [{
      type: 'contacted',
      date: lead.lastContactedAt,
      text: 'Contacted by ' + (lead.assignedTo || 'team member')
    }] : []),
    ...lead.notes.map((note, i) => ({
      type: 'note',
      date: new Date(new Date(lead.createdAt).getTime() + (i + 1) * 3600000).toISOString(),
      text: note
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-6 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <SheetTitle className="text-2xl">{lead.name}</SheetTitle>
              <div className="flex items-center gap-2 mt-2">
                <StatusBadge status={lead.status} />
                <SourceBadge source={lead.source} />
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button className="flex-1" variant="default">
              <Phone className="w-4 h-4 mr-2" /> Call
            </Button>
            <Button className="flex-1" variant="outline">
              <Mail className="w-4 h-4 mr-2" /> Email
            </Button>
            <Button className="flex-1" variant="outline">
              <Calendar className="w-4 h-4 mr-2" /> Schedule
            </Button>
          </div>

          {/* Lead Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Car className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Interested In</span>
              </div>
              <p className="font-semibold text-foreground">{lead.interestedIn}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Budget</span>
              </div>
              <p className="font-semibold text-foreground">{lead.budget}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <User className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Assigned To</span>
              </div>
              <Select defaultValue={lead.assignedTo}>
                <SelectTrigger className="border-0 p-0 h-auto font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Created</span>
              </div>
              <p className="font-semibold text-foreground">
                {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Update Status */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Update Status</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusLabels).map(([value, label]) => (
                <Button
                  key={value}
                  variant={lead.status === value ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {lead.status === value && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Add Note */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Add Note</h4>
            <div className="space-y-2">
              <Textarea 
                placeholder="Write a note about this lead..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <Button size="sm" disabled={!newNote.trim()}>
                <Plus className="w-4 h-4 mr-1" /> Add Note
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Activity Timeline</h4>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === 'created' ? 'bg-info/10 text-info' :
                      item.type === 'contacted' ? 'bg-success/10 text-success' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {item.type === 'created' ? <User className="w-4 h-4" /> :
                       item.type === 'contacted' ? <Phone className="w-4 h-4" /> :
                       <MessageSquare className="w-4 h-4" />}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-px h-full bg-border flex-1 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(item.date), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Contact Information</h4>
            <div className="space-y-2">
              <a 
                href={`mailto:${lead.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" /> {lead.email}
              </a>
              <a 
                href={`tel:${lead.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" /> {lead.phone}
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
