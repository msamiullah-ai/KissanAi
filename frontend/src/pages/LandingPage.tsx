import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sprout, BarChart3, Cloud, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const metrics = [
  { label: 'Crop Accuracy', value: '92%', icon: CheckCircle2 },
  { label: 'Weather Intelligence', value: '99%', icon: Cloud },
  { label: 'Profitability Optimization', value: '+28%', icon: TrendingUp },
];

const features = [
  { title: 'Weather-aware forecasts', description: 'Live climate data with practical farm signals.', icon: Cloud },
  { title: 'Smart crop selection', description: 'AI recommendations tuned for Punjab districts.', icon: Sprout },
  { title: 'Profit and risk balance', description: 'See the right crop with trusted financial context.', icon: BarChart3 },
  { title: 'Clear field actions', description: 'Simple, actionable outputs for daily decisions.', icon: Shield },
];

const steps = [
  { title: 'Enter farm details', description: 'Share your district, season, soil and water profile.' },
  { title: 'AI analyzes conditions', description: 'The system blends weather, crop and profit signals.' },
  { title: 'Receive optimized guidance', description: 'Get a concise recommendation plan you can trust.' },
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAuthNavigation = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
      return;
    }
    navigate('/login', { state: { from: { pathname: path } } });
  };

  return (
    <div className="overflow-hidden bg-slate-950">
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex rounded-full border border-emerald-500/15 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                Trusted by modern agri-business teams
              </div>
              <div className="space-y-5 max-w-2xl">
                <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">Premium agricultural intelligence for confident farm decisions.</h1>
                <p className="text-lg leading-8 text-slate-300">
                  KissanAI turns weather, soil and crop data into clear recommendations and reliable profitability insights, delivered in a calm, professional experience.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleAuthNavigation('/recommendation')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Start recommendation
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleAuthNavigation('/dashboard')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:border-emerald-300/30 hover:bg-slate-800"
                >
                  View dashboard
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                    <metric.icon className="h-5 w-5 text-emerald-300" />
                    <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Dashboard preview</p>
                  <p className="mt-2 text-lg font-semibold text-white">Clean insights, one view.</p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">Calm view</span>
              </div>
              <div className="space-y-4 rounded-[1.75rem] bg-slate-950/90 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-900/90 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Best crop</p>
                    <p className="mt-3 text-xl font-semibold text-white">Wheat</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/90 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profit estimate</p>
                    <p className="mt-3 text-xl font-semibold text-white">Rs 72k</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                    <span>Land allocation</span>
                    <span>42%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/2 rounded-full bg-emerald-400" />
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Weather</p>
                  <div className="mt-3 flex items-center justify-between text-white">
                    <span>Cloudy</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Stable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
                <feature.icon className="h-6 w-6 text-emerald-300" />
                <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">How it works</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Three simple steps to a confident farm plan</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">{index + 1}</div>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950/90 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Ready to get started</p>
            <p className="mt-3 text-3xl font-semibold text-white">Bring premium farm intelligence to your operations.</p>
          </div>
          <button
            type="button"
            onClick={() => handleAuthNavigation('/recommendation')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Begin now
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;