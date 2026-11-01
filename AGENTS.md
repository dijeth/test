# AGENTS.md

NestJS + Prisma + GraphQL (code-first, Apollo) + PostgreSQL. Read-only API: only queries, no mutations.

## Commands
- `npm run dev` — start Postgres (docker), apply migrations, run app in watch mode
- `npm run db:up` / `db:down` — start/stop the dev Postgres container
- `npm run db:migrate` — create/apply a migration after editing `prisma/schema.prisma`
- `npm run db:seed` — wipe and refill tables with faker data
- `npm run build` — compile (`nest build`)
- No tests or linter are configured yet.

GraphQL sandbox: http://localhost:3000/graphql (port from `PORT`).

## Dependencies
Versions are pinned deliberately (Nest 12, @nestjs/graphql 14, Apollo Server 5, TypeScript 5, Prisma 7).
Do not bump major versions: newer ones have peer-dependency conflicts. Apollo Server 5 needs `@as-integrations/express5`.
Prisma 7 requires Node 20.19+, 22.12+, or 24+; use Node 24 (`.nvmrc`). Its client is generated into `src/generated/prisma`.

## Conventions
- App env vars are read via `ConfigService` (`src/config`); `process.env` is accessed only for startup validation and Prisma CLI/seed setup.
  A new variable must be added to `src/config/env.schema.ts` (zod) and `.env.example`.
- One Nest module per entity (`src/<entity>/`: `*.model.ts`, `*.resolver.ts`, `*.module.ts`), registered in `AppModule`.
  A pure M2M join table without extra fields (`ProfileSkill`) gets no module; expose it via fields on both sides.
  A join table with extra fields (`CompanyProfile`) does get one.
- GraphQL models are written by hand and mirror `schema.prisma`; keep them in sync.
- Relations are resolved with `@ResolveField` (N+1 is accepted for now; use DataLoader if data grows).
- Schema changes: edit `schema.prisma`, run `npm run db:migrate`, then update the models and `prisma/seed.ts`.
- Prisma config and datasource URL are in `prisma.config.ts`; Prisma 7 requires the PostgreSQL driver adapter.
- Prisma query logging is controlled by `PRISMA_LOG` (`query,info,warn,error`).
