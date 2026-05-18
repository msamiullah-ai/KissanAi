import { useEffect, useRef, useState } from 'react';
import api from '../services/api';
import type { WeatherResponse } from '../types/recommendation';

const REFRESH_INTERVAL_MS = 600000;

export const useWeather = (district: string | null) => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const cacheKey = district ? `kissanai_weather_${district.toLowerCase()}` : null;

  const loadCachedWeather = () => {
    if (!cacheKey) {
      return;
    }
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setWeather(JSON.parse(cached) as WeatherResponse);
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }
  };

  const saveCachedWeather = (payload: WeatherResponse) => {
    if (!cacheKey) {
      return;
    }
    localStorage.setItem(cacheKey, JSON.stringify(payload));
  };

  const fetchWeather = async () => {
    if (!district) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setOffline(false);

    try {
      const response = await api.get<WeatherResponse>(`/api/weather/${encodeURIComponent(district)}`);
      setWeather(response.data);
      saveCachedWeather(response.data);
    } catch (err) {
      setError('Unable to load live weather. Showing cached data if available.');
      setOffline(true);
      loadCachedWeather();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCachedWeather();
    void fetchWeather();

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      void fetchWeather();
    }, REFRESH_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [district]);

  return {
    weather,
    isLoading,
    error,
    offline,
    refresh: fetchWeather,
  };
};
