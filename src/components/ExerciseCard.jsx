"use client";

import Link from "next/link";
import { usePlan } from "@/store/PlanContext";
import { useNotify } from "@/components/Notify";
import { caloriesOf } from "@/lib/api";

export default function ExerciseCard({ workout }) {
  const { saveForLater } = usePlan();
  const { notify } = useNotify();

  const onSave = () => {
    const added = saveForLater(workout.id);
    notify(added ? "Saved for later" : "Already saved", added ? "success" : "warn");
  };

  return (
    <article className="surface group p-5 sm:p-6 flex flex-col h-full transition-colors hover:border-[#ccff00]/50">
      <div className="relative aspect-square overflow-hidden rounded-3xl mb-5 bg-black/40">
        <Link href={`/workout/${workout.id}`} className="block w-full h-full">
          <img
            src={workout.image}
            alt={workout.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={onSave}
          aria-label="Save for later"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 grid place-items-center text-white hover:text-[#ccff00] hover:border-[#ccff00]/50"
        >
          ♡
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {(workout.muscleGroups || []).map((g) => (
          <span
            key={g}
            className="text-[10px] font-bold uppercase tracking-wider bg-white/5 text-[#9ca3af] px-2.5 py-1 rounded-full border border-white/10"
          >
            {g}
          </span>
        ))}
      </div>

      <Link href={`/workout/${workout.id}`}>
        <h3 className="font-display text-lg sm:text-xl font-bold uppercase leading-tight mb-1.5 group-hover:text-[#ccff00] transition-colors">
          {workout.name}
        </h3>
      </Link>
      <p className="text-xs text-[#9ca3af] mb-4 truncate">{workout.equipment}</p>

      <div className="flex items-center gap-4 text-xs text-[#9ca3af] border-t border-white/10 pt-4 mb-5">
        <span className="flex items-center gap-1.5">
          <span className="text-[#ccff00]">◷</span> {workout.duration} min
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-red-400">●</span> {caloriesOf(workout)} kcal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-[#ccff00]">★</span> {workout.rating}
        </span>
      </div>

      <Link
        href={`/workout/${workout.id}`}
        className="btn-accent w-full py-3 text-[13px] text-center block mt-auto"
      >
        View Details
      </Link>
    </article>
  );
}
