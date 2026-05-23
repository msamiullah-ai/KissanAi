import { motion } from 'framer-motion';
import { ArrowUpRight, Droplets, ShieldAlert, Sparkles, Sprout } from 'lucide-react';
import type { CropRecommendationItem, ProfitInsight } from '../../types/recommendation';

interface RecommendationIntelligencePanelProps {
  crop: CropRecommendationItem;
  profit: ProfitInsight;
}

const RecommendationIntelligencePanel = ({ crop, profit }: RecommendationIntelligencePanelProps) => {
  const metrics = [
    { label: 'Confidence', value: `${crop.confidence_score}%`, icon: Sparkles, tone: 'text-emerald-300' },
    { label: 'Profit', value: `Rs ${Math.round(crop.expected_profit).toLocaleString()}`, icon: ArrowUpRight, tone: 'text-lime-300' },
    { label: 'Risk', value: crop.risk_level, icon: ShieldAlert, tone: 'text-amber-300' },
    { label: 'Water', value: crop.water_requirement, icon: Droplets, tone: 'text-cyan-300' },
  ];

  const scoreBreakdown = [
    { label: 'Soil', value: crop.score_breakdown.soil_score, color: 'from-emerald-300 to-emerald-500' },
    { label: 'Weather', value: crop.score_breakdown.weather_score, color: 'from-cyan-300 to-cyan-500' },
    { label: 'Profit', value: crop.score_breakdown.profit_score, color: 'from-lime-300 to-emerald-300' },
  ];

  return (
    <motion.section layout className="dashboard-panel h-full p-6">
      <div className="grid gap-6">
        <div className="grid gap-6 rounded-[1.25rem] border border-white/10 bg-slate-900/80 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-kicker">Recommendation intelligence</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{crop.crop_name}</h2>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-200">
              <Sprout className="h-5 w-5" />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr] xl:items-center">
            <div>
              <p className="text-sm text-slate-400">Crop intelligence is calibrated for your district, soil profile and seasonal conditions.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {metrics.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="rounded-3xl border border-white/10 bg-slate-950/70 p-4"
                    >
                      <div className={`inline-flex rounded-2xl bg-white/5 p-2 ${item.tone}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="mt-4 text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Suitability signal</p>
                  <p className="mt-2 text-xl font-semibold text-white">Dynamic crop pulse</p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  {crop.recommendation_strength}
                </span>
              </div>

              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-end">
                <SuitabilityRing value={Math.round(crop.suitability_score)} />
                <div className="flex-1 space-y-3">
                  {scoreBreakdown.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>{item.label}</span>
                        <span>{Math.round(item.value)}%</span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                        <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-white/10 bg-slate-900/80 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Profitability pulse</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Seasonal revenue signal</h3>
            </div>
            <div className="rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {Math.round(crop.suitability_score)}% aligned
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/70 p-4">
            <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Trend forecast</div>
            <div className="mt-4 h-32 overflow-hidden rounded-3xl bg-slate-900/80 p-4">
              <div className="relative h-full w-full">
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-lime-300 opacity-40" />
                <div className="absolute bottom-0 left-0 h-full w-full opacity-90">
                  <div className="grid h-full grid-cols-6 gap-2 items-end">
                    {[24, 32, 38, 52, 66, 58].map((height, index) => (
                      <div key={index} className="mx-auto w-full rounded-full bg-emerald-400/20" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Forecasted payout</p>
                <p className="mt-2 text-3xl font-semibold text-white">Rs {Math.round(profit.total_expected_profit).toLocaleString()}</p>
              </div>
              <p className="text-sm text-slate-400">Average per acre: Rs {Math.round(profit.average_profit_per_acre).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const SuitabilityRing = ({ value }: { value: number }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-slate-950/80 p-4 shadow-[0_20px_50px_rgba(16,185,129,0.12)]">
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#suitabilityGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
        />
        <defs>
          <linearGradient id="suitabilityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Suitability</span>
        <span className="mt-1 text-4xl font-semibold text-white">{value}%</span>
      </div>
    </div>
  );
};

export default RecommendationIntelligencePanel;
