import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', leads: 45, conversions: 12 },
  { month: 'Feb', leads: 52, conversions: 15 },
  { month: 'Mar', leads: 48, conversions: 14 },
  { month: 'Apr', leads: 61, conversions: 18 },
  { month: 'May', leads: 55, conversions: 16 },
  { month: 'Jun', leads: 67, conversions: 22 },
  { month: 'Jul', leads: 72, conversions: 25 },
];

export function ConversionChart() {
  return (
    <div className="stat-card h-[400px] animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-4">Lead & Conversion Trends</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="leads" 
            stroke="hsl(217, 91%, 60%)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorLeads)" 
            name="Total Leads"
          />
          <Area 
            type="monotone" 
            dataKey="conversions" 
            stroke="hsl(43, 96%, 56%)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorConversions)" 
            name="Conversions"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
