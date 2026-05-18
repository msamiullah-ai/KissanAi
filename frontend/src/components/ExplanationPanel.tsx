interface ExplanationPanelProps {
  explanation: string;
}

const ExplanationPanel = ({ explanation }: ExplanationPanelProps) => {
  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI explanation</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Recommendation rationale</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">Transparent</span>
      </div>
      <p className="text-slate-200">{explanation}</p>
    </div>
  );
};

export default ExplanationPanel;
