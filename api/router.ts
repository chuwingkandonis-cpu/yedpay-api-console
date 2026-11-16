import { createRouter, publicQuery } from "./middleware.js";
import { yedpayRouter } from "./yedpay/router.js";
import { ordersRouter } from "./yedpay/orders.js";
import { travelRouter } from "./yedpay/travel.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  yedpay: yedpayRouter,
  orders: ordersRouter,
  travel: travelRouter,
});

export type AppRouter = typeof appRouter;
