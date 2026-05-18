import { motion } from 'framer-motion';
import { CloudRain, Compass, Sparkles, Thermometer } from 'lucide-react';
import type { RecommendationResponse } from '../types/recommendation';

interface DashboardHeroProps {
  data: RecommendationResponse;
}

const DashboardHero = ({ data }: DashboardHeroProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/0 to-slate-950/80" />

      <div className="relative grid gap-8 lg:grid-cols-[1.8fr,1fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Punjab Agricultural Intelligence System</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Premium AI farm decision intelligence</h1>
          <p className="max-w-2xl text-slate-300">Monitor recommendation health, district suitability, weather conditions, and profitability instantly from a futuristic command center.</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI confidence</p>
              <p className="mt-3 text-4xl font-semibold text-emerald-200">{data.ai_confidence_score}%</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Active recommendations</p>
              <p className="mt-3 text-4xl font-semibold text-white">{data.recommended_crops.length}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Current district</p>
              <p className="mt-3 text-4xl font-semibold text-white">{data.farm_analysis.district}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Weather condition</p>
              <p className="mt-3 text-2xl font-semibold text-white">Clear sky</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              <CloudRain className="h-4 w-4" /> Stable
            </div>
          </div>

          <div className="mt-8 space-y-4 rounded-[2rem] bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">System status</p>
                <p className="mt-2 text-lg font-semibold text-emerald-200">Online</p>
              </div>
              <div className="h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Heat index</p>
                <p className="mt-2 text-2xl font-semibold text-white">24°C</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Humidity</p>
                <p className="mt-2 text-2xl font-semibold text-white">58%</p>
              </div>
            </div>
            <div className="mt-4 rounded-3xl bg-slate-900/80 p-4 text-slate-300">
              <p className="text-sm">{data.farm_analysis.weather_summary}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardHero;
