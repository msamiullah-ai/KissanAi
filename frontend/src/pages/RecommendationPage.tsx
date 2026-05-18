import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationForm from '../components/RecommendationForm';
import { useRecommendation } from '../hooks/useRecommendation';
import RecommendationLoader from '../components/RecommendationLoader';
import { useToast } from '../hooks/useToast';
import { useHistoryContext } from '../context/HistoryContext';
import { createHistoryRecord } from '../services/historyService';

const RecommendationPage = () => {
  const { isLoading, error, data, fetchRecommendations, isOffline } = useRecommendation();
  const navigate = useNavigate();
  const toast = useToast();

  const { addHistory } = useHistoryContext();

  useEffect(() => {
    if (!isLoading && data) {
      if (isOffline) {
        toast.showToast({
          variant: 'error',
          title: 'Backend offline',
          description: 'Loaded demo recommendation data while the API is unavailable.',
        });
      } else {
        toast.showToast({
          variant: 'success',
          title: 'Recommendation ready',
          description: 'AI insights generated successfully. Redirecting to dashboard.',
        });
      }

      addHistory(
        createHistoryRecord({
          district: data.farm_analysis.district,
          season: data.farm_analysis.season,
          soil_type: data.farm_analysis.soil_type,
          ai_confidence_score: data.ai_confidence_score,
          profitability_summary: data.profitability_summary,
          summary: data.recommended_crops.map((crop) => crop.crop_name).join(' + '),
        }),
      );
      navigate('/dashboard');
    }
  }, [data, isLoading, isOffline, navigate, toast, addHistory]);

  useEffect(() => {
    if (!isLoading && error && !data) {
      toast.showToast({
        variant: 'error',
        title: 'Recommendation failed',
        description: error,
      });
    }
  }, [error, isLoading, data, toast]);

  return (
    <div className="space-y-8 py-6">
      <div className="glass-card p-8">
        <div className="mb-5">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Recommendation engine</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Generate AI-backed crop planning</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Provide your farm conditions and get a professional recommendation report that includes crop insights, risk signals, and irrigation guidance.
          </p>
        </div>
        <RecommendationForm onSubmit={fetchRecommendations} />
      </div>

      {isLoading && <RecommendationLoader />}

      {!isLoading && error && !data && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-red-200">
          <p className="font-semibold">Unable to generate recommendations</p>
          <p className="mt-2 text-sm text-slate-300">{error}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;
