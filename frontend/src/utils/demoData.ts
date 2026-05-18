import type { AnalyticsTrendItem, DistrictComparisonItem, HistoryRecord, StatusItem, ChatPrompt } from '../types/platform';

export const statusItems: StatusItem[] = [
  { label: 'AI engine', status: 'online', details: 'Model serving active' },
  { label: 'Weather API', status: 'online', details: 'Forecast polling stable' },
  { label: 'Database', status: 'degraded', details: 'Local demo storage' },
  { label: 'Recommendation engine', status: 'online', details: 'Analysis pipeline ready' },
  { label: 'System uptime', status: 'online', details: '12 days 4 hours' },
];

export const analyticsTrendData: AnalyticsTrendItem[] = [
  { month: 'Jan', profit: 58, waterUsage: 32, riskIndex: 22 },
  { month: 'Feb', profit: 65, waterUsage: 30, riskIndex: 20 },
  { month: 'Mar', profit: 72, waterUsage: 35, riskIndex: 18 },
  { month: 'Apr', profit: 84, waterUsage: 40, riskIndex: 16 },
  { month: 'May', profit: 90, waterUsage: 45, riskIndex: 15 },
  { month: 'Jun', profit: 78, waterUsage: 55, riskIndex: 24 },
  { month: 'Jul', profit: 66, waterUsage: 48, riskIndex: 28 },
  { month: 'Aug', profit: 64, waterUsage: 42, riskIndex: 26 },
];

export const districtComparisonData: DistrictComparisonItem[] = [
  { district: 'Lahore', suitability: 92, profitIndex: 88, riskScore: 18 },
  { district: 'Faisalabad', suitability: 86, profitIndex: 81, riskScore: 21 },
  { district: 'Multan', suitability: 79, profitIndex: 76, riskScore: 27 },
  { district: 'Sahiwal', suitability: 74, profitIndex: 68, riskScore: 30 },
  { district: 'Bahawalpur', suitability: 69, profitIndex: 64, riskScore: 34 },
];

export const analyticsPrompts: ChatPrompt[] = [
  { id: 'profit', label: 'Which crop is most profitable?', question: 'Which crop is most profitable?' },
  { id: 'water', label: 'How can I reduce water usage?', question: 'How can I reduce water usage?' },
  { id: 'risk', label: 'Which crop has lowest risk?', question: 'Which crop has lowest risk?' },
  { id: 'maize', label: 'Why is maize recommended?', question: 'Why is maize recommended?' },
];

export const analyticsHistoryRecords: HistoryRecord[] = [
  {
    id: 'rec-1',
    createdAt: '2026-05-15T08:35:00.000Z',
    district: 'Lahore',
    season: 'Rabi',
    soil_type: 'Loamy',
    summary: 'Wheat and maize selected for stable yield and premium margin.',
    ai_confidence_score: 88,
    profitability_summary: {
      total_expected_profit: 186000,
      average_profit_per_acre: 20667,
      highest_profit_crop: 'Wheat',
    },
  },
  {
    id: 'rec-2',
    createdAt: '2026-04-20T13:15:00.000Z',
    district: 'Faisalabad',
    season: 'Kharif',
    soil_type: 'Clayey',
    summary: 'Maize and cotton recommended for rising market demand.',
    ai_confidence_score: 82,
    profitability_summary: {
      total_expected_profit: 142500,
      average_profit_per_acre: 17812,
      highest_profit_crop: 'Maize',
    },
  },
];
