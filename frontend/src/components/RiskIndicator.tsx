import type { CropRecommendationItem } from '../types/recommendation';

interface RiskIndicatorProps {
  crops: CropRecommendationItem[];
}

const riskColors = {
  low: 'bg-emerald-400/10 text-emerald-200',
  medium: 'bg-amber-400/10 text-amber-200',
  high: 'bg-red-400/10 text-red-200',
};

const RiskIndicator = ({ crops }: RiskIndicatorProps) => {
  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Risk analysis</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Crop risk profile</h3>
        </div>
        <span className="rounded-full bg-slate-800/70 px-3 py-1 text-sm text-slate-300">Dynamic</span>
      </div>
      <div className="space-y-4">
        {crops.map((crop) => (
          <div key={crop.crop_name} className="rounded-3xl bg-slate-900/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-white">{crop.crop_name}</p>
                <p className="mt-1 text-sm text-slate-400">{crop.recommendation_strength} recommendation</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${riskColors[crop.risk_level as keyof typeof riskColors] || 'bg-slate-600 text-slate-100'}`}> {crop.risk_level} risk </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/90 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Suitability</p>
                <p className="mt-2 text-lg font-semibold text-white">{crop.suitability_score}%</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Confidence</p>
                <p className="mt-2 text-lg font-semibold text-white">{crop.confidence_score}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskIndicator;
