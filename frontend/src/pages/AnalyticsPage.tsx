import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Radar as RadarShape, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useMemo } from 'react';
import { analyticsTrendData, districtComparisonData } from '../utils/demoData';

const AnalyticsPage = () => {
  const areaData = useMemo(() => analyticsTrendData, []);
  const districtData = useMemo(() => districtComparisonData, []);

  return (
    <div className="space-y-8 py-6">
      <div className="glass-card p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Analytics workspace</p>
            <h1 className="text-3xl font-semibold text-white">Crop and water intelligence</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-400">Explore premium charts that show profitability trends, water usage, district comparisons, and risk movement across seasons.</p>
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Profit trends</p>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">Seasonal</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                  <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="url(#profitGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Water analytics</p>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">Efficiency</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={areaData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                  <Bar dataKey="waterUsage" fill="#0ea5e9" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="glass-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">District comparison</p>
              <h2 className="text-2xl font-semibold text-white">Crop suitability index</h2>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">Comparison</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={districtData} outerRadius={110}>
                <PolarAngleAxis dataKey="district" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                <RadarShape name="Suitability" dataKey="suitability" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Trend signals</p>
              <h2 className="text-2xl font-semibold text-white">Risk analysis</h2>
            </div>
            <span className="rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-200">Early warning</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={areaData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                <Line type="monotone" dataKey="riskIndex" stroke="#fb7185" strokeWidth={3} dot={{ r: 4, fill: '#fb7185' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="glass-card p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Seasonal insights</p>
          <h3 className="mt-3 text-xl font-semibold text-white">Planning horizon</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">Seasonal data indicates that profitability peaks in late spring as water remains moderate and risk scores stabilize.</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recommendation distribution</p>
          <h3 className="mt-3 text-xl font-semibold text-white">Crop allocation share</h3>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Wheat</span>
              <span>55%</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Maize</span>
              <span>30%</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Sesame</span>
              <span>15%</span>
            </div>
          </div>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Market intelligence</p>
          <h3 className="mt-3 text-xl font-semibold text-white">Crop outlook</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">Wheat and maize remain strong candidates in Punjab due to stable demand and favorable rainfall projections.</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
