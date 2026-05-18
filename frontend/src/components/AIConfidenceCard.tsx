import type { CropRecommendationItem } from '../types/recommendation';

interface AIConfidenceCardProps {
  confidence: number;
  strength: string;
  data: CropRecommendationItem[];
}

const ringStyle = (value: number) => ({
  background: `conic-gradient(rgba(16,185,129,0.85) ${value * 3.6}deg, rgba(39,39,42,0.15) 0deg)`,
});

const AIConfidenceCard = ({ confidence, strength, data }: AIConfidenceCardProps) => {
  const reliability = confidence > 80 ? 'High reliability' : confidence > 60 ? 'Moderate reliability' : 'Early stage recommendation';

  return (
    <div className="glass-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI confidence</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Model reliability score</h3>
        </div>
        <div className="rounded-full bg-slate-950/80 p-3 text-emerald-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
          {strength}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-slate-950/80 p-4 shadow-[0_0_50px_rgba(16,185,129,0.12)]">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-4 rounded-full" style={ringStyle(confidence)} />
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-950/90">
            <span className="text-3xl font-semibold text-white">{confidence}%</span>
          </div>
        </div>
        <div className="space-y-3 text-slate-300">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Reliability</p>
          <p className="text-lg font-semibold text-white">{reliability}</p>
          <p className="text-sm leading-6">The AI score is based on crop suitability, weather compatibility, and profitability modeling.</p>
          <p className="text-sm text-slate-400">Top recommended crop: {data[0]?.crop_name ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default AIConfidenceCard;
