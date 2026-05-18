import { useState } from 'react';
import { Moon, Sun, Globe, Bell, Droplet } from 'lucide-react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [district, setDistrict] = useState('Lahore');
  const [sensitivity, setSensitivity] = useState(75);
  const [irrigation, setIrrigation] = useState('Balanced');

  return (
    <div className="space-y-8 py-6">
      <div className="glass-card p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Settings</p>
            <h1 className="text-3xl font-semibold text-white">Platform preferences</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-400">Configure display, notifications, district defaults, and AI sensitivity for your farm decisions.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Appearance</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Theme mode</h2>
              </div>
              <button type="button" onClick={() => setDarkMode((prev) => !prev)} className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                {darkMode ? <Moon className="inline h-4 w-4" /> : <Sun className="inline h-4 w-4" />} {darkMode ? 'Dark' : 'Light'}
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-300">Dark mode delivers a premium dashboard experience with neon accents and soft glass surfaces.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Language</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Regional preferences</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-2 text-sm text-slate-200">
                <Globe className="h-4 w-4" /> {language}
              </div>
            </div>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-4 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100">
              <option>English</option>
              <option>Urdu</option>
              <option>Punjabi</option>
            </select>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Notifications</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Alert preferences</h2>
              </div>
              <button type="button" onClick={() => setNotifications((prev) => !prev)} className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                {notifications ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-300">Manage how you receive system and irrigation alerts across recommendations.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">District</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Preferred region</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
                <Compass className="h-4 w-4" /> {district}
              </div>
            </div>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className="mt-4 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100">
              <option>Lahore</option>
              <option>Faisalabad</option>
              <option>Multan</option>
              <option>Sahiwal</option>
            </select>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI sensitivity</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Recommendation tuning</h2>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">{sensitivity}%</span>
            </div>
            <input type="range" min="40" max="100" value={sensitivity} onChange={(e) => setSensitivity(Number(e.target.value))} className="mt-6 w-full accent-emerald-400" />
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Irrigation</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Water preference</h2>
              </div>
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">{irrigation}</span>
            </div>
            <select value={irrigation} onChange={(e) => setIrrigation(e.target.value)} className="mt-4 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100">
              <option>Balanced</option>
              <option>Water saver</option>
              <option>High yield</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
