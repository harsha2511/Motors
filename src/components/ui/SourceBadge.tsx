import { cn } from '@/lib/utils';
import { LeadSource, sourceLabels } from '@/data/mockLeads';
import { 
  Globe, 
  Facebook, 
  Chrome, 
  Twitter, 
  Users, 
  Store, 
  Calendar 
} from 'lucide-react';

interface SourceBadgeProps {
  source: LeadSource;
  className?: string;
  showLabel?: boolean;
}

const sourceIcons: Record<LeadSource, React.ElementType> = {
  website: Globe,
  facebook: Facebook,
  google: Chrome,
  twitter: Twitter,
  referral: Users,
  'walk-in': Store,
  event: Calendar,
};

const sourceColors: Record<LeadSource, string> = {
  website: 'text-info bg-info/10',
  facebook: 'text-blue-600 bg-blue-100',
  google: 'text-red-500 bg-red-100',
  twitter: 'text-sky-500 bg-sky-100',
  referral: 'text-purple-500 bg-purple-100',
  'walk-in': 'text-emerald-500 bg-emerald-100',
  event: 'text-amber-500 bg-amber-100',
};

export function SourceBadge({ source, className, showLabel = true }: SourceBadgeProps) {
  const Icon = sourceIcons[source];
  
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
      sourceColors[source],
      className
    )}>
      <Icon className="w-3.5 h-3.5" />
      {showLabel && sourceLabels[source]}
    </span>
  );
}
