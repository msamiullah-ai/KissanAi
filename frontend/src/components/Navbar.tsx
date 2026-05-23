import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, Sparkles, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const publicNavItems = [{ label: 'Home', to: '/' }];
const protectedNavItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Recommendations', to: '/recommendation' },
  { label: 'Analytics', to: '/analytics' },
];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const initials = user
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
    : 'KA';

  const handlePrimaryAction = () => {
    if (isAuthenticated) {
      navigate('/recommendation');
      return;
    }
    navigate('/login', { state: { from: { pathname: '/recommendation' } } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-emerald-300 shadow-sm shadow-emerald-500/10">
            <Leaf className="h-5 w-5" />
          </span>
          <span>KissanAI</span>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {publicNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${
                  isActive ? 'bg-emerald-400/10 text-emerald-200' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated &&
            protectedNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${
                    isActive ? 'bg-emerald-400/10 text-emerald-200' : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Get recommendation
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-100 transition hover:border-emerald-300/40"
                aria-label="Open profile menu"
              >
                <span className="text-sm font-semibold text-emerald-200">{initials}</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-14 z-50 w-72 rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-200">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{user?.name ?? 'KissanAI user'}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email ?? 'user@example.com'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="mt-4 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-emerald-300/40 hover:bg-slate-900"
                  >
                    <span>Logout</span>
                    <LogOut className="h-4 w-4 text-emerald-300" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-300/40 hover:bg-slate-900"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
