import { getDb } from "../api/queries/connection.js";
// TODO: import tables from "./schema.js"

// Seed entry point. Kept minimal on purpose: the demo catalogue lives in
// contracts/products.ts and contracts/travel.ts, and orders/webhook rows are
// created by real API traffic, so there is nothing to insert here yet. Run with
// `npm run db:push` to sync the schema instead.
async function main() {
  const db = getDb();
  void db;
  console.log("seed: nothing to insert (schema-only).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
