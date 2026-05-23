import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Droplets, LineChart, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { CropRecommendationItem } from '../../types/recommendation';

interface RecommendationGridProps {
  crops: CropRecommendationItem[];
  onInspect: (crop: CropRecommendationItem) => void;
}

const RecommendationGrid = ({ crops, onInspect }: RecommendationGridProps) => {
  const [openCrop, setOpenCrop] = useState(crops[0]?.crop_name ?? '');

  return (
    <section className="dashboard-panel p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Recommendation cards</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Crop intelligence stack</h2>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          {crops.length} ranked
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {crops.map((crop, index) => {
          const isOpen = openCrop === crop.crop_name;
          return (
            <motion.article
              key={crop.crop_name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-1 hover:border-emerald-300/30 hover:shadow-[0_24px_70px_rgba(16,185,129,0.12)]"
            >
              <button type="button" onClick={() => setOpenCrop(isOpen ? '' : crop.crop_name)} className="flex w-full items-start justify-between gap-4 text-left">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">#{index + 1} signal</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{crop.crop_name}</h3>
                </div>
                <ChevronDown className={`h-5 w-5 text-slate-500 transition ${isOpen ? 'rotate-180 text-emerald-300' : ''}`} />
              </button>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Metric icon={Sparkles} label="Score" value={`${Math.round(crop.suitability_score)}%`} />
                <Metric icon={LineChart} label="ROI" value={`Rs ${Math.round(crop.expected_profit / 1000)}k`} />
                <Metric icon={ShieldCheck} label="Risk" value={crop.risk_level} />
                <Metric icon={Droplets} label="Water" value={crop.water_requirement} />
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ['Weather', crop.score_breakdown.weather_score],
                  ['Soil', crop.score_breakdown.soil_score],
                  ['Profit', crop.score_breakdown.profit_score],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="mb-1 flex justify-between text-xs text-slate-500">
                      <span>{label}</span>
                      <span>{Math.round(value as number)}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} className="h-full rounded-full bg-emerald-300" />
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/70 p-4">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {crop.recommendation_reasons.slice(0, 4).map((reason) => (
                          <span key={reason} className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
                            {reason}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm leading-6 text-slate-300">{crop.explanation}</p>
                      <button
                        type="button"
                        onClick={() => onInspect(crop)}
                        className="mt-4 rounded-2xl bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
                      >
                        Inspect intelligence
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

const Metric = ({ icon: Icon, label, value }: { icon: typeof Sparkles; label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
    <Icon className="h-4 w-4 text-emerald-300" />
    <p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">{label}</p>
    <p className="mt-1 truncate text-sm font-semibold capitalize text-white">{value}</p>
  </div>
);

export default RecommendationGrid;
