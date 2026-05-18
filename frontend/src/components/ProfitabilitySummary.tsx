import type { ProfitInsight } from '../types/recommendation';

interface ProfitabilitySummaryProps {
  summary: ProfitInsight;
  recommendedCropsCount: number;
  highestRisk: string;
}

const ProfitabilitySummary = ({ summary, recommendedCropsCount, highestRisk }: ProfitabilitySummaryProps) => {
  return (
    <div className="glass-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Profitability summary</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Revenue projection</h3>
        </div>
        <span className="rounded-full bg-slate-900/70 px-3 py-1 text-sm text-slate-300">{recommendedCropsCount} crops</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-950/80 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Projected profit</p>
          <p className="mt-3 text-3xl font-semibold text-white">Rs {summary.total_expected_profit}</p>
          <p className="mt-2 text-sm text-slate-400">Total expected earnings for the selected season and region.</p>
        </div>
        <div className="rounded-3xl bg-slate-950/80 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Average yield</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.average_profit_per_acre}</p>
          <p className="mt-2 text-sm text-slate-400">Profit per acre gives you margin visibility.</p>
        </div>
      </div>
      <div className="mt-5 rounded-3xl bg-slate-900/80 p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Highest profit crop</p>
        <p className="mt-3 text-xl font-semibold text-emerald-200">{summary.highest_profit_crop}</p>
        <p className="mt-2 text-sm text-slate-400">This crop offers the strongest ROI potential based on current conditions.</p>
      </div>
      <div className="mt-5 rounded-3xl bg-emerald-500/10 p-4 text-slate-200">
        <p className="text-sm">Risk overview: {highestRisk === 'High' ? 'High risk exposure' : highestRisk === 'Medium' ? 'Balanced risk and reward' : 'Low risk strategy'}</p>
      </div>
    </div>
  );
};

export default ProfitabilitySummary;
