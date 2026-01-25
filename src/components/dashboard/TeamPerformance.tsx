import { teamMembers } from '@/data/mockLeads';
import { Progress } from '@/components/ui/progress';

const teamStats = [
  { ...teamMembers[0], conversions: 8, target: 10 },
  { ...teamMembers[1], conversions: 12, target: 15 },
  { ...teamMembers[2], conversions: 5, target: 8 },
];

export function TeamPerformance() {
  return (
    <div className="stat-card animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-6">Team Performance</h3>
      <div className="space-y-5">
        {teamStats.map((member) => {
          const percentage = Math.round((member.conversions / member.target) * 100);
          return (
            <div key={member.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground font-semibold text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{member.conversions}/{member.target}</p>
                  <p className="text-xs text-muted-foreground">conversions</p>
                </div>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
