export const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export const PLAN_CAP = 5;

export async function getAllWorkouts() {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function getWorkoutById(id) {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Workout not found");
  const data = await res.json();
  if (!data || !data.id) throw new Error("Workout not found");
  return data;
}

export function caloriesOf(w) {
  return w?.caloriesBurned ?? w?.calories ?? 0;
}
