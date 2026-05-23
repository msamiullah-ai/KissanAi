import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/dashboard';

  const [form, setForm] = useState({ name: '', email: '', password: '', district: 'Lahore' });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.showToast({ variant: 'error', title: 'Complete all fields', description: 'Name, email, password and district are required.' });
      return;
    }

    await register(form.name, form.email, form.password, form.district);
    toast.showToast({ variant: 'success', title: 'Account created', description: 'Welcome to KissanAI premium dashboard.' });
    navigate(from, { replace: true });
  };

  return (
    <div className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.12),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.06),transparent_20%)]" />
      <div className="grid min-h-[calc(100vh-6rem)] place-items-center px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        >
          <div className="grid gap-10 xl:grid-cols-[1fr,0.9fr] xl:items-center">
            <div className="space-y-5">
              <p className="section-kicker text-emerald-300">Create your premium account</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Register with KissanAI</h1>
              <p className="max-w-2xl text-slate-400">Sign up to access advanced recommendations, analytics, and farm health insights in one calm workspace.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Start faster</p>
              <p className="mt-4 text-sm text-slate-300">Once registered, your default district and history sync across recommendations and analytics.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Full name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10"
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">District</label>
                <select
                  value={form.district}
                  onChange={(e) => setForm((prev) => ({ ...prev, district: e.target.value }))}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10"
                >
                  <option>Lahore</option>
                  <option>Faisalabad</option>
                  <option>Multan</option>
                  <option>Sahiwal</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-3xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_18px_60px_rgba(52,211,153,0.18)] transition hover:scale-[1.01] hover:shadow-[0_24px_80px_rgba(52,211,153,0.22)]"
            >
              Create account
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Log in instead
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
