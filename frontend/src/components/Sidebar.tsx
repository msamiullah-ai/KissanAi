import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Activity, BarChart3, Clock3, Gear, LayoutDashboard, Sparkles, ShieldCheck } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Recommendation', to: '/recommendation', icon: Sparkles },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'History', to: '/history', icon: Clock3 },
  { label: 'Settings', to: '/settings', icon: Gear },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className="relative z-50">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/20 transition hover:scale-105 md:hidden"
        aria-label="Toggle navigation"
      >
        <Activity className="h-6 w-6" />
      </button>

      <div className={`fixed inset-y-0 left-0 w-80 transform bg-slate-950/95 shadow-2xl shadow-black/50 transition duration-500 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} md:relative md:top-0 md:block`}>
        <div className="flex h-full flex-col gap-8 px-6 py-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">KissanAI Pro</p>
                <p className="text-xs text-slate-400">Premium decision intelligence</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-300">Navigate the AI dashboard, manage recommendations, and explore analytics from one premium console.</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-3xl px-4 py-3 transition hover:bg-emerald-400/10 ${isActive ? 'bg-emerald-400/15 text-emerald-200' : 'text-slate-300'}`
                  }
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[2rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">AI status</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">Online</span>
              <span className="text-sm text-slate-300">Streaming insights</span>
            </div>
          </div>
        </div>
      </div>
      {open && <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />}
    </aside>
  );
};

export default Sidebar;
