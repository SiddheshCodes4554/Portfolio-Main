"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type DeskPower = { powered: boolean; setPowered: (value: boolean) => void };
const PowerContext = createContext<DeskPower | null>(null);
export function WorkbenchPower({ children }: { children: ReactNode }) {
  const [powered, setPowered] = useState(false);
  return <PowerContext.Provider value={{ powered, setPowered }}><div className={`hero-desk ${powered ? "desk-powered" : ""}`} aria-label="Interactive scrapbook collection">{children}<span className="desk-wire" aria-hidden="true" /></div></PowerContext.Provider>;
}
export function useDeskPower() {
  const power = useContext(PowerContext);
  if (!power) throw new Error("Workbench objects require WorkbenchPower.");
  return power;
}
