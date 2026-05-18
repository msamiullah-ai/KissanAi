import { Link } from 'react-router-dom';
import { ArrowRight, CloudRain, Flame, Seedling, ShieldCheck } from 'lucide-react';
import { landingFeatures, landingStats } from '../data/landingData';

const LandingPage = () => {
  return (
    <div className="space-y-16 pt-8">
      <section className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow md:grid-cols-[1.2fr,0.8fr] md:p-12">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-3 rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-200">
            <Seedling className="h-5 w-5" />
            AI-driven agriculture for Punjab farms
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Intelligent Crop Recommendations for Punjab Agribusiness</h1>
            <p className="max-w-2xl text-slate-300">
              KissanAI delivers advanced farm analytics, weather-aware recommendations, and profitability insights so you can plan every acre with confidence.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/recommendation"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Generate Recommendations
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm text-slate-200 transition hover:border-emerald-300 hover:text-emerald-200"
            >
              View Dashboard
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {landingStats.map((stat) => (
              <div key={stat.label} className="glass-card p-5">
                <p className="text-4xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#09210e] p-8 shadow-xl">
          <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute left-8 bottom-12 h-32 w-32 rounded-full bg-slate-200/5 blur-3xl" />
          <div className="relative space-y-6">
            <div className="space-y-3 rounded-[1.8rem] border border-white/10 bg-slate-950/80 p-6">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-sm uppercase tracking-[0.25em]">Live AI Score</span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">Powered</span>
              </div>
              <p className="text-6xl font-semibold text-white">94%</p>
              <p className="text-sm text-slate-400">Predictive intelligence for rainfall, crop selection, and profitability.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {landingFeatures.map((feature) => (
                <div key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-300/50 hover:bg-emerald-400/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow md:p-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Built for modern agriculture and enterprise intelligence</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Explore the smart dashboard, farm risk indicators, and tailored crop planning engine built to help Punjab farmers make agile decisions.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-emerald-500/10 px-5 py-3 text-sm text-emerald-200">
            Smooth animations • Tailwind UI • Data-driven insights
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
