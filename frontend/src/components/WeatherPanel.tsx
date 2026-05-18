import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Droplet, Sun, Thermometer, Wind } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useWeather } from '../hooks/useWeather';
import type { WeatherResponse } from '../types/recommendation';

interface WeatherPanelProps {
  district: string;
}

const weatherIcons: Record<string, typeof Sun> = {
  clear: Sun,
  clouds: Cloud,
  rain: CloudRain,
  drizzle: CloudDrizzle,
  thunderstorm: CloudRain,
  snow: CloudSnow,
  mist: Wind,
  haze: Wind,
};

const WeatherPanel = ({ district }: WeatherPanelProps) => {
  const { weather, isLoading, error, offline } = useWeather(district);

  const selectedIcon = weatherIcons[weather?.condition.toLowerCase() ?? 'clear'] ?? Sun;
  const MetricIcon = selectedIcon;
  const trendData = weather?.forecast.map((item) => ({
    date: new Date(item.date).toLocaleDateString(undefined, { weekday: 'short' }),
    temperature: item.temperature,
  })) ?? [];

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Weather intelligence</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Live farm conditions</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{district}</span>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-28 animate-pulse rounded-[2rem] bg-slate-900/70" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-28 animate-pulse rounded-[2rem] bg-slate-900/70" />
            <div className="h-28 animate-pulse rounded-[2rem] bg-slate-900/70" />
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
              <p>{error}</p>
              {offline && <p className="mt-2 text-xs text-slate-300">Offline weather fallback is active.</p>}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-[1fr,0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Current</p>
                  <h4 className="mt-2 text-3xl font-semibold text-white">{weather ? `${weather.temperature}°C` : '--'}</h4>
                  <p className="mt-2 text-sm text-slate-400">{weather?.condition_description ?? 'Live conditions unavailable'}</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-400/10 text-emerald-200">
                  <MetricIcon className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Thermometer className="h-4 w-4" />
                  <p className="text-sm uppercase tracking-[0.3em]">Humidity</p>
                </div>
                <p className="mt-3 text-3xl font-semibold text-white">{weather?.humidity ?? '--'}%</p>
                <p className="mt-2 text-sm text-slate-400">Current humidity level.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5">
                <div className="flex items-center gap-2 text-sky-300">
                  <Droplet className="h-4 w-4" />
                  <p className="text-sm uppercase tracking-[0.3em]">Rain chance</p>
                </div>
                <p className="mt-3 text-3xl font-semibold text-white">{weather?.rainfall_chance ?? '--'}%</p>
                <p className="mt-2 text-sm text-slate-400">Probability of rainfall in the next day.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Wind className="h-4 w-4" />
                  <p className="text-sm uppercase tracking-[0.3em]">Wind speed</p>
                </div>
                <p className="mt-3 text-3xl font-semibold text-white">{weather?.wind_speed ?? '--'} m/s</p>
                <p className="mt-2 text-sm text-slate-400">Current wind velocity.</p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex flex-wrap gap-3">
              {weather?.status_badges.map((badge) => (
                <span key={badge} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
                  {badge}
                </span>
              ))}
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                  <Line type="monotone" dataKey="temperature" stroke="#34d399" strokeWidth={3} dot={{ r: 4, fill: '#34d399' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherPanel;
