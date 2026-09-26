import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[#ccff00] text-xs font-bold uppercase tracking-[0.25em] mb-3">Error 404</p>
      <h1 className="font-display text-6xl sm:text-7xl font-bold uppercase tracking-tight mb-4">
        Lost rep?
      </h1>
      <p className="text-[#9ca3af] mb-8 max-w-sm">
        This lift does not exist — check the library and get back under the bar.
      </p>
      <Link href="/" className="btn-accent px-8 py-3 text-xs">
        Go to workouts
      </Link>
    </div>
  );
}
