<p align="center">
  <img src="public/divvy-tab-banner.png" alt="DivvyTab logo" width="460" />
</p>

<h1 align="center">DivvyTab Frontend</h1>

<p align="center">
  <strong>Split the bill, not the hassle.</strong>
</p>

<p align="center">
  The frontend for DivvyTab — a modern bill-splitting platform that lets restaurants integrate with their existing POS. Customers scan a QR code, select only the items they ordered, add a tip, and pay—friends pay their share until the bill is fully settled.
</p>

<p align="center">
  <em>Built by <a href="https://componera.com">Componera</a></em>
</p>

---

## Table of Contents

-   [Overview](#overview)
-   [Tech Stack](#tech-stack)
-   [Prerequisites](#prerequisites)
-   [Installation & Setup](#installation--setup)
-   [Using Bun (Not npm)](#using-bun-not-npm)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [Testing](#testing)
-   [Project Structure](#project-structure)
-   [Deployment](#deployment)
-   [Contributing](#contributing)

---

## Overview

This is the **DivvyTab frontend** — a Next.js application that provides:

-   **Landing page** — Marketing site for DivvyTab
-   **Admin dashboard** — Bill management, staff, payments, and analytics
-   **Customer bill view** — QR-scannable bill page where customers select items and pay their share

The frontend connects to the DivvyTab backend API and WebSocket for real-time updates.

---

## Tech Stack

-   **Next.js 16** (App Router)
-   **React 19**
-   **Tailwind CSS** (with semantic theme tokens)
-   **Bun** — Package manager, scripts, and test runner

---

## Prerequisites

-   **[Bun](https://bun.sh)** (v1.0+) — **Required.** Use Bun for installs, scripts, and tests. Do **not** use npm.
-   **DivvyTab backend** — API must be running (see backend repo) for full functionality.
-   **Git**

---

## Installation & Setup

### 1. Clone and enter the frontend directory

```bash
git clone <repository-url>
cd split-bill-fe
```

### 2. Install dependencies

```bash
bun install
```

### 3. Environment variables

Create `.env.local` if your backend runs elsewhere:

| Variable                 | Required | Description                                        |
| ------------------------ | -------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`    | No       | Backend API URL (default: `http://localhost:4000`) |
| `NEXT_PUBLIC_SOCKET_URL` | No       | WebSocket URL (default: same as API)               |

---

## Using Bun (Not npm)

**This project uses Bun exclusively.** Do not use npm, yarn, or pnpm.

| Do this         | Don't do this            |
| --------------- | ------------------------ |
| `bun install`   | `npm install`            |
| `bun run dev`   | `npm run dev`            |
| `bun run build` | `npm run build`          |
| `bun test`      | `npm test` or `npx jest` |
| `bun run start` | `node .next/...`         |

**Why Bun:**

-   Faster installs and builds
-   Native TypeScript support
-   Built-in test runner (no Jest config)
-   Single runtime for scripts and tooling

**Lockfile:** Commit `bun.lock` and use `bun install --frozen-lockfile` in CI.

---

## Environment Variables

| Variable                 | Required | Description                                        |
| ------------------------ | -------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`    | No       | Backend API URL (default: `http://localhost:4000`) |
| `NEXT_PUBLIC_SOCKET_URL` | No       | WebSocket URL (default: same as API)               |

---

## Running the Application

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
bun run build
bun run start
```

---

## Testing

```bash
bun test
```

**Watch mode:**

```bash
bun run test:watch
```

---

## Project Structure

```
split-bill-fe/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin dashboard, bills, staff, payments
│   ├── bill/[billId]/      # Customer bill view (QR scan)
│   ├── login/              # Auth
│   └── globals.css         # Theme variables
├── components/             # React components
├── hooks/                  # useAuth, useBills, useChartColors, etc.
├── lib/                    # API client, auth, socket
├── test/                   # Test setup (Happy DOM, jest-dom)
└── public/                 # Static assets (logo, etc.)
```

---

## Deployment

Deployed on [Vercel](https://vercel.com). See `vercel.json` for configuration.

Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL` in your Vercel project environment.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for theming guidelines, testing standards, and code quality practices.

---

<p align="center">
  © DivvyTab by Componera. All rights reserved.
</p>
