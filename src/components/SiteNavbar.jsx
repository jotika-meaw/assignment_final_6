"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/store/PlanContext";

function NavLink({ href, children }) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`text-xs font-semibold tracking-wide transition-colors ${
        active ? "text-[#ccff00]" : "text-[#9ca3af] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

export default function SiteNavbar() {
  const { planCount, savedCount } = usePlan();

  return (
    <header className="fixed top-0 left-0 w-full h-[67px] bg-[#0f1115] border-b border-[#1b1f28] z-50">
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-6 h-6 rounded-md bg-[#ccff00] grid place-items-center">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 10H17M7 6V14M13 6V14"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-display font-bold text-[20px] tracking-tight">FITLOG</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          <NavLink href="/">Workout</NavLink>
          <NavLink href="/my-plan">My Plan</NavLink>
        </nav>

        {/* mobile links */}
        <nav className="flex md:hidden items-center gap-4">
          <NavLink href="/">Workout</NavLink>
          <NavLink href="/my-plan">My Plan</NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            title="Today's plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] pl-3 pr-2 py-1.5"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-black hidden min-[420px]:inline">
              Plan
            </span>
            <span className="min-w-5 h-5 px-1 rounded-full bg-black text-[#ccff00] grid place-items-center text-[11px] font-bold">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            title="Saved workouts"
            className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d1d5db] hidden min-[420px]:inline">
              Saved
            </span>
            <span className="min-w-5 h-5 px-1 rounded-full bg-[#1a1d24] grid place-items-center text-[11px] text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
