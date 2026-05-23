import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, Sparkles, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecommendationForm from '../components/RecommendationForm';
import { useRecommendation } from '../hooks/useRecommendation';
import RecommendationLoader from '../components/RecommendationLoader';
import { useToast } from '../hooks/useToast';
import { useHistoryContext } from '../context/HistoryContext';
import { createHistoryRecord } from '../services/historyService';
import { exportReportAsPDF } from '../utils/pdfExport';
import type { CropRecommendationItem } from '../types/recommendation';

const RecommendationPage = () => {
  const { isLoading, error, data, fetchRecommendations, isOffline } = useRecommendation();
  const navigate = useNavigate();
  const toast = useToast();
  const { addHistory } = useHistoryContext();
  const [lastGeneratedAt, setLastGeneratedAt] = useState<string | null>(null);
  const [compareIndex, setCompareIndex] = useState(1);

  useEffect(() => {
    if (!isLoading && data && data.generated_at !== lastGeneratedAt) {
      if (isOffline) {
        toast.showToast({
          variant: 'success',
          title: 'Fallback recommendation loaded',
          description: 'Demo recommendations are shown while the backend is unavailable.',
        });
      } else {
        toast.showToast({
          variant: 'success',
          title: 'Recommendation ready',
          description: 'Your tailored farm plan has been generated in the workspace.',
        });
      }

      addHistory(
        createHistoryRecord({
          district: data.farm_analysis.district,
          season: data.farm_analysis.season,
          soil_type: data.farm_analysis.soil_type,
          ai_confidence_score: data.ai_confidence_score,
          profitability_summary: data.profitability_summary,
          summary: data.recommended_crops.map((crop) => crop.crop_name).join(' + '),
        }),
      );
      setLastGeneratedAt(data.generated_at);
    }
  }, [addHistory, data, isLoading, isOffline, lastGeneratedAt, toast]);

  useEffect(() => {
    if (!isLoading && error && !data) {
      toast.showToast({
        variant: 'error',
        title: 'Recommendation failed',
        description: error,
      });
    }
  }, [data, error, isLoading, toast]);

  const topCrops = useMemo(() => data?.recommended_crops.slice(0, 3) ?? [], [data]);
  const primaryCrop = topCrops[0];
  const comparisonCrop = topCrops[compareIndex] ?? topCrops[1] ?? null;
  const profitChartData = topCrops.map((crop) => ({ crop: crop.crop_name, profit: crop.expected_profit }));

  const handleExport = async () => {
    await exportReportAsPDF('recommendation-report', 'kissanai-recommendation.pdf');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: 'easeOut' }} className="space-y-8 py-6" id="recommendation-report">
      <section className="dashboard-panel overflow-hidden p-6">
        <div className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr] xl:items-end">
          <div>
            <p className="section-kicker text-emerald-300">AI Crop Decision Lab</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Generate, compare, and validate your best crop strategy.</h1>
            <p className="mt-4 max-w-2xl text-slate-400">Start with farm inputs, review the top crop recommendations, compare key metrics, and make confident planting decisions.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_22px_80px_rgba(0,0,0,0.18)]">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Decision workflow</p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <p>1. Enter your district, season, soil, land area, and weather snapshot.</p>
              <p>2. Generate recommendations and review the top crop choices.</p>
              <p>3. Compare crop tradeoffs, inspect risks, and export your plan.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <RecommendationForm onSubmit={fetchRecommendations} />

        <aside className="dashboard-panel p-6">
          <div className="mb-6">
            <p className="section-kicker text-emerald-300">Workspace status</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Start the recommendation journey</h2>
          </div>
          <div className="space-y-4 text-slate-300">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm font-semibold text-white">Start here</p>
              <p className="mt-3 text-sm">Use the form to generate the latest recommendation before comparing crops.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm font-semibold text-white">Compare with confidence</p>
              <p className="mt-3 text-sm">Select a crop to compare directly with the top recommendation.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm font-semibold text-white">Export and save</p>
              <p className="mt-3 text-sm">Review your strategy, then export the plan or revisit it from history.</p>
            </div>
          </div>
        </aside>
      </section>

      {!data && !isLoading && (!error || (error && error.includes('demo recommendation')) ) && (
        <section className="dashboard-panel p-6">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 text-slate-300">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Ready to generate</p>
            <p className="mt-3 text-lg font-semibold text-white">Complete the form and click Generate Intelligence to start your farm recommendation workflow.</p>
          </div>
        </section>
      )}

      {isLoading && <RecommendationLoader />}

      {data ? (
        <>
          <section className="grid gap-6 xl:grid-cols-[1.35fr,0.65fr]">
            <div className="dashboard-panel p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="section-kicker">Top recommendations</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Highest value crop choices</h2>
                </div>
                <p className="text-sm text-slate-400">Compare the top 3 crop options from the current recommendation.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-sm text-slate-300">
                  <thead>
                    <tr>
                      <th className="rounded-tl-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-slate-500">Crop</th>
                      <th className="border border-white/10 bg-slate-950/90 px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-slate-500">Suitability</th>
                      <th className="border border-white/10 bg-slate-950/90 px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-slate-500">Profit</th>
                      <th className="border border-white/10 bg-slate-950/90 px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-slate-500">Risk</th>
                      <th className="rounded-tr-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-left text-xs uppercase tracking-[0.3em] text-slate-500">Compare</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCrops.map((crop, index) => (
                      <tr key={crop.crop_name} className="even:bg-slate-950/60">
                        <td className="border border-white/10 px-4 py-4 font-semibold text-white">{crop.crop_name}</td>
                        <td className="border border-white/10 px-4 py-4">{Math.round(crop.suitability_score)}%</td>
                        <td className="border border-white/10 px-4 py-4">Rs {crop.expected_profit.toLocaleString()}</td>
                        <td className="border border-white/10 px-4 py-4">{crop.risk_level}</td>
                        <td className="border border-white/10 px-4 py-4">
                          <button
                            type="button"
                            onClick={() => setCompareIndex(index)}
                            className={`rounded-full px-3 py-2 text-xs font-semibold transition ${compareIndex === index ? 'bg-emerald-400 text-slate-950' : 'border border-white/10 bg-slate-950/70 text-slate-200 hover:bg-slate-900'}`}
                          >
                            {compareIndex === index ? 'Selected' : 'Compare'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-panel p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="section-kicker">AI insights</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Why the top recommendation works</h2>
                </div>
                <Sparkles className="h-5 w-5 text-emerald-300" />
              </div>
              <div className="space-y-5">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                  <p className="text-sm font-semibold text-white">Why {primaryCrop?.crop_name}?</p>
                  <ul className="mt-4 space-y-3 text-slate-300">
                    {primaryCrop?.recommendation_reasons.map((reason) => (
                      <li key={reason} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                  <p className="text-sm font-semibold text-white">Potential risks</p>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{primaryCrop?.explanation || 'Review irrigation and weather exposure before finalizing.'}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr,0.6fr]">
            <div className="dashboard-panel p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="section-kicker">Comparison lab</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Side-by-side crop comparison</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">{comparisonCrop?.crop_name || 'Choose crop'}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <CompareCard crop={primaryCrop} label="Recommended crop" />
                {comparisonCrop ? <CompareCard crop={comparisonCrop} label="Comparison crop" /> : null}
              </div>
              <div className="mt-6 overflow-x-auto rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4">
                <table className="min-w-full text-sm text-slate-300">
                  <tbody>
                    {[
                      ['Profitability', `Rs ${primaryCrop?.expected_profit.toLocaleString()}`, `Rs ${comparisonCrop?.expected_profit.toLocaleString()}`],
                      ['Water need', primaryCrop?.water_requirement ?? '—', comparisonCrop?.water_requirement ?? '—'],
                      ['Risk level', primaryCrop?.risk_level, comparisonCrop?.risk_level],
                      ['Weather compatibility', `${primaryCrop?.weather_compatibility}%`, `${comparisonCrop?.weather_compatibility}%`],
                      ['Season fit', `${primaryCrop?.score_breakdown.season_score}%`, `${comparisonCrop?.score_breakdown.season_score}%`],
                    ].map(([label, left, right]) => (
                      <tr key={label} className="border-t border-white/10">
                        <td className="py-4 pr-6 font-semibold text-white">{label}</td>
                        <td className="py-4 text-slate-300">{left}</td>
                        <td className="py-4 text-slate-300">{right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-panel p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="section-kicker">Action recommendation</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Final strategy summary</h2>
                </div>
                <Target className="h-5 w-5 text-emerald-300" />
              </div>
              <div className="space-y-4">
                <SummaryItem label="Primary crop" value={primaryCrop?.crop_name ?? '—'} />
                <SummaryItem label="Secondary crop" value={comparisonCrop?.crop_name ?? 'Select a crop'} />
                <SummaryItem label="Expected ROI" value={`Rs ${data.profitability_summary.total_expected_profit.toLocaleString()}`} />
                <SummaryItem label="Risk level" value={primaryCrop?.risk_level ?? '—'} />
                <SummaryItem label="Confidence" value={`${primaryCrop?.confidence_score}%`} />
              </div>
              <div className="mt-6 h-[220px] rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Profit comparison</p>
                <div className="mt-4 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitChartData} margin={{ top: 10, right: 0, left: -18, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                      <XAxis dataKey="crop" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, color: '#fff' }} />
                      <Bar dataKey="profit" fill="#34d399" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Export PDF
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  View dashboard summary
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {!isLoading && error && !data && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-6 text-red-100 shadow-[0_24px_80px_rgba(191,54,12,0.18)]">
          <p className="text-lg font-semibold">Unable to generate recommendations</p>
          <p className="mt-3 text-sm text-slate-200">{error}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const CompareCard = ({
  crop,
  label,
}: {
  crop: CropRecommendationItem;
  label: string;
}) => (
  <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
    <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{label}</p>
    <p className="mt-3 text-xl font-semibold text-white">{crop.crop_name}</p>
    <p className="mt-3 text-sm text-slate-300">Suitability: {Math.round(crop.suitability_score)}%</p>
    <p className="mt-2 text-sm text-slate-300">Risk: {crop.risk_level}</p>
    <p className="mt-2 text-sm text-slate-300">Profit: Rs {crop.expected_profit.toLocaleString()}</p>
  </div>
);

const SummaryItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4">
    <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{label}</p>
    <p className="mt-3 text-lg font-semibold text-white">{value}</p>
  </div>
);

export default RecommendationPage;
