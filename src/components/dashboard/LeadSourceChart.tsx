import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Website', value: 35, color: 'hsl(217, 91%, 60%)' },
  { name: 'Facebook', value: 25, color: 'hsl(221, 83%, 53%)' },
  { name: 'Google Ads', value: 20, color: 'hsl(0, 84%, 60%)' },
  { name: 'Referral', value: 12, color: 'hsl(270, 60%, 55%)' },
  { name: 'Walk-in', value: 5, color: 'hsl(142, 76%, 36%)' },
  { name: 'Events', value: 3, color: 'hsl(43, 96%, 56%)' },
];

export function LeadSourceChart() {
  return (
    <div className="stat-card h-[400px] animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-4">Lead Sources</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value: number) => [`${value}%`, 'Share']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
