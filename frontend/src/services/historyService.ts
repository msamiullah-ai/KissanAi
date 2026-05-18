import type { HistoryRecord } from '../types/platform';

const storageKey = 'kissanai_history_records';

export const loadHistory = (): HistoryRecord[] => {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as HistoryRecord[];
  } catch {
    return [];
  }
};

export const saveHistory = (records: HistoryRecord[]) => {
  localStorage.setItem(storageKey, JSON.stringify(records));
};

export const createHistoryRecord = (payload: Partial<HistoryRecord>): HistoryRecord => ({
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  district: payload.district || 'Unknown District',
  season: payload.season || 'Rabi',
  soil_type: payload.soil_type || 'Loamy',
  summary: payload.summary || 'AI recommendation delivered.',
  ai_confidence_score: payload.ai_confidence_score ?? 75,
  profitability_summary: payload.profitability_summary || {
    total_expected_profit: 0,
    average_profit_per_acre: 0,
    highest_profit_crop: 'Unknown',
  },
});
