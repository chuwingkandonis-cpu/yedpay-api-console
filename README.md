# Yedpay API Console

Interactive console for testing every Yedpay online payment API against the
staging environment (`https://api-staging.yedpay.com/v1`), plus a Pearo-styled
travel-insurance demo storefront (BreezyTravel) wired to the same backend.

## Features

- **Endpoint runner** for the online-payment API: create payment link
  (incl. `allowed_gateways`, `merchant_reference`, `merchant_user_id`,
  gateway/wallet/lang switches), query, refunds (custom_id / transaction_id),
  pre-authorization list / get / capture / cancel / increment, and a raw
  custom-request tool.
- **Allowed-gateways picker** — tick boxes that build the top-level
  `allowed_gateways` JSON restricting which payment methods checkout renders.
- **Demo Store** — simple storefront that shares the console's payment-link
  settings and exercises the real checkout flow.
- **BreezyTravel (`/travel`)** — 3-step travel-insurance purchase flow
  (trip details → plan & add-ons → policyholder & payment), one-off payment
  via checkout or **monthly billing** via the Tokenization API
  (`precreate-token` card registration, show token, payment by token,
  delete token).
- **Webhook receiver** (`/api/yedpay/notify`) — verifies HMAC signatures for
  online-payment notifications and handles tokenization JSON notifications,
  syncing order/token status in MySQL.
- Call history + webhook log persisted in MySQL (Drizzle ORM).

## Stack

React 19 + TypeScript + Vite + Tailwind + shadcn/ui frontend; Hono + tRPC 11
(superjson) + Drizzle ORM (mysql2) backend.

## Develop

```bash
cp .env.example .env   # fill in DATABASE_URL + Yedpay keys
npm install
npm run dev            # http://localhost:3000
```

`npm run check` type-checks, `npm run build` builds frontend + backend.

> `package-lock.json` is intentionally not committed; `npm install` resolves
> from `package.json`. Only the shadcn/ui components actually imported by the
> app are vendored under `src/components/ui` — add more with
> `npx shadcn@latest add <component>`.
