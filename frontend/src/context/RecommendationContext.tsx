import { createContext, useMemo, useState, type ReactNode } from 'react';
import type { RecommendationRequest, RecommendationResponse } from '../types/recommendation';
import type { RecommendationResult } from '../types/recommendation';
import { generateRecommendation } from '../services/recommendation';

interface RecommendationContextState {
  data: RecommendationResponse | null;
  isLoading: boolean;
  error: string | null;
  isOffline: boolean;
  fetchRecommendations: (payload: RecommendationRequest) => Promise<void>;
}

export const RecommendationContext = createContext<RecommendationContextState>({
  data: null,
  isLoading: false,
  error: null,
  isOffline: false,
  fetchRecommendations: async () => {},
});

const RecommendationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const fetchRecommendations = async (payload: RecommendationRequest) => {
    setIsLoading(true);
    setError(null);
    setIsOffline(false);

    try {
      const result: RecommendationResult = await generateRecommendation(payload);
      setData(result.response);
      setIsOffline(result.isFallback);
      if (result.isFallback) {
        setError('Backend offline — demo recommendation loaded.');
      }
    } catch (err) {
      setError((err as Error).message || 'Unable to fetch recommendations.');
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({ data, isLoading, error, isOffline, fetchRecommendations }),
    [data, isLoading, error, isOffline],
  );

  return <RecommendationContext.Provider value={value}>{children}</RecommendationContext.Provider>;
};

export default RecommendationProvider;
