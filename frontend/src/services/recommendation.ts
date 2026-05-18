import api from './api';
import type { RecommendationRequest, RecommendationResponse, RecommendationResult } from '../types/recommendation';
import { fallbackRecommendation } from './mockRecommendation';

export async function generateRecommendation(payload: RecommendationRequest): Promise<RecommendationResult> {
  try {
    const response = await api.post<RecommendationResponse>('/api/recommendations/generate', payload);
    return { response: response.data, isFallback: false };
  } catch (error) {
    console.warn('API request failed, using demo fallback recommendation', error);
    return { response: fallbackRecommendation, isFallback: true };
  }
}
