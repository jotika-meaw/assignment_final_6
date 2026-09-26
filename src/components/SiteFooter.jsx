export default function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-white rounded grid place-items-center">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 10H17M7 6V14M13 6V14M5 8V12M15 8V12"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-display font-bold text-[14px] tracking-[0.7px]">FITLOG</span>
        </div>
        <p className="text-xs text-[#9ca3af] text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
