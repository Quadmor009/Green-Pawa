import { BarChart as RechartsBarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

export default function BarChartComponent({ data }) {
  return (
    <div style={{ width: '100%', height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }} barCategoryGap={8}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#A09890' }}
          />
          <Bar dataKey="kwh" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill="#5258ED"
                fillOpacity={entry.active ? 1 : 0.6}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
