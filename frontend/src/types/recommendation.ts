export interface RecommendationRequest {
  district: string;
  season: 'Rabi' | 'Kharif' | 'Zaid';
  soil_type: string;
  land_area: number;
  water_availability: string;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface CropRecommendationItem {
  crop_name: string;
  suitability_score: number;
  confidence_score: number;
  expected_profit: number;
  estimated_yield: number;
  risk_level: string;
  water_requirement: string;
  weather_compatibility: number;
  final_score: number;
  score_breakdown: {
    soil_score: number;
    weather_score: number;
    water_score: number;
    profit_score: number;
    risk_score: number;
    season_score: number;
    district_multiplier: number;
    final_score: number;
    weather_contribution: number;
  };
  explanation: string;
  recommendation_reasons: string[];
  recommendation_strength: string;
}

export interface LandAllocationItem {
  crop_name: string;
  allocation_percentage: number;
  acreage_allocation: number;
}

export interface WeatherAlertItem {
  message: string;
  severity: string;
}

export interface WeatherForecast {
  date: string;
  condition: string;
  temperature: number;
  humidity: number;
  rainfall_chance: number;
  wind_speed: number;
}

export interface WeatherResponse {
  district: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  clouds: number;
  weather_icon: string;
  rainfall_chance: number;
  rainfall_mm: number;
  wind_speed: number;
  condition: string;
  condition_description: string;
  status_badges: string[];
  forecast: WeatherForecast[];
  fetched_at: string;
}

export interface IrrigationAdviceItem {
  advice_text: string;
  recommended_actions: string[];
}

export interface ProfitInsight {
  total_expected_profit: number;
  average_profit_per_acre: number;
  highest_profit_crop: string;
}

export interface FarmAnalysis {
  district: string;
  season: string;
  soil_type: string;
  land_area: number;
  water_availability: string;
  weather_summary: string;
}

export interface RecommendationResponse {
  farm_analysis: FarmAnalysis;
  recommended_crops: CropRecommendationItem[];
  land_allocation: LandAllocationItem[];
  weather_alerts: WeatherAlertItem[];
  irrigation_advice: IrrigationAdviceItem;
  profitability_summary: ProfitInsight;
  generated_at: string;
  ai_confidence_score: number;
}

export interface RecommendationResult {
  response: RecommendationResponse;
  isFallback: boolean;
}
