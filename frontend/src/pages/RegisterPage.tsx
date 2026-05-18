import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', password: '', district: 'Lahore' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.showToast({ variant: 'error', title: 'Complete all fields', description: 'Name, email, password and district are required.' });
      return;
    }
    await register(form.name, form.email, form.password, form.district);
    toast.showToast({ variant: 'success', title: 'Account created', description: 'Welcome to KissanAI premium dashboard.' });
  };

  return (
    <div className="grid min-h-[calc(100vh-6rem)] place-items-center py-10">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-glow">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Create your premium account</p>
          <h1 className="text-4xl font-semibold text-white">Register with KissanAI</h1>
          <p className="text-slate-400">Sign up to access advanced recommendations, analytics, and farm health insights.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Full name</label>
            <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none" placeholder="Your name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <input value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none" placeholder="Create a password" />
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
          <button type="submit" className="w-full rounded-3xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">Register</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered? <Link to="/login" className="text-emerald-300 hover:text-emerald-200">Login instead</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
