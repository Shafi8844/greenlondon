# Frontend (Next.js)

This app is part of a two-project layout one level up: this `frontend/` (Next 16, App Router under `src/app`) and `../Backend/` (Express, port 5050). The auth flow uses Better Auth with the `jwt()` plugin: clients fetch a short-lived JWT from `GET /api/auth/token` (session cookie), publish/verify happens via the EdDSA JWKS at `GET /api/auth/jwks` — the Express backend (`jose`) verifies `Authorization: Bearer` tokens against that JWKS and derives the acting user's email from the token, falling back to explicit email fields only when no token header is present. A presented-but-invalid token is rejected with 401. The backend serves `/events` (`?upcoming=1`, `?creatorEmail=` filters), `/events/featured` (6 via Mongo `.limit()`), `/events/:id` + PATCH/DELETE (ownership-checked against the JWT identity), `/add_events`, and `/reservation` (`?email=` filter; POST blocks duplicates) from the same MongoDB database (`greenLondon`, via `MONGO_URI` in each project's own `.env`). Components hit it with hardcoded `http://localhost:5050` URLs — run the backend (`node ../Backend/index.js`) alongside `npm run dev` or data fetching fails.

Pages: `/` home, `/upcoming-events`, `/events/[id]` details, `/create-event`, `/joined-events`, `/manage-events`. Route gating is owned by `proxy.ts` (the Next 16 replacement for `middleware.ts`, to be added by the team); pages read the session only for the user-scoped API calls.

## Commands

- `npm run dev` — Turbopack dev server on :3000; enforces `.env` presence (`BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGO_URI`).
- `npm run lint` — ESLint; `npm run build` is the only typecheck (no `typecheck` script).
- No test suite exists; don't invent test commands.

## Conventions

- Tools are on newer majors than defaults in memory: Next 16, React 19.3, Tailwind v4 (CSS-based config in `src/app/globals.css`, loaded via Turbopack), ESLint 9 flat config. See the nextjs-agent-rules block below before writing Next code.
- Auth is Better Auth: server instance in `src/lib/auth.ts` (Mongo adapter, hardcoded `db('greenLondon')`, `jwt()` plugin, JWT cookieCache session), client in `src/lib/auth-client.ts`, catch-all route at `src/app/api/auth/[...all]/route.ts`. JWTs for backend calls are fetched via `src/lib/session-token.ts` (`getAuthToken`) and sent as `Authorization: Bearer`. Signed pages live under `src/app/(auth)/` (note the historically inconsistent `sign-In` casing).
- Event fields live in `src/lib/eventData.ts` (type + helpers). Thumbnail URLs accept any host (wildcard remotePatterns in `next.config.ts`). Join snapshots are stored on the `reservation` collection with the event fields inline.
- `events/[id]` sets `export const instant = false` — its runtime fetch fails the build under `cacheComponents` otherwise. Keep client-side fetching in list pages (skeletons are already there).
- shadcn/base-nova components live in `src/components/ui` with `@/` aliases (see `components.json`); app-specific cards/forms are also in that folder, not a separate directory.
- `<img>` hosts are unrestricted via wildcard remotePatterns in `next.config.ts`; that config also enables `reactCompiler`, `cacheComponents`, and `partialPrefetching`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
