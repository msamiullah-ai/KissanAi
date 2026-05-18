import { useMemo } from 'react';
import { ArrowUpRight, Leaf, Sparkles, Thermometer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecommendation } from '../hooks/useRecommendation';
import RecommendationLoader from '../components/RecommendationLoader';
import CropRecommendationCard from '../components/CropRecommendationCard';
import DashboardStatCard from '../components/DashboardStatCard';
import WeatherAlertCard from '../components/WeatherAlertCard';
import RiskIndicator from '../components/RiskIndicator';
import ExplanationPanel from '../components/ExplanationPanel';
import LandAllocationChart from '../components/LandAllocationChart';
import AIConfidenceCard from '../components/AIConfidenceCard';
import ProfitabilitySummary from '../components/ProfitabilitySummary';
import EmptyState from '../components/EmptyState';
import DashboardHero from '../components/DashboardHero';
import SystemStatusPanel from '../components/SystemStatusPanel';
import DistrictMap from '../components/DistrictMap';
import WeatherPanel from '../components/WeatherPanel';
import { exportReportAsPDF } from '../utils/pdfExport';
import { statusItems, districtComparisonData } from '../utils/demoData';

const DashboardPage = () => {
  const { data, isLoading, error } = useRecommendation();
  const navigate = useNavigate();

  const allocationData = useMemo(
    () =>
      data?.land_allocation.map((item) => ({
        name: item.crop_name,
        value: item.allocation_percentage,
      })) ?? [],
    [data],
  );

  const topCrop = data?.recommended_crops?.[0];
  const highestRisk = data?.recommended_crops.some((crop) => crop.risk_level === 'High')
    ? 'High'
    : data?.recommended_crops.some((crop) => crop.risk_level === 'Medium')
    ? 'Medium'
    : 'Low';

  if (isLoading) {
    return <RecommendationLoader />;
  }

  if (!data && error) {
    return <EmptyState title="Dashboard unavailable" message="We could not load recommendation data. Please try again or rerun the recommendation engine." actionLink="/recommendation" />;
  }

  if (!data) {
    return <EmptyState title="No recommendations yet" message="Generate a recommendation so the dashboard can display crop insights, profitability charts, and irrigation alerts." actionLink="/recommendation" />;
  }

  const handleExport = () => {
    void exportReportAsPDF('dashboard-report', 'kissanai-report.pdf');
  };

  return (
    <div className="space-y-10" id="dashboard-report">
      <DashboardHero data={data} />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard title="AI Confidence" value={`${data.ai_confidence_score}%`} Icon={Sparkles} accent="from-emerald-400 to-teal-400" />
        <DashboardStatCard title="Expected Profit" value={`Rs ${data.profitability_summary.total_expected_profit}`} Icon={ArrowUpRight} accent="from-lime-400 to-emerald-300" />
        <DashboardStatCard title="Land Area" value={`${data.farm_analysis.land_area} acres`} Icon={Leaf} accent="from-cyan-400 to-sky-400" />
        <DashboardStatCard title="Risk Pulse" value={highestRisk} Icon={Thermometer} accent="from-amber-400 to-orange-400" />
      </div>

      {error && (
        <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5 text-amber-100 backdrop-blur-sm">
          <p className="font-semibold">Warning: {error}</p>
          <p className="mt-2 text-sm text-slate-300">Data has been loaded from a demo fallback to keep the dashboard functional.</p>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.5fr,0.9fr]">
        <div className="space-y-6">
          <WeatherPanel district={data.farm_analysis.district} />
          <SystemStatusPanel statuses={statusItems} />
          <DistrictMap districts={districtComparisonData} />
        </div>
        <div>
          <div className="glass-card rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Export report</p>
                <h3 className="mt-2 text-xl font-semibold text-white">AI agricultural PDF</h3>
              </div>
              <button type="button" onClick={handleExport} className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                Export PDF
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">Generate a premium PDF report including recommendations, profitability analysis, weather intelligence, and irrigation advice.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr,0.9fr]">
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Farm analysis summary</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Conditions overview</h2>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400/15 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/25"
                onClick={() => navigate('/recommendation')}
              >
                Re-run recommendation
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">District</p>
                <p className="mt-3 text-xl font-semibold text-white">{data.farm_analysis.district}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Season</p>
                <p className="mt-3 text-xl font-semibold text-white">{data.farm_analysis.season}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Soil type</p>
                <p className="mt-3 text-xl font-semibold text-white">{data.farm_analysis.soil_type}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Water availability</p>
                <p className="mt-3 text-xl font-semibold text-white">{data.farm_analysis.water_availability}</p>
              </div>
            </div>
            <div className="mt-6 rounded-3xl bg-slate-950/80 p-5 text-slate-300">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Weather summary</p>
              <p className="mt-3 text-base leading-7 text-slate-200">{data.farm_analysis.weather_summary}</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Crop recommendations</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Top AI picks</h3>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{data.recommended_crops.length} crops</span>
            </div>
            <div className="grid gap-5">
              {data.recommended_crops.map((crop) => (
                <CropRecommendationCard key={crop.crop_name} crop={crop} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <AIConfidenceCard confidence={data.ai_confidence_score} strength={topCrop?.recommendation_strength ?? 'Moderate'} data={data.recommended_crops} />
          <ProfitabilitySummary summary={data.profitability_summary} recommendedCropsCount={data.recommended_crops.length} highestRisk={highestRisk} />
          <LandAllocationChart allocation={data.land_allocation} />
          <WeatherAlertCard alerts={data.weather_alerts} irrigation={data.irrigation_advice} />
          <ExplanationPanel explanation={topCrop?.explanation ?? 'No explanation available.'} />
          <RiskIndicator crops={data.recommended_crops} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
