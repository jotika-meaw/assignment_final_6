"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";

const NotifyContext = createContext(null);
let seq = 0;

export function NotifyProvider({ children }) {
  const [items, setItems] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    const tm = timers.current.get(id);
    if (tm) {
      clearTimeout(tm);
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    (message, kind = "success") => {
      const id = ++seq;
      setItems((prev) => [...prev.slice(-2), { id, message, kind }]);
      const tm = setTimeout(() => dismiss(id), 2400);
      timers.current.set(id, tm);
    },
    [dismiss]
  );

  return (
    <NotifyContext.Provider value={{ notify, dismiss }}>
      {children}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 w-[min(92vw,340px)]">
        {items.map((t) => (
          <div
            key={t.id}
            className={`toast-enter flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl ${
              t.kind === "success"
                ? "bg-[#ccff00] text-black border-[#ccff00]"
                : t.kind === "warn"
                  ? "bg-[#1a1d24] text-white border-[#ccff00]/40"
                  : "bg-[#14161c] text-white border-white/15"
            }`}
          >
            <span className="mt-0.5 font-black">
              {t.kind === "success" ? "✓" : t.kind === "warn" ? "!" : "i"}
            </span>
            <p className="flex-1 font-semibold leading-snug">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="opacity-60 hover:opacity-100 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotifyContext.Provider>
  );
}

export function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("useNotify must be within NotifyProvider");
  return ctx;
}
