import { useContext } from 'react';
import { RecommendationContext } from '../context/RecommendationContext';

export const useRecommendation = () => useContext(RecommendationContext);
