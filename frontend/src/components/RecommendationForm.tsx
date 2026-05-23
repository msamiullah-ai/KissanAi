import { CloudRain, MapPin, Sprout, Thermometer, Waves, type LucideIcon } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import type { RecommendationRequest } from '../types/recommendation';

interface RecommendationFormProps {
  onSubmit: (payload: RecommendationRequest) => Promise<void>;
}

const seasons = ['Rabi', 'Kharif', 'Zaid'];
const districts = ['Lahore', 'Faisalabad', 'Multan', 'Sahiwal', 'Bahawalpur'];
const waterOptions = ['Low', 'Medium', 'High'];

const RecommendationForm = ({ onSubmit }: RecommendationFormProps) => {
  const [formState, setFormState] = useState<RecommendationRequest>({
    district: 'Lahore',
    season: 'Rabi',
    soil_type: 'Loamy',
    land_area: 10,
    water_availability: 'Medium',
    temperature: 24,
    humidity: 60,
    rainfall: 40,
  });

  const handleChange = (field: keyof RecommendationRequest, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 xl:grid-cols-12">
      <div className="dashboard-panel p-6 xl:col-span-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="section-kicker">Farm profile</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Regional intelligence inputs</h2>
          </div>
          <MapPin className="h-5 w-5 text-emerald-300" />
        </div>

        <div className="grid gap-4">
          <Field label="District">
            <select
              className="form-control"
              value={formState.district}
              onChange={(e) => handleChange('district', e.target.value)}
            >
              {districts.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
          </Field>

          <Field label="Season">
            <div className="grid grid-cols-3 gap-2">
              {seasons.map((season) => (
                <button
                  key={season}
                  type="button"
                  onClick={() => handleChange('season', season as RecommendationRequest['season'])}
                  className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                    formState.season === season
                      ? 'border-emerald-300/30 bg-emerald-400/15 text-emerald-100 shadow-[0_12px_40px_rgba(52,211,153,0.12)]'
                      : 'border-white/10 bg-slate-950/60 text-slate-400 hover:border-emerald-300/30 hover:bg-slate-950/80 hover:text-slate-100'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Soil Type">
            <input
              value={formState.soil_type}
              onChange={(e) => handleChange('soil_type', e.target.value)}
              className="form-control"
              placeholder="Loamy"
            />
          </Field>

          <Field label="Land Area (acres)">
            <input
              type="number"
              min={1}
              value={formState.land_area}
              onChange={(e) => handleChange('land_area', Number(e.target.value))}
              className="form-control"
            />
          </Field>
        </div>
      </div>

      <div className="dashboard-panel p-6 xl:col-span-4">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="section-kicker">Climate snapshot</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Weather fallback controls</h2>
          </div>
          <CloudRain className="h-5 w-5 text-cyan-300" />
        </div>

        <div className="grid gap-4">
          <NumberField icon={Thermometer} label="Temperature (°C)" value={formState.temperature} onChange={(value) => handleChange('temperature', value)} />
          <NumberField icon={Waves} label="Humidity (%)" value={formState.humidity} onChange={(value) => handleChange('humidity', value)} />
          <NumberField icon={CloudRain} label="Rainfall (mm)" value={formState.rainfall} onChange={(value) => handleChange('rainfall', value)} />
          <Field label="Water Availability">
            <select
              className="form-control"
              value={formState.water_availability}
              onChange={(e) => handleChange('water_availability', e.target.value)}
            >
              {waterOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div className="dashboard-panel flex flex-col justify-between p-5 xl:col-span-3">
        <div>
          <p className="section-kicker">AI readiness</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Recommendation packet</h2>
          <div className="mt-6 space-y-3">
            {[
              ['District', formState.district],
              ['Season', formState.season],
              ['Soil', formState.soil_type],
              ['Water', formState.water_availability],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm">
                <span className="text-slate-500">{label}</span>
                <span className="font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-6 py-4 text-base font-semibold text-slate-950 transition duration-200 hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
        >
          <Sprout className="h-5 w-5" />
          Generate Intelligence
        </button>
      </div>
    </form>
  );
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">{label}</span>
    {children}
  </label>
);

const NumberField = ({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <label className="block rounded-3xl border border-white/10 bg-slate-950/60 p-4">
    <div className="mb-3 flex items-center gap-2 text-slate-400">
      <Icon className="h-4 w-4 text-cyan-300" />
      <span className="text-xs uppercase tracking-[0.22em]">{label}</span>
    </div>
    <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full bg-transparent text-3xl font-semibold text-white outline-none" />
  </label>
);

export default RecommendationForm;
