const steps = [
  'Analyzing soil conditions...',
  'Evaluating weather intelligence...',
  'Calculating profitability...',
  'Optimizing crop allocation...',
  'Generating AI recommendations...',
];

const RecommendationLoader = () => {
  return (
    <div className="glass-card p-10 text-slate-100">
      <div className="flex items-center gap-4 border-b border-white/10 pb-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-400/15 text-emerald-300">
          <span className="text-xl font-bold">AI</span>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Processing</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">AI analysis is in progress</h2>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {steps.map((step, index) => (
          <div key={step} className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <p>{step}</p>
              <span>…</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 animate-loading"
                style={{ width: `${(index + 1) * 16}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationLoader;
