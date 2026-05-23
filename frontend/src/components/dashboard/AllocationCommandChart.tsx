import { motion } from 'framer-motion';
import { Cell, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { LandAllocationItem } from '../../types/recommendation';

interface AllocationCommandChartProps {
  allocation: LandAllocationItem[];
}

const palette = ['#34d399', '#a3e635', '#38bdf8', '#fbbf24', '#c084fc'];

const AllocationCommandChart = ({ allocation }: AllocationCommandChartProps) => {
  const chartData = allocation.map((item, index) => ({
    name: item.crop_name,
    value: item.allocation_percentage,
    acreage: item.acreage_allocation,
    fill: palette[index % palette.length],
  }));

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="dashboard-panel relative min-h-[520px] overflow-hidden p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.16),transparent_42%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Interactive allocation</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Land distribution matrix</h2>
        </div>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          {allocation.length} crops
        </span>
      </div>

      <div className="relative mt-6 h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="24%" outerRadius="92%" data={chartData} startAngle={90} endAngle={-270}>
            <RadialBar dataKey="value" cornerRadius={18} background={{ fill: 'rgba(255,255,255,0.06)' }}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </RadialBar>
            <Tooltip
              formatter={(value: number, _name, item) => [`${value.toFixed(1)}% / ${item.payload.acreage} acres`, item.payload.name]}
              contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, color: '#fff' }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-full border border-white/10 bg-slate-950/85 px-8 py-6 text-center shadow-[0_0_60px_rgba(16,185,129,0.16)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Total allocation</p>
            <p className="mt-2 text-5xl font-semibold text-white">100%</p>
          </div>
        </div>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
        {chartData.map((item) => (
          <div key={item.name} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <p className="truncate text-sm font-semibold text-white">{item.name}</p>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{item.value}%</p>
            <p className="text-xs text-slate-500">{item.acreage} acres</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default AllocationCommandChart;
