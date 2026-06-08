import { createContext, useContext, useState, type ReactNode } from "react";

interface LightboxContextValue {
  isLightboxOpen: boolean;
  setLightboxOpen: (open: boolean) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  return (
    <LightboxContext.Provider value={{ isLightboxOpen, setLightboxOpen }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}
