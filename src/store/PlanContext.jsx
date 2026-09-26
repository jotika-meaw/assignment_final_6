"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PLAN_CAP, caloriesOf } from "@/lib/api";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog.todayPlan.v1";
const SAVED_KEY = "fitlog.savedIds.v1";
const DONE_KEY = "fitlog.doneMap.v1";

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [doneMap, setDoneMap] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readLS(PLAN_KEY, []));
    setSavedIds(readLS(SAVED_KEY, []));
    setDoneMap(readLS(DONE_KEY, {}));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
  }, [savedIds, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(DONE_KEY, JSON.stringify(doneMap));
  }, [doneMap, hydrated]);

  const value = useMemo(() => {
    const addToPlan = (workout) => {
      if (plan.length >= PLAN_CAP) return { ok: false, reason: "full" };
      if (plan.some((w) => w.id === workout.id)) return { ok: false, reason: "duplicate" };
      setPlan((p) => [...p, workout]);
      return { ok: true };
    };

    const removeFromPlan = (id) =>
      setPlan((p) => p.filter((w) => w.id !== id));

    const saveForLater = (id) => {
      let added = false;
      setSavedIds((prev) => {
        if (prev.includes(id)) return prev;
        added = true;
        return [...prev, id];
      });
      return added;
    };

    const unsave = (id) => setSavedIds((prev) => prev.filter((x) => x !== id));

    const markDone = (id) =>
      setDoneMap((prev) => ({ ...prev, [id]: true }));

    const totals = {
      exercises: plan.length,
      minutes: plan.reduce((s, w) => s + (w.duration || 0), 0),
      calories: plan.reduce((s, w) => s + caloriesOf(w), 0),
    };

    return {
      plan,
      savedIds,
      doneMap,
      hydrated,
      planCount: plan.length,
      savedCount: savedIds.length,
      totals,
      addToPlan,
      removeFromPlan,
      saveForLater,
      unsave,
      markDone,
    };
  }, [plan, savedIds, doneMap, hydrated]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
