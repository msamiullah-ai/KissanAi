import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowRight, CloudRain, Sparkles, Thermometer, ShieldCheck, AlertTriangle, Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecommendation } from '../hooks/useRecommendation';
import { useWeather } from '../hooks/useWeather';
import RecommendationLoader from '../components/RecommendationLoader';
import EmptyState from '../components/EmptyState';

const DashboardPage = () => {
  const { data, isLoading, error } = useRecommendation();
  const navigate = useNavigate();
  const weatherState = useWeather(data?.farm_analysis.district ?? null);
  const weather = weatherState.weather;

  if (isLoading) return <RecommendationLoader />;

  if (!data && error)
    return (
      <EmptyState
        title="Dashboard unavailable"
        message="We could not load recommendation data. Please try again or open the recommendation workspace."
        actionLink="/recommendation"
      />
    );

  if (!data)
    return (
      <EmptyState
        title="No recommendation summary yet"
        message="Start in the AI workspace to generate your first crop recommendation and review the farm summary here."
        actionLink="/recommendation"
      />
    );

  const topCrop = data.recommended_crops[0];
  const lastUpdate = new Date(data.generated_at).toLocaleString();
  const alertCount = data.weather_alerts.length;
  const statusLabel = data.ai_confidence_score >= 85 ? 'Ready to act' : 'Review suggested changes';

  const overviewCards = [
    {
      title: 'Top recommendation',
      value: topCrop?.crop_name ?? '—',
      subtitle: `${Math.round(topCrop?.suitability_score ?? 0)}% suitability`,
      icon: Sparkles,
    },
    {
      title: 'Profit forecast',
      value: `Rs ${data.profitability_summary.total_expected_profit.toLocaleString()}`,
      subtitle: `Avg Rs ${data.profitability_summary.average_profit_per_acre.toLocaleString()}/acre`,
      icon: Thermometer,
    },
    {
      title: 'Weather status',
      value: weather?.condition ?? data.farm_analysis.weather_summary,
      subtitle: weatherState.offline ? 'Fallback weather' : 'Live weather feed',
      icon: CloudRain,
    },
    {
      title: 'Risk alert',
      value: topCrop?.risk_level ?? 'Unknown',
      subtitle: `${alertCount} advisories pending`,
      icon: ShieldCheck,
    },
  ];

  const quickActions = [
    'Open recommendation workspace',
    'Review top crop status',
    'Check alerts and next action',
  ];

  const statusItems = [
    { label: 'Last generated', value: lastUpdate, icon: Clock3 },
    { label: 'Current status', value: statusLabel, icon: AlertTriangle },
    { label: 'Confidence score', value: `${data.ai_confidence_score}%`, icon: Sparkles },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="space-y-6 py-6"
    >
      <section className="grid gap-6 xl:grid-cols-[1.7fr,0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker text-emerald-300">Farm overview</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">What’s happening on your farm</h1>
            </div>
            <button
              type="button"
              onClick={() => navigate('/recommendation')}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Open recommendation workspace
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 max-w-2xl text-slate-400">Summary-only notifications, current recommendation status, and the next recommended action for your farm.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-400">{card.title}</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
                    </div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">{card.subtitle}</p>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <div className="mb-6">
            <p className="section-kicker text-emerald-300">Recommendation status</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Quick status snapshot</h2>
          </div>
          <div className="space-y-4">
            {statusItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Icon className="h-4 w-4 text-emerald-300" />
                    <span className="text-sm uppercase tracking-[0.22em]">{item.label}</span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-emerald-400/10 bg-emerald-400/5 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">Next step</p>
            <p className="mt-3 text-sm text-slate-300">Go to the recommendation workspace to refresh your crop plan, compare options, and validate the final strategy.</p>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr,0.75fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="section-kicker text-emerald-300">Top summary</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Current recommendation at a glance</h2>
            </div>
            <span className="rounded-full bg-slate-950/80 px-4 py-2 text-sm font-semibold text-slate-200">Primary crop</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Recommended crop</p>
              <p className="mt-3 text-3xl font-semibold text-white">{topCrop.crop_name}</p>
              <p className="mt-2 text-sm text-slate-400">Suitability score: {Math.round(topCrop.suitability_score)}%</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Expected ROI</p>
              <p className="mt-3 text-3xl font-semibold text-white">Rs {data.profitability_summary.total_expected_profit.toLocaleString()}</p>
              <p className="mt-2 text-sm text-slate-400">Avg Rs {data.profitability_summary.average_profit_per_acre.toLocaleString()}/acre</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Alerts</p>
              <p className="mt-3 text-lg font-semibold text-white">{alertCount} active recommendation advisories</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/recommendation')}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Open workspace
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <p className="section-kicker text-emerald-300">Support metrics</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Weather summary</p>
              <p className="mt-3 text-lg font-semibold text-white">{weather?.condition ?? data.farm_analysis.weather_summary}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Recommendation confidence</p>
              <p className="mt-3 text-lg font-semibold text-white">{data.ai_confidence_score}%</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Primary risk</p>
              <p className="mt-3 text-lg font-semibold text-white">{topCrop.risk_level}</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DashboardPage;
