import { CloudRain, Droplet, Flame, ShieldCheck } from 'lucide-react';
import type { IrrigationAdviceItem, WeatherAlertItem } from '../types/recommendation';

interface WeatherAlertCardProps {
  alerts: WeatherAlertItem[];
  irrigation: IrrigationAdviceItem;
}

const WeatherAlertCard = ({ alerts, irrigation }: WeatherAlertCardProps) => {
  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Weather alerts</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Climate & irrigation warnings</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">Actionable</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-900/80 p-5">
          <div className="flex items-center gap-2 text-cyan-300">
            <CloudRain className="h-4 w-4" />
            <p className="text-sm uppercase tracking-[0.3em]">Rainfall</p>
          </div>
          <p className="mt-3 text-lg font-semibold text-white">{alerts.filter((alert) => alert.message.toLowerCase().includes('rain')).length || 'No'} alerts</p>
          <p className="mt-2 text-sm text-slate-400">Alerts are derived from the latest weather forecast and soil conditions.</p>
        </div>
        <div className="rounded-3xl bg-slate-900/80 p-5">
          <div className="flex items-center gap-2 text-emerald-300">
            <Droplet className="h-4 w-4" />
            <p className="text-sm uppercase tracking-[0.3em]">Irrigation</p>
          </div>
          <p className="mt-3 text-lg font-semibold text-white">{irrigation.advice_text}</p>
          <p className="mt-2 text-sm text-slate-400">{irrigation.recommended_actions.join(' • ')}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.message} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-200">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-white">{alert.severity}</p>
                  <p className="mt-1 text-sm text-slate-400">{alert.message}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-slate-400">No weather alerts currently. Conditions appear stable.</div>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-900/80 p-5">
          <div className="flex items-center gap-2 text-orange-300">
            <Flame className="h-4 w-4" />
            <p className="text-sm uppercase tracking-[0.3em]">Heatwave</p>
          </div>
          <p className="mt-3 text-sm text-slate-300">Monitor soil moisture during dry spells and adjust watering cadence.</p>
        </div>
        <div className="rounded-3xl bg-slate-900/80 p-5">
          <div className="flex items-center gap-2 text-sky-300">
            <ShieldCheck className="h-4 w-4" />
            <p className="text-sm uppercase tracking-[0.3em]">Pesticide</p>
          </div>
          <p className="mt-3 text-sm text-slate-300">Use protective treatment only when pest risk becomes significant.</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlertCard;
