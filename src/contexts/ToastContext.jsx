import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => dismiss(id), 3200);
  }, [dismiss]);

  const icons = {
    success: CheckCircle2,
    info: Info,
    error: AlertTriangle,
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-6 inset-x-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none">
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info;
          return (
            <div
              key={toast.id}
              className="animate-toast pointer-events-auto flex items-center gap-2 bg-surface text-primary border border-themed shadow-lg rounded-lg px-4 py-3 max-w-sm w-full sm:w-auto"
            >
              <Icon size={18} className={toast.type === 'error' ? 'text-[var(--color-danger)]' : 'text-[var(--color-brand)]'} />
              <span className="text-sm flex-1">{toast.message}</span>
              <button onClick={() => dismiss(toast.id)} aria-label="إغلاق" className="text-secondary hover:text-primary">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
