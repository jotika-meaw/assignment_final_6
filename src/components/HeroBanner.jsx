export default function HeroBanner() {
  return (
    <section className="px-4 sm:px-6 pt-6 sm:pt-8">
      <div className="max-w-[1232px] mx-auto bg-[#0f1115] border border-[#222630] rounded-[16px] p-6 md:p-14 flex flex-col lg:flex-row items-center gap-8 justify-between overflow-hidden">
        <div className="flex-1 w-full lg:max-w-[620px]">
          <p className="text-[#ccff00] text-[11px] font-bold uppercase tracking-[1.5px] mb-4">
            Workout Library
          </p>
          <h1 className="font-display font-bold uppercase text-[42px] sm:text-[52px] lg:text-[60px] leading-[0.95] tracking-tight mb-6">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#9ca3af] max-w-xl mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="btn-accent inline-flex items-center gap-2 py-3 px-8 rounded-full text-xs"
          >
            Browse Workouts
            <span aria-hidden>→</span>
          </a>
        </div>
        <div className="w-full sm:w-[320px] lg:w-[334px] h-[260px] sm:h-[320px] lg:h-[334px] shrink-0">
          <img
            src="/hero.png"
            alt="Athlete training illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
