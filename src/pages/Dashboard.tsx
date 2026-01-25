import { Users, TrendingUp, Target, Clock } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { LeadSourceChart } from '@/components/dashboard/LeadSourceChart';
import { ConversionChart } from '@/components/dashboard/ConversionChart';
import { RecentLeads } from '@/components/dashboard/RecentLeads';
import { TeamPerformance } from '@/components/dashboard/TeamPerformance';

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your sales overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Leads"
          value="247"
          change={12}
          changeLabel="vs last month"
          icon={<Users className="w-6 h-6" />}
          accentColor="info"
        />
        <StatCard
          title="Conversion Rate"
          value="32%"
          change={5}
          changeLabel="vs last month"
          icon={<TrendingUp className="w-6 h-6" />}
          accentColor="success"
        />
        <StatCard
          title="Qualified Leads"
          value="89"
          change={-3}
          changeLabel="vs last month"
          icon={<Target className="w-6 h-6" />}
          accentColor="accent"
        />
        <StatCard
          title="Avg. Response Time"
          value="2.4h"
          change={15}
          changeLabel="faster than last month"
          icon={<Clock className="w-6 h-6" />}
          accentColor="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ConversionChart />
        </div>
        <LeadSourceChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentLeads />
        <TeamPerformance />
      </div>
    </div>
  );
}
