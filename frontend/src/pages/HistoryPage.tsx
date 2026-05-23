import { useMemo, useState } from 'react';
import { useHistoryContext } from '../context/HistoryContext';
import EmptyState from '../components/EmptyState';
import type { HistoryRecord } from '../types/platform';

const HistoryPage = () => {
  const { filteredHistory, history, filterHistory, clearHistory } = useHistoryContext();
  const [filters, setFilters] = useState({ district: '', crop: '' });
  const districts = useMemo(() => Array.from(new Set(history.map((item) => item.district))), [history]);

  const applyFilters = () => {
    filterHistory({ district: filters.district || undefined, crop: filters.crop || undefined });
  };

  if (history.length === 0) {
    return <EmptyState title="No recommendation history" message="Create a recommendation to populate your archive and compare previous insights." actionLink="/recommendation" />;
  }

  return (
    <div className="space-y-8 py-6">
      <section className="dashboard-panel p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker text-emerald-300">History archive</p>
            <h1 className="text-3xl font-semibold text-white">Past AI recommendations</h1>
          </div>
          <button type="button" onClick={clearHistory} className="inline-flex items-center justify-center rounded-full bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15">
            Clear history
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <select value={filters.district} onChange={(e) => setFilters((prev) => ({ ...prev, district: e.target.value }))} className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10">
            <option value="">All districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          <input value={filters.crop} onChange={(e) => setFilters((prev) => ({ ...prev, crop: e.target.value }))} placeholder="Filter by crop" className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10" />
          <button type="button" onClick={applyFilters} className="rounded-3xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
            Apply filters
          </button>
        </div>
      </section>

      <section className="grid gap-6">
        {filteredHistory.map((record: HistoryRecord) => (
          <article key={record.id} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{record.season} • {record.district}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{record.summary}</h2>
              </div>
              <span className="inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200">Confidence {record.ai_confidence_score}%</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/75 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Profit</p>
                <p className="mt-2 text-xl font-semibold text-white">Rs {record.profitability_summary.total_expected_profit}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/75 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Average / acre</p>
                <p className="mt-2 text-xl font-semibold text-white">Rs {record.profitability_summary.average_profit_per_acre}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/75 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Top crop</p>
                <p className="mt-2 text-xl font-semibold text-emerald-200">{record.profitability_summary.highest_profit_crop}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default HistoryPage;
