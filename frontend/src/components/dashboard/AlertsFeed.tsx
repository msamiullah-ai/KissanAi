import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { IrrigationAdviceItem, WeatherAlertItem } from '../../types/recommendation';

interface AlertsFeedProps {
  alerts: WeatherAlertItem[];
  irrigation: IrrigationAdviceItem;
}

const severityTone: Record<string, string> = {
  low: 'text-emerald-200 bg-emerald-400/10',
  medium: 'text-amber-200 bg-amber-400/10',
  high: 'text-orange-200 bg-orange-400/10',
  critical: 'text-red-200 bg-red-400/10',
};

const AlertsFeed = ({ alerts, irrigation }: AlertsFeedProps) => {
  return (
    <section className="dashboard-panel p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Alerts feed</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Operations watchlist</h2>
        </div>
        <AlertTriangle className="h-5 w-5 text-amber-300" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr,0.8fr]">
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={`${alert.severity}-${alert.message}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-4"
            >
              <div className="flex items-start gap-3">
                <span className={`rounded-2xl p-2 ${severityTone[alert.severity] ?? 'bg-slate-700 text-slate-200'}`}>
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold capitalize text-white">{alert.severity}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{alert.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-3xl border border-emerald-300/10 bg-emerald-400/5 p-5">
          <div className="flex items-center gap-2 text-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            <p className="text-xs uppercase tracking-[0.24em]">Recommended actions</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{irrigation.advice_text}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {irrigation.recommended_actions.map((action) => (
              <span key={action} className="rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-300">
                {action}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertsFeed;
