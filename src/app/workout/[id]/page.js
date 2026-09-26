"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/store/PlanContext";
import { useNotify } from "@/components/Notify";
import { getWorkoutById, caloriesOf, PLAN_CAP } from "@/lib/api";

export default function WorkoutDetailPage({ params }) {
  const { id } = use(params);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const { plan, addToPlan, saveForLater } = usePlan();
  const { notify } = useNotify();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getWorkoutById(id);
        if (alive) setWorkout(data);
      } catch {
        if (alive) setMissing(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#9ca3af] text-sm">Loading workout…</p>
      </div>
    );
  }

  if (missing || !workout) {
    return (
      <div className="py-24 text-center px-6">
        <p className="text-xl font-display font-bold uppercase mb-4">Workout not found</p>
        <Link href="/" className="btn-accent inline-block px-8 py-3 text-xs">
          Go to workouts
        </Link>
      </div>
    );
  }

  const inPlan = plan.some((w) => w.id === workout.id);
  const full = plan.length >= PLAN_CAP && !inPlan;

  const onAdd = () => {
    const res = addToPlan(workout);
    if (!res.ok && res.reason === "full") return notify("Plan is full — max 5 lifts", "warn");
    if (!res.ok) return notify("Already in today's plan", "warn");
    notify("Added to today's plan");
  };

  const onSave = () => {
    const added = saveForLater(workout.id);
    notify(added ? "Saved for later" : "Already saved", added ? "success" : "warn");
  };

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${caloriesOf(workout)} kcal`],
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/2">
          <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#0f1115]">
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        <div className="lg:w-1/2">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            {workout.name}
          </h1>
          <p className="text-[#9ca3af] leading-relaxed mb-6">{workout.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {(workout.muscleGroups || []).map((g) => (
              <span
                key={g}
                className="text-[11px] font-bold uppercase tracking-wider bg-white/5 text-[#9ca3af] px-3 py-1.5 rounded-full border border-white/10"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="surface p-5 sm:p-6 mb-8">
            <dl className="divide-y divide-white/10">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-[#9ca3af] uppercase text-[11px] tracking-[0.15em] pt-0.5">{k}</dt>
                  <dd className="font-bold text-right">{v}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-[#9ca3af] uppercase text-[11px] tracking-[0.15em] pt-0.5">Rating</dt>
                <dd className="font-bold flex items-center gap-1">
                  <span className="text-[#ccff00]">★</span> {workout.rating}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-4">
              Instructions
            </h3>
            <ol className="space-y-3">
              {(workout.instructions || []).map((step, i) => (
                <li key={i} className="flex gap-3.5 text-sm text-[#9ca3af]">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#ccff00] text-black grid place-items-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onAdd}
              disabled={full}
              className={`flex-1 py-3.5 rounded-full font-bold uppercase tracking-wider text-[13px] flex items-center justify-center gap-2 ${
                full ? "bg-white/10 text-[#6b7280] cursor-not-allowed" : "btn-accent"
              }`}
            >
              <span>+</span> Add to today&apos;s plan
            </button>
            <button
              onClick={onSave}
              className="btn-ghost flex-1 py-3.5 text-[13px] flex items-center justify-center gap-2"
            >
              <span>♡</span> Save for later
            </button>
          </div>
          <Link
            href="/#library"
            className="block text-center mt-6 text-[#ccff00] hover:underline text-sm"
          >
            ← Return to Library
          </Link>
        </div>
      </div>
    </div>
  );
}
