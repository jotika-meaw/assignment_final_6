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

## Getting Started
```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # must pass without errors
npm start
```

## Plan Rules
- Max **5 lifts** in Today's Plan (`Add to today's plan` disables + warns when full).
- Plan / Saved / Done persist in `localStorage`, so reloads and redeploys keep your log.
- Every action fires a toast: added, saved, marked done, removed, full/duplicate warnings.

## Deploy (Vercel)
```bash
npm i -g vercel
vercel login
vercel --prod
```
Or push `main` to GitHub and Import in Vercel. No env vars needed. Dynamic API fetches use `cache: no-store`, all routes are reload-safe.
