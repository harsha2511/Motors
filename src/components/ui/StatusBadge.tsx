import { cn } from '@/lib/utils';
import { LeadStatus, statusLabels } from '@/data/mockLeads';

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

const statusStyles: Record<LeadStatus, string> = {
  new: 'status-new',
  contacted: 'status-contacted',
  qualified: 'status-qualified',
  'not-interested': 'status-not-interested',
  converted: 'status-converted',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn('status-badge', statusStyles[status], className)}>
      {statusLabels[status]}
    </span>
  );
}
