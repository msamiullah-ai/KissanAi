import { useState, type FormEvent } from 'react';
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
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
        <label className="text-sm font-medium text-slate-200">District</label>
        <select
          className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100"
          value={formState.district}
          onChange={(e) => handleChange('district', e.target.value)}
        >
          {districts.map((district) => (
            <option key={district}>{district}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
        <label className="text-sm font-medium text-slate-200">Season</label>
        <select
          className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100"
          value={formState.season}
          onChange={(e) => handleChange('season', e.target.value as RecommendationRequest['season'])}
        >
          {seasons.map((season) => (
            <option key={season}>{season}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
        <label className="text-sm font-medium text-slate-200">Soil Type</label>
        <input
          value={formState.soil_type}
          onChange={(e) => handleChange('soil_type', e.target.value)}
          className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100"
          placeholder="Loamy"
        />
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
        <label className="text-sm font-medium text-slate-200">Land Area (acres)</label>
        <input
          type="number"
          min={1}
          value={formState.land_area}
          onChange={(e) => handleChange('land_area', Number(e.target.value))}
          className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100"
        />
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
        <label className="text-sm font-medium text-slate-200">Water Availability</label>
        <select
          className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100"
          value={formState.water_availability}
          onChange={(e) => handleChange('water_availability', e.target.value)}
        >
          {waterOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
        <label className="text-sm font-medium text-slate-200">Temperature (°C)</label>
        <input
          type="number"
          value={formState.temperature}
          onChange={(e) => handleChange('temperature', Number(e.target.value))}
          className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100"
        />
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
        <label className="text-sm font-medium text-slate-200">Humidity (%)</label>
        <input
          type="number"
          value={formState.humidity}
          onChange={(e) => handleChange('humidity', Number(e.target.value))}
          className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100"
        />
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
        <label className="text-sm font-medium text-slate-200">Rainfall (mm)</label>
        <input
          type="number"
          value={formState.rainfall}
          onChange={(e) => handleChange('rainfall', Number(e.target.value))}
          className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100"
        />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full rounded-3xl bg-emerald-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          Generate AI Recommendations
        </button>
      </div>
    </form>
  );
};

export default RecommendationForm;
