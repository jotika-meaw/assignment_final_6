"use client";

import { useEffect, useMemo, useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import ExerciseCard from "@/components/ExerciseCard";
import { getAllWorkouts, caloriesOf } from "@/lib/api";

const SORTS = ["Duration", "Calories", "Rating"];

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [sortBy, setSortBy] = useState("Duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getAllWorkouts();
        if (alive) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (alive) setLoadError(e.message || "Failed to load");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items;
    if (q) {
      list = list.filter(
        (w) =>
          w.name?.toLowerCase().includes(q) ||
          w.equipment?.toLowerCase().includes(q) ||
          (w.muscleGroups || []).some((g) => g.toLowerCase().includes(q))
      );
    }
    const copy = [...list];
    if (sortBy === "Duration") copy.sort((a, b) => (a.duration || 0) - (b.duration || 0));
    if (sortBy === "Calories") copy.sort((a, b) => caloriesOf(a) - caloriesOf(b));
    if (sortBy === "Rating") copy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return copy;
  }, [items, sortBy, query]);

  return (
    <div className="flex flex-col bg-[#0c0d10]">
      <HeroBanner />

      <section id="library" className="py-16 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-3">
              The Library
            </h2>
            <p className="text-[#9ca3af]">Twelve lifts covering every major muscle group.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-8">
            <label className="relative w-full sm:max-w-xs">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or tag…"
                className="w-full bg-[#0f1115] border border-white/10 rounded-full px-5 py-3 text-sm placeholder:text-[#6b7280] focus:outline-none focus:border-[#ccff00]/60"
              />
            </label>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs uppercase tracking-widest text-[#9ca3af]">Sort By</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#0f1115] border border-white/10 rounded-full px-5 py-2.5 pr-9 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-[#ccff00]/60"
                >
                  {SORTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none">
                  ⌄
                </span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#9ca3af] text-sm">Loading workouts…</p>
            </div>
          ) : loadError ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Error: {loadError}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-ghost px-8 py-3 text-xs"
              >
                Try Again
              </button>
            </div>
          ) : visible.length === 0 ? (
            <p className="text-center text-[#9ca3af] py-16">No lifts match your search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {visible.map((w) => (
                <ExerciseCard key={w.id} workout={w} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
