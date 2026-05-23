import { motion } from 'framer-motion';
import { Activity, BarChart3, Droplets, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { analyticsTrendData } from '../utils/demoData';

const chartTooltip = {
  background: '#020617',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 16,
  color: '#fff',
};

const AnalyticsPage = () => {
  const trendData = useMemo(() => analyticsTrendData, []);
  const profitPeak = Math.max(...trendData.map((item) => item.profit));
  const averageRisk = Math.round(trendData.reduce((sum, item) => sum + item.riskIndex, 0) / trendData.length);
  const waterPeak = Math.max(...trendData.map((item) => item.waterUsage));

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: 'easeOut' }} className="space-y-6 py-2">
      <section className="dashboard-panel p-6">
        <div className="grid gap-6 xl:grid-cols-[1fr,0.7fr] xl:items-end">
          <div>
            <p className="section-kicker text-emerald-300">Analytics intelligence</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Crop performance and weather signals in one clear place.</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric icon={TrendingUp} label="Profit peak" value={`${profitPeak}%`} />
            <Metric icon={Activity} label="Risk pulse" value={`${averageRisk}%`} />
            <Metric icon={Droplets} label="Water load" value={`${waterPeak}%`} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.6fr,0.9fr]">
        <section className="dashboard-panel p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="section-kicker">Profitability</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Seasonal return trajectory</h2>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Model insights
            </span>
          </div>
          <div className="min-h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData} margin={{ top: 12, right: 16, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltip} />
                <Area type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={3} fill="url(#analyticsProfit)" />
                <Bar dataKey="waterUsage" fill="#38bdf8" radius={[8, 8, 0, 0]} opacity={0.35} />
                <Line type="monotone" dataKey="riskIndex" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="dashboard-panel p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Water & risk</p>
              <h2 className="text-2xl font-semibold text-white">Climate pressure points</h2>
            </div>
            <BarChart3 className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Rainfall trend</p>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 8, right: 0, left: -16, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltip} />
                    <Line type="monotone" dataKey="waterUsage" stroke="#22d3ee" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Risk trend</p>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData} margin={{ top: 8, right: 0, left: -16, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltip} />
                    <Bar dataKey="riskIndex" fill="#fb7185" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const Metric = ({ label, value, icon: Icon }: { label: string; value: string; icon: typeof TrendingUp }) => (
  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
    <Icon className="h-4 w-4 text-emerald-300" />
    <p className="mt-3 text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
  </div>
);

export default AnalyticsPage;
