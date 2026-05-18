import { Link, NavLink } from 'react-router-dom';
import { Sparkles, Activity, Leaf } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Recommendations', to: '/recommendation' },
];

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-emerald-200">
          <Leaf className="h-7 w-7 text-emerald-300" />
          KissanAI
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors duration-300 ${isActive ? 'text-emerald-300' : 'text-slate-300 hover:text-emerald-200'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/recommendation"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          <Sparkles className="h-4 w-4" />
          Try AI
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
