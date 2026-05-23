import { motion } from 'framer-motion';
import type { CropRecommendationItem } from '../types/recommendation';
import { Award, Droplet, ShieldCheck, Sparkles } from 'lucide-react';

interface CropRecommendationCardProps {
  crop: CropRecommendationItem;
}

const strengthClasses = {
  strong: 'bg-emerald-400/10 text-emerald-200',
  moderate: 'bg-amber-400/10 text-amber-200',
  weak: 'bg-red-400/10 text-red-200',
};

const CropRecommendationCard = ({ crop }: CropRecommendationCardProps) => {
  const strengthClass = strengthClasses[crop.recommendation_strength as keyof typeof strengthClasses] || 'bg-slate-500/10 text-slate-200';

  return (
    <motion.article whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 240, damping: 20 }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
      <div className="pointer-events-none absolute inset-x-4 top-4 h-20 rounded-[1.75rem] bg-gradient-to-r from-emerald-400/10 via-cyan-300/5 to-slate-900/0 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{crop.crop_name}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{crop.recommendation_strength} recommendation</h3>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${strengthClass}`}>
            <Award className="h-4 w-4" />
            {crop.recommendation_strength}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-900/70 p-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Suitability</p>
            <p className="mt-2 text-3xl font-semibold text-white">{crop.suitability_score}%</p>
          </div>
          <div className="rounded-3xl bg-slate-900/70 p-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Confidence</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-200">{crop.confidence_score}%</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-900/70 p-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Profit</p>
            <p className="mt-2 text-lg font-semibold text-white">Rs {crop.expected_profit}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/70 p-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Yield</p>
            <p className="mt-2 text-lg font-semibold text-white">{crop.estimated_yield} t/acre</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-slate-950/90 p-5 text-slate-300">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
            <span>Final score</span>
            <span className="font-semibold text-white">{crop.final_score}%</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Weather</p>
              <p className="mt-2 text-lg font-semibold text-white">{crop.score_breakdown.weather_score}%</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Soil</p>
              <p className="mt-2 text-lg font-semibold text-white">{crop.score_breakdown.soil_score}%</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Water</p>
              <p className="mt-2 text-lg font-semibold text-white">{crop.score_breakdown.water_score}%</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Risk</p>
              <p className="mt-2 text-lg font-semibold text-white">{crop.score_breakdown.risk_score}%</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-3xl bg-slate-900/70 p-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 text-slate-200"><Droplet className="h-4 w-4 text-emerald-300" /> {crop.water_requirement}</span>
            <span className="inline-flex items-center gap-2 text-slate-200"><ShieldCheck className="h-4 w-4 text-amber-300" /> {crop.risk_level}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 text-slate-200"><Sparkles className="h-4 w-4 text-cyan-300" /> Weather compat.</span>
            <span>{crop.weather_compatibility}%</span>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white/5 p-5 text-sm text-slate-300">
          <p>{crop.explanation}</p>
        </div>
      </div>
    </motion.article>
  );
};

export default CropRecommendationCard;
