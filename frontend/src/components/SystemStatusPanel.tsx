import type { StatusItem } from '../types/platform';

interface SystemStatusPanelProps {
  statuses: StatusItem[];
}

const statusColors: Record<string, string> = {
  online: 'bg-emerald-400/10 text-emerald-200',
  degraded: 'bg-amber-400/10 text-amber-200',
  offline: 'bg-rose-400/10 text-rose-200',
};

const SystemStatusPanel = ({ statuses }: SystemStatusPanelProps) => {
  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">System health</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Platform status panel</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">Live diagnostics</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {statuses.map((item) => (
          <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{item.label}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[item.status]}`}>{item.status}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatusPanel;
