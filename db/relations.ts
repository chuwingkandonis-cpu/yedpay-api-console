import {} from "./schema.js";

// Relations are declared on the schema tables in ./schema.ts itself; this file
// exists so drizzle queries that pass `schema` (with relations) keep working
// and so `db/seed.ts` has a stable import target. Intentionally side-effect-only.
export {};
