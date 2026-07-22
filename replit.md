# Pizza Ride

A pizza delivery web app — pnpm monorepo with a React/Vite landing page and an Express API server backed by PostgreSQL.

## Project Structure

```
artifacts/
  pizza-ride/       # React + Vite frontend (Tailwind, Radix UI, shadcn, wouter)
  api-server/       # Express 5 + TypeScript API server
  mockup-sandbox/   # Design/mockup preview sandbox (internal tool)
lib/
  db/               # Drizzle ORM + PostgreSQL schema (empty schema, ready to extend)
  api-spec/         # OpenAPI 3.1 spec (orval code-gen)
  api-client-react/ # Generated React Query hooks (from openapi.yaml)
  api-zod/          # Generated Zod schemas (from openapi.yaml)
```

## How to Run

Dependencies are managed with pnpm. Install once from the workspace root:

```bash
pnpm install
```

Workflows are pre-configured in Replit:

| Workflow | Command | URL |
|---|---|---|
| Pizza Ride (frontend) | `pnpm --filter @workspace/pizza-ride run dev` | `/` |
| API Server | `pnpm --filter @workspace/api-server run dev` | `/api` |

## Environment Variables

| Variable | Source | Notes |
|---|---|---|
| `DATABASE_URL` | Replit built-in PostgreSQL | Auto-injected |
| `PORT` | Replit | Auto-injected per artifact |
| `SESSION_SECRET` | Replit Secret | Set in Secrets panel |

## Database

Replit's built-in PostgreSQL is provisioned and connected. The Drizzle schema is in `lib/db/src/schema/index.ts` — currently empty (no tables defined yet).

To push schema changes to the database:

```bash
pnpm --filter @workspace/db run push
```

## API

The API is served at `/api`. Currently only a health-check endpoint exists:

- `GET /api/healthz` — returns `{ status: "ok" }`

The OpenAPI spec lives at `lib/api-spec/openapi.yaml`. After editing it, regenerate the client and Zod schemas:

```bash
pnpm --filter @workspace/api-spec run generate
```

## User Preferences

_No preferences recorded yet._
