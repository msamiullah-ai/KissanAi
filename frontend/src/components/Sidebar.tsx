import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Clock3, Settings, Sparkles, LogOut, type LucideIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type NavItem = { label: string; to: string; icon?: LucideIcon };
const publicNavItems: NavItem[] = [{ label: 'Home', to: '/' }];
const protectedNavItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Recommendations', to: '/recommendation', icon: Sparkles },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'History', to: '/history', icon: Clock3 },
  { label: 'Settings', to: '/settings', icon: Settings },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <aside className="relative z-50">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/20 transition hover:scale-105 md:hidden"
        aria-label="Open navigation"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-white/10 bg-slate-950/95 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 md:sticky md:top-20 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col gap-6 px-5 py-6">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-emerald-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">KissanAI</p>
                <p className="text-xs text-slate-500">Decision intelligence</p>
              </div>
            </Link>
          </div>

          {isAuthenticated && user ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signed in as</p>
              <p className="mt-3 text-sm font-semibold text-white">{user.name}</p>
              <p className="mt-1 text-sm text-slate-400 truncate">{user.email}</p>
            </div>
          ) : null}

          <nav className="space-y-2">
            {(isAuthenticated ? protectedNavItems : publicNavItems).map((item) => {
              const Icon = item.icon ?? Sparkles;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${
                      isActive ? 'bg-emerald-400/10 text-emerald-200' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {isAuthenticated ? (
            <div className="mt-auto space-y-3">
              <Link
                to="/settings"
                className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-300 transition hover:border-emerald-300/40 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-300 transition hover:border-emerald-300/40 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-400">
              <p className="font-semibold text-white">Sign in for full access</p>
              <p className="mt-2 leading-6">Unlock dashboards, analytics, and recommendation workflows.</p>
            </div>
          )}
        </div>
      </div>
      {open && <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />}
    </aside>
  );
};

export default Sidebar;
