import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { HistoryRecord, RecommendationHistoryFilters } from '../types/platform';
import { loadHistory, saveHistory } from '../services/historyService';

interface HistoryContextState {
  history: HistoryRecord[];
  filteredHistory: HistoryRecord[];
  addHistory: (record: HistoryRecord) => void;
  filterHistory: (filters: RecommendationHistoryFilters) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextState>({
  history: [],
  filteredHistory: [],
  addHistory: () => {},
  filterHistory: () => {},
  clearHistory: () => {},
});

export const useHistoryContext = () => useContext(HistoryContext);

const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const stored = loadHistory();
    setHistory(stored);
    setFilteredHistory(stored);
  }, []);

  const addHistory = (record: HistoryRecord) => {
    const updated = [record, ...history];
    setHistory(updated);
    setFilteredHistory(updated);
    saveHistory(updated);
  };

  const filterHistory = (filters: RecommendationHistoryFilters) => {
    const filtered = history.filter((item) => {
      const districtMatch = filters.district ? item.district === filters.district : true;
      const cropMatch = filters.crop ? item.profitability_summary.highest_profit_crop.toLowerCase().includes(filters.crop.toLowerCase()) : true;
      return districtMatch && cropMatch;
    });
    setFilteredHistory(filtered);
  };

  const clearHistory = () => {
    setHistory([]);
    setFilteredHistory([]);
    saveHistory([]);
  };

  const value = useMemo(
    () => ({ history, filteredHistory, addHistory, filterHistory, clearHistory }),
    [history, filteredHistory],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export default HistoryProvider;
