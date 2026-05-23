import { motion } from 'framer-motion';
import { CloudRain, Droplets, Gauge, Thermometer, Waves, Wind } from 'lucide-react';
import type { RecommendationResponse, WeatherResponse } from '../../types/recommendation';

interface WeatherIntelligencePanelProps {
  data: RecommendationResponse;
  weather: WeatherResponse | null;
  isLoading: boolean;
  offline: boolean;
}

const forecastBars = [32, 44, 38, 52, 60, 48];

const WeatherIntelligencePanel = ({ data, weather, isLoading, offline }: WeatherIntelligencePanelProps) => {
  const metrics = [
    { label: 'Humidity', value: weather ? `${weather.humidity}%` : '--', icon: Droplets, color: 'bg-cyan-300' },
    { label: 'Rain', value: weather ? `${weather.rainfall_chance}%` : '--', icon: CloudRain, color: 'bg-blue-300' },
    { label: 'Wind', value: weather ? `${weather.wind_speed} m/s` : '--', icon: Wind, color: 'bg-sky-300' },
    { label: 'Pressure', value: weather ? `${weather.pressure} hPa` : '--', icon: Gauge, color: 'bg-slate-400' },
  ];

  return (
    <motion.section layout className="dashboard-panel h-full p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Live weather intelligence</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{data.farm_analysis.district}</h2>
        </div>
        <div className="relative rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-cyan-200">
          <span className="absolute inset-0 rounded-3xl bg-cyan-300/10 blur-xl" />
          <Thermometer className="relative h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{offline ? 'Cached feed' : 'OpenWeather feed'}</p>
            <p className="mt-2 text-5xl font-semibold text-white">{weather ? `${weather.temperature}°C` : '--'}</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isLoading ? 'bg-cyan-400/10 text-cyan-200' : 'bg-emerald-400/10 text-emerald-200'}`}>
              {isLoading ? 'Syncing' : 'Stable'}
            </span>
            <span className="text-sm text-slate-400">{weather?.condition_description ?? data.farm_analysis.weather_summary}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Forecast pulse</p>
              <p className="mt-2 text-lg font-semibold text-white">5-day trend</p>
            </div>
            <div className="rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {weather ? `${weather.wind_speed} m/s` : '--'} wind
            </div>
          </div>
          <div className="mt-5 h-36 overflow-hidden rounded-3xl bg-slate-900/80 p-4">
            <div className="h-full w-full rounded-3xl bg-slate-950/70 p-3">
              <div className="relative flex h-full items-end justify-between gap-2">
                {forecastBars.map((value, index) => (
                  <div key={index} className="relative flex-1">
                    <div className="h-full rounded-full bg-slate-900/80" />
                    <div
                      className="absolute bottom-0 left-0 right-0 mx-auto rounded-full bg-gradient-to-t from-cyan-300 via-sky-300 to-emerald-300"
                      style={{ height: `${value}%`, maxHeight: '100%' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Climate status</p>
              <p className="mt-2 text-lg font-semibold text-white">Microclimate overview</p>
            </div>
            <span className="rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {weather ? 'Live' : 'Offline'}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {metrics.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ${item.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-emerald-300/10 bg-emerald-400/5 p-5">
        <div className="flex items-center gap-2 text-emerald-200">
          <Waves className="h-4 w-4" />
          <p className="text-xs uppercase tracking-[0.24em]">Irrigation signal</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-300">{data.irrigation_advice.advice_text}</p>
      </div>
    </motion.section>
  );
};

export default WeatherIntelligencePanel;
