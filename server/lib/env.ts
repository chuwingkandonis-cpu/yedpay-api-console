import "dotenv/config";

// Lazy env access: a serverless function must be able to BOOT even when env
// vars are missing, or every route (including getConfig, which only reports
// what is configured) dies with a 500 before it can answer. Reading happens
// per-request, so setting a var and redeploying is picked up immediately.
function read(name: string): string {
  return process.env[name] ?? "";
}

export const env = {
  get appId() {
    return read("APP_ID");
  },
  get appSecret() {
    return read("APP_SECRET");
  },
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  get databaseUrl() {
    return read("DATABASE_URL");
  },
};
