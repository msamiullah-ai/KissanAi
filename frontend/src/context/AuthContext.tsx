import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProfile } from '../types/platform';

interface AuthContextState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, district: string, name?: string) => Promise<void>;
  register: (name: string, email: string, password: string, district: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const storageKey = 'kissanai_auth_user';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setUser(JSON.parse(stored) as UserProfile);
    }
  }, []);

  const saveUser = (profile: UserProfile) => {
    localStorage.setItem(storageKey, JSON.stringify(profile));
    setUser(profile);
  };

  const login = async (email: string, password: string, district: string, name = 'Kissan User') => {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name,
      email,
      district,
      token: `demo-jwt-${crypto.randomUUID()}`,
    };
    saveUser(profile);
    navigate('/dashboard');
  };

  const register = async (name: string, email: string, password: string, district: string) => {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name,
      email,
      district,
      token: `demo-jwt-${crypto.randomUUID()}`,
    };
    saveUser(profile);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem(storageKey);
    setUser(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user?.token), login, register, logout }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
