const steps = [
  'Analyzing soil conditions...',
  'Evaluating weather intelligence...',
  'Calculating profitability...',
  'Optimizing crop allocation...',
  'Generating AI recommendations...',
];

const RecommendationLoader = () => {
  return (
    <div role="status" className="dashboard-panel overflow-hidden p-6 text-slate-100">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-400/15 text-emerald-300">
            <span className="absolute inset-0 rounded-3xl bg-emerald-300/20 blur-xl" />
            <span className="relative text-xl font-bold">AI</span>
          </div>
          <div>
            <p className="section-kicker text-emerald-300">Processing</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Building your farm intelligence report</h2>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-xs text-slate-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300 [animation-delay:300ms]" />
          AI thinking
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr,0.8fr]">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <p>{step}</p>
                <span className="text-slate-500">{index + 1}/5</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 animate-loading"
                  style={{ width: `${(index + 1) * 18}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="h-32 rounded-3xl border border-white/10 bg-slate-900/80 shadow-[0_24px_70px_rgba(0,0,0,0.16)]" />
          <div className="h-32 rounded-3xl border border-white/10 bg-slate-900/80 shadow-[0_24px_70px_rgba(0,0,0,0.16)]" />
          <div className="h-32 rounded-3xl border border-white/10 bg-slate-900/80 shadow-[0_24px_70px_rgba(0,0,0,0.16)]" />
        </div>
      </div>
    </div>
  );
};

export default RecommendationLoader;
