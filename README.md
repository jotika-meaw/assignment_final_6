# FitLog — Workout Library. Train hard, log honest.

FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up. Browse twelve lifts, open any workout for full specs and coaching cues, then log it to a capped 5-lift daily plan.

Live Link: https://fitlog-workout-library-seven.vercel.app
Repo Link: https://github.com/jotika-meaw/Assignment_6_PH

## Technologies Used
- **Next.js 16 (App Router)** — routing, layouts, `not-found.js` for 404
- **React 19** — client components, context + hooks
- **Tailwind CSS v4** — dark theme, responsive grid, pills and cards
- **Context + localStorage** — today's plan / saved / done persists across reloads
- **FitLog REST API** — `https://api.abcz.workers.dev/api/fitlog`

## Key Features (5+)
1. **Workout Library** — fetches all lifts from the API, responsive 1 / 2 / 3 / 4 grid, each card shows image, category pills, name, equipment, duration / calories / rating, and links to details.
2. **Hero + Sort + Search** — `TRAIN WITH INTENT. LOG EVERY SET.` banner with `BROWSE WORKOUTS` anchor to `#library`; Sort By Duration / Calories / Rating dropdown plus name/tag search.
3. **Workout Details (2-column)** — big visual left, title/description/tags right, specs table (equipment / difficulty / sets / reps / duration / calories / rating), numbered instructions, `Add to today's plan` (capped at 5) and `Save for later` with toasts.
4. **My Plan log (`/my-plan`)** — `MY PLAN` header, live Exercises / Minutes / Calories metrics, Today's Plan / Saved tabs, `Loading workouts…` state, cards with View Details / Mark as Done ✓ / Remove ✕, and `NOTHING HERE YET` empty state with `Go to workouts`.
5. **Navbar badges + footer + 404** — `Workout` / `My Plan` links with active highlight, lime `Plan` pill + outlined `Saved` pill both linking to `/my-plan`, dark footer with `© 2026 FitLog`, custom 404, fully responsive mobile → desktop, reload-safe routes.

