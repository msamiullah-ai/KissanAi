import { motion } from 'framer-motion';
import { Activity, CloudSun, Command, Download, Moon, RefreshCw, Search, ShieldCheck, Sparkles, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { RecommendationResponse, WeatherResponse } from '../../types/recommendation';

interface TopCommandBarProps {
  data: RecommendationResponse;
  weather: WeatherResponse | null;
  weatherLoading: boolean;
  weatherOffline: boolean;
  onExport: () => void;
  onRefreshWeather: () => void;
  onOpenCommandPalette: () => void;
  onToggleCommandCenter: () => void;
}

const districts = ['Lahore', 'Faisalabad', 'Multan', 'Sahiwal', 'Bahawalpur'];

const TopCommandBar = ({
  data,
  weather,
  weatherLoading,
  weatherOffline,
  onExport,
  onRefreshWeather,
  onOpenCommandPalette,
  onToggleCommandCenter,
}: TopCommandBarProps) => {
  const [districtQuery, setDistrictQuery] = useState(data.farm_analysis.district);
  const [isSolarMode, setIsSolarMode] = useState(false);
  const matches = useMemo(
    () => districts.filter((district) => district.toLowerCase().includes(districtQuery.toLowerCase())).slice(0, 4),
    [districtQuery],
  );

  useEffect(() => {
    document.documentElement.dataset.dashboardTone = isSolarMode ? 'solar' : 'dark';
  }, [isSolarMode]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="dashboard-panel sticky top-24 z-30 p-5"
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr,1fr,auto] xl:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-200 shadow-[0_0_26px_rgba(16,185,129,0.18)]">
            <Activity className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-500">Command center</p>
            <h1 className="text-xl font-semibold tracking-tight text-white">KissanAI decision console</h1>
          </div>
          <span className="ml-0 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 xl:ml-3">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]" />
            Live
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300 [animation-delay:240ms]" />
            AI thinking
          </span>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={districtQuery}
              onChange={(event) => setDistrictQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600"
              placeholder="Search district"
            />
          </div>
          {districtQuery && matches.length > 0 && districtQuery !== data.farm_analysis.district && (
            <div className="absolute left-0 right-0 top-12 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl">
              {matches.map((district) => (
                <button
                  key={district}
                  type="button"
                  onClick={() => setDistrictQuery(district)}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-100"
                >
                  {district}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4">
          <div className="command-metric">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <span>{data.ai_confidence_score}%</span>
            <small>AI</small>
          </div>
          <div className="command-metric">
            <CloudSun className="h-4 w-4 text-cyan-300" />
            <span>{weather ? `${weather.temperature}°C` : '--'}</span>
            <small>Temp</small>
          </div>
          <div className="command-metric">
            <ShieldCheck className="h-4 w-4 text-amber-300" />
            <span>{data.weather_alerts.length}</span>
            <small>Alerts</small>
          </div>
          <div className="command-metric">
            <RefreshCw className={`h-4 w-4 text-slate-300 ${weatherLoading ? 'animate-spin' : ''}`} />
            <span>{weatherOffline ? 'Cache' : 'Sync'}</span>
            <small>Mode</small>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onRefreshWeather} className="icon-command" title="Refresh weather">
            <RefreshCw className={`h-4 w-4 ${weatherLoading ? 'animate-spin' : ''}`} />
          </button>
          <button type="button" onClick={() => setIsSolarMode((value) => !value)} className="icon-command" title="Toggle display mode">
            {isSolarMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button type="button" onClick={onOpenCommandPalette} className="icon-command" title="Command palette">
            <Command className="h-4 w-4" />
          </button>
          <button type="button" onClick={onToggleCommandCenter} className="icon-command" title="Collapse command center">
            <X className="h-4 w-4" />
          </button>
          <button type="button" onClick={onExport} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default TopCommandBar;
