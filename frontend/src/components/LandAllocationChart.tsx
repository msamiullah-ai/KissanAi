import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { LandAllocationItem } from '../types/recommendation';

interface LandAllocationChartProps {
  allocation: LandAllocationItem[];
}

const palette = ['#10B981', '#22C55E', '#38BDF8', '#F59E0B', '#A855F7'];

const LandAllocationChart = ({ allocation }: LandAllocationChartProps) => {
  const chartData = allocation.map((item) => ({ name: item.crop_name, value: item.allocation_percentage }));

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6 text-slate-400">
        <p className="text-sm">Land allocation data is unavailable. Generate a recommendation first.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Land allocation</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Field distribution</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">Responsive chart</span>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={96} paddingAngle={4} cornerRadius={20} animationDuration={1200}>
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} contentStyle={{ background: '#051f12', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {allocation.map((segment) => (
          <div key={segment.crop_name} className="rounded-3xl bg-slate-900/80 p-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{segment.crop_name}</p>
            <p className="mt-2 text-xl font-semibold text-white">{segment.allocation_percentage}%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400" style={{ width: `${segment.allocation_percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandAllocationChart;
