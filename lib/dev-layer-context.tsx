"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface DevLayerContextValue {
  bugClicks: number;
  registerBugClick: () => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  devMode: boolean;
  setDevMode: (enabled: boolean) => void;
}

const BUG_CLICKS_TO_UNLOCK = 5;

const DevLayerContext = createContext<DevLayerContextValue | null>(null);

export function DevLayerProvider({ children }: { children: ReactNode }) {
  const [bugClicks, setBugClicks] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [devMode, setDevMode] = useState(false);

  const registerBugClick = useCallback(() => {
    setBugClicks((current) => {
      const next = current + 1;
      if (next >= BUG_CLICKS_TO_UNLOCK) {
        setTerminalOpen(true);
        return 0;
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      bugClicks,
      registerBugClick,
      terminalOpen,
      setTerminalOpen,
      devMode,
      setDevMode,
    }),
    [bugClicks, registerBugClick, terminalOpen, devMode],
  );

  return (
    <DevLayerContext.Provider value={value}>
      {children}
    </DevLayerContext.Provider>
  );
}

export function useDevLayer(): DevLayerContextValue {
  const context = useContext(DevLayerContext);
  if (!context) {
    throw new Error("useDevLayer must be used within DevLayerProvider");
  }
  return context;
}