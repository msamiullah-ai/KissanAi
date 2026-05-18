import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ email: '', password: '', district: 'Lahore' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      toast.showToast({ variant: 'error', title: 'Missing fields', description: 'Please provide email and password.' });
      return;
    }
    await login(form.email, form.password, form.district);
    toast.showToast({ variant: 'success', title: 'Welcome back!', description: 'Logged in successfully.' });
  };

  return (
    <div className="grid min-h-[calc(100vh-6rem)] place-items-center py-10">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-glow">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Secure access</p>
          <h1 className="text-4xl font-semibold text-white">Login to KissanAI</h1>
          <p className="text-slate-400">Access your recommendation history, premium analytics, and AI dashboard.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <input value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none" placeholder="Enter your password" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">District</label>
            <select value={form.district} onChange={(e) => setForm((prev) => ({ ...prev, district: e.target.value }))} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100">
              <option>Lahore</option>
              <option>Faisalabad</option>
              <option>Multan</option>
              <option>Sahiwal</option>
            </select>
          </div>
          <button type="submit" className="w-full rounded-3xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          New user? <Link to="/register" className="text-emerald-300 hover:text-emerald-200">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
