import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, Loader2, X } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'loading';

interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

const toastIcon = (variant: ToastVariant) => {
  switch (variant) {
    case 'success':
      return <CheckCircle2 className="h-5 w-5 text-emerald-300" />;
    case 'error':
      return <AlertTriangle className="h-5 w-5 text-rose-300" />;
    default:
      return <Loader2 className="h-5 w-5 animate-spin text-sky-300" />;
  }
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, toast.variant === 'loading' ? 4000 : 3200);
  };

  const value = useMemo(() => ({ showToast }), []);

  useEffect(() => {
    if (toasts.length > 5) {
      setToasts((current) => current.slice(-5));
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-24 z-50 flex w-full max-w-xs flex-col gap-3 px-4 sm:right-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 ease-out hover:-translate-y-0.5 ${
              toast.variant === 'success' ? 'ring-1 ring-emerald-400/30' : toast.variant === 'error' ? 'ring-1 ring-rose-400/30' : 'ring-1 ring-sky-400/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{toastIcon(toast.variant)}</div>
              <div className="flex-1">
                <p className="font-semibold text-white">{toast.title}</p>
                {toast.description && <p className="mt-1 text-sm text-slate-300">{toast.description}</p>}
              </div>
              <button
                className="text-slate-400 transition hover:text-white"
                onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
