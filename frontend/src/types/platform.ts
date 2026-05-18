export interface UserProfile {
  id: string;
  name: string;
  email: string;
  district: string;
  token: string;
}

export interface HistoryRecord {
  id: string;
  createdAt: string;
  district: string;
  season: string;
  soil_type: string;
  summary: string;
  ai_confidence_score: number;
  profitability_summary: {
    total_expected_profit: number;
    average_profit_per_acre: number;
    highest_profit_crop: string;
  };
}

export interface StatusItem {
  label: string;
  status: 'online' | 'degraded' | 'offline';
  details: string;
}

export interface ChatPrompt {
  id: string;
  label: string;
  question: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt: string;
}

export interface AnalyticsTrendItem {
  month: string;
  profit: number;
  waterUsage: number;
  riskIndex: number;
}

export interface DistrictComparisonItem {
  district: string;
  suitability: number;
  profitIndex: number;
  riskScore: number;
}

export interface RecommendationHistoryFilters {
  district?: string;
  crop?: string;
}
