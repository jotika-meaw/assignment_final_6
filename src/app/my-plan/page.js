"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/store/PlanContext";
import { useNotify } from "@/components/Notify";
import { API_BASE, caloriesOf } from "@/lib/api";

export default function MyPlanPage() {
  const {
    plan,
    savedIds,
    doneMap,
    totals,
    removeFromPlan,
    markDone,
    unsave,
  } = usePlan();
  const { notify } = useNotify();
  const [tab, setTab] = useState("today");
  const [savedItems, setSavedItems] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);

  useEffect(() => {
    if (tab !== "saved" || savedIds.length === 0) {
      setSavedItems([]);
      return;
    }
    let alive = true;
    setSavedLoading(true);
    Promise.all(
      savedIds.map((id) =>
        fetch(`${API_BASE}/${id}`).then((r) => (r.ok ? r.json() : null)).catch(() => null)
      )
    )
      .then((rows) => {
        if (alive) setSavedItems(rows.filter(Boolean));
      })
      .finally(() => {
        if (alive) setSavedLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [tab, savedIds]);

  const list = tab === "today" ? plan : savedItems;
  const busy = tab === "saved" && savedLoading;

  const cards = useMemo(() => list, [list]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight mb-3">
          My Plan
        </h1>
        <p className="text-[#9ca3af] text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
        {[
          ["Exercises", totals.exercises],
          ["Minutes", totals.minutes],
          ["Calories", totals.calories],
        ].map(([label, val]) => (
          <div key={label} className="surface p-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9ca3af] mb-2">{label}</p>
            <p className="font-display text-3xl font-bold">{val}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <div className="surface !rounded-full p-1 flex gap-1">
          {[
            ["today", "Today's Plan"],
            ["saved", "Saved"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                tab === key ? "bg-[#ccff00] text-black" : "text-[#9ca3af] hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {busy ? (
        <p className="text-center py-20 text-[#9ca3af]">Loading workouts…</p>
      ) : cards.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-white/[0.02] rounded-3xl border-2 border-dashed border-white/10 px-6">
          <p className="font-display text-xl font-bold uppercase tracking-wider mb-3">
            Nothing here yet
          </p>
          <p className="text-[#9ca3af] text-sm mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/#library" className="btn-accent inline-block px-8 py-3 text-xs">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          {cards.map((w) => {
            const done = !!doneMap[w.id];
            return (
              <div
                key={w.id}
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border bg-[#0f1115]/60 transition-colors ${
                  done && tab === "today" ? "border-[#ccff00]/40" : "border-white/10"
                }`}
              >
                <img
                  src={w.image}
                  alt={w.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold uppercase text-[13px] sm:text-sm truncate">
                    {w.name} {done && tab === "today" ? "✓" : ""}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#9ca3af] truncate">{w.equipment}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] sm:text-xs text-[#9ca3af] mt-1">
                    <span>◷ {w.duration} min</span>
                    <span>● {caloriesOf(w)} kcal</span>
                    <span>★ {w.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <Link
                    href={`/workout/${w.id}`}
                    className="text-[10px] sm:text-[11px] font-bold uppercase border border-white/20 rounded-full px-3 sm:px-4 py-2 hover:border-[#ccff00] hover:text-[#ccff00] whitespace-nowrap"
                  >
                    View Details
                  </Link>
                  {tab === "today" ? (
                    <>
                      <button
                        title="Mark as done"
                        onClick={() => {
                          markDone(w.id);
                          notify("Marked as done");
                        }}
                        className={`w-8 h-8 rounded-full border grid place-items-center text-xs transition-colors ${
                          done
                            ? "bg-[#ccff00] text-black border-[#ccff00]"
                            : "border-white/20 hover:border-[#ccff00] hover:text-[#ccff00]"
                        }`}
                      >
                        ✓
                      </button>
                      <button
                        title="Remove"
                        onClick={() => {
                          removeFromPlan(w.id);
                          notify("Removed from plan", "info");
                        }}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 grid place-items-center text-xs hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <button
                      title="Remove saved"
                      onClick={() => {
                        unsave(w.id);
                        notify("Removed from saved", "info");
                      }}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 grid place-items-center text-xs hover:bg-red-500/20"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
