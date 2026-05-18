import { useState } from 'react';
import type { DistrictComparisonItem } from '../types/platform';

interface DistrictMapProps {
  districts: DistrictComparisonItem[];
}

const DistrictMap = ({ districts }: DistrictMapProps) => {
  const [selected, setSelected] = useState<string>(districts[0]?.district ?? '');

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">District intelligence</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Punjab district map</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">Interactive grid</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
          <div className="grid gap-3">
            {districts.map((district) => (
              <button
                key={district.district}
                type="button"
                onClick={() => setSelected(district.district)}
                className={`rounded-3xl px-4 py-3 text-left transition ${selected === district.district ? 'bg-emerald-400/10 text-emerald-200' : 'bg-slate-950/70 text-slate-300'} hover:bg-emerald-400/10`}
              >
                <p className="font-semibold">{district.district}</p>
                <p className="mt-1 text-xs text-slate-400">Suitability {district.suitability}%</p>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Selected district</p>
          <p className="mt-4 text-3xl font-semibold text-white">{selected}</p>
          <div className="mt-6 grid gap-3">
            {districts
              .filter((district) => district.district === selected)
              .map((district) => (
                <div key={district.district} className="space-y-2">
                  <p className="text-sm text-slate-400">Profit index</p>
                  <p className="text-2xl font-semibold text-emerald-200">{district.profitIndex}</p>
                  <p className="text-sm text-slate-400">Risk score: {district.riskScore}</p>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${district.suitability}%` }} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictMap;
