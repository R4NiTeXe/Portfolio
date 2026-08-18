"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Check } from "lucide-react";

type Toast = { id: number; message: string };

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 left-1/2 z-[95] flex -translate-x-1/2 flex-col items-center gap-2"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="toast-in pointer-events-auto flex items-center gap-2.5 rounded-lg border border-mint/30 bg-[#0A0F1A]/95 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_-8px_rgba(101,246,213,0.4)] backdrop-blur-md"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint/15">
              <Check className="h-2.5 w-2.5 text-mint" />
            </span>
            <span className="mono-label !text-[10px] text-white/90">
              {toast.message}
            </span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}