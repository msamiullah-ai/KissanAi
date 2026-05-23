import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { CropRecommendationItem } from '../../types/recommendation';

interface RecommendationDrawerProps {
  crop: CropRecommendationItem | null;
  onClose: () => void;
}

const RecommendationDrawer = ({ crop, onClose }: RecommendationDrawerProps) => {
  return (
    <AnimatePresence>
      {crop && (
        <motion.aside
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md border-l border-white/10 bg-slate-950/95 p-6 shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-kicker">Recommendation drawer</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{crop.crop_name}</h2>
            </div>
            <button type="button" onClick={onClose} className="icon-command" title="Close drawer">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">AI explanation</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{crop.explanation}</p>
          </div>

          <div className="mt-5 grid gap-3">
            {Object.entries(crop.score_breakdown).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
                  <span>{key.split('_').join(' ')}</span>
                  <span>{Number(value).toFixed(1)}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Number(value), 100)}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {crop.recommendation_reasons.map((reason) => (
              <span key={reason} className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
                {reason}
              </span>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default RecommendationDrawer;
