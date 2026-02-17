# Contributing to DivvyTab Frontend

Thank you for contributing to the DivvyTab frontend. This guide covers theming, testing standards, tooling (Bun), and code quality (optimization and abstraction).

---

## Table of Contents

-   [Using Bun](#using-bun)
-   [Theming Guidelines](#theming-guidelines)
-   [Testing Standards](#testing-standards)
-   [Optimization & Abstraction](#optimization--abstraction)
-   [Code Style](#code-style)

---

## Using Bun

**Always use Bun.** Do not use npm, yarn, or pnpm.

| Task                 | Command                |
| -------------------- | ---------------------- |
| Install dependencies | `bun install`          |
| Run scripts          | `bun run <script>`     |
| Run tests            | `bun test`             |
| Add a package        | `bun add <package>`    |
| Add a dev dependency | `bun add -d <package>` |

-   **Lockfile:** Commit `bun.lock`. Use `bun install --frozen-lockfile` in CI.
-   **Scripts:** All `package.json` scripts assume Bun. Use `bun run <script>` to execute them.

---

## Theming Guidelines

All UI must respect the DivvyTab theme and support **light** and **dark** mode.

### Brand Colors

-   **Primary (blue):** `#0067D6` — HSL `211 100% 42%` (light) / `211 100% 55%` (dark)
-   **Secondary (teal):** `#00B2C2` — HSL `185 100% 38%` (light) / `185 100% 48%` (dark)

### CSS Variables (Tailwind)

Use semantic tokens. Do **not** hardcode hex or HSL.

| Token                                            | Usage                                    |
| ------------------------------------------------ | ---------------------------------------- |
| `bg-background`                                  | Page background                          |
| `text-foreground`                                | Primary text                             |
| `bg-card` / `text-card-foreground`               | Cards, modals                            |
| `bg-muted` / `text-muted-foreground`             | Subtle backgrounds, secondary text       |
| `bg-primary` / `text-primary-foreground`         | Primary actions, highlights              |
| `bg-secondary` / `text-secondary-foreground`     | Secondary actions                        |
| `border-border`                                  | Borders                                  |
| `bg-destructive` / `text-destructive-foreground` | Destructive actions                      |
| `chart-1` … `chart-5`                            | Charts (via `chart-1`, etc. in tailwind) |

### Examples

```tsx
// ✅ Correct — uses theme tokens
<div className="rounded-xl border border-border bg-card text-card-foreground">
  <h2 className="text-foreground">Title</h2>
  <p className="text-muted-foreground">Subtitle</p>
  <button className="bg-primary text-primary-foreground">Action</button>
</div>

// ❌ Wrong — hardcoded colors
<div className="bg-white text-gray-900 border-gray-200">
  <button className="bg-blue-600">Action</button>
</div>
```

### Brand Gradients

-   **Strong gradient:** `gradient-brand` — primary to secondary
-   **Subtle gradient:** `gradient-brand-subtle` — low-opacity accent

### New Components

1. Use semantic tokens (`background`, `foreground`, `card`, `muted`, `primary`, `secondary`, `border`).
2. Avoid `bg-white`, `text-black`, `bg-gray-*`, etc.
3. For charts, use `chart-1` (primary) and `chart-2` (secondary) or the `useChartColors` hook.
4. Ensure components look correct in both light and dark mode.

---

## Testing Standards

### Test Runner

Use **Bun's built-in test runner** (`bun test`). Do not use Jest or Vitest directly.

### Test Location

-   **Co-locate specs with components:** `Component.spec.tsx` next to `Component.tsx`
-   **Hooks:** `useChartColors.spec.ts` next to `useChartColors.ts`
-   **Setup:** Tests use Happy DOM + `@testing-library/react` + `@testing-library/jest-dom` (see `test/`)

### What to Test

-   **Components:** Render, user-visible text, links, buttons, empty/loading states
-   **Hooks:** Return values, loading states, error handling
-   **API / lib:** Success and error paths, correct URLs and payloads

### Mocking

Use `mock.module()` from `bun:test` for module mocks:

```ts
import { mock } from 'bun:test';

mock.module('@/hooks/useAuth', () => ({
	useAuth: () => ({ user: null }),
}));
```

Use `mock()` for function mocks:

```ts
const fn = mock(() => 'result');
expect(fn).toHaveBeenCalled();
```

### Naming

-   Describe blocks: component/function name
-   It blocks: behavior, e.g. `"renders title and value"`, `"throws on failure"`

---

## Optimization & Abstraction

### Abstraction

-   **Reusable UI** → Extract to `components/` (or `components/ui/` for primitives)
-   **Reusable logic** → Extract to `hooks/` or `lib/`
-   **Reusable data fetching** → Centralize in `lib/api.ts` or hooks
-   **Repeated patterns** → Create a shared component or utility

### Component Structure

-   Prefer small, focused components over large ones
-   Extract sub-sections into their own files (e.g. `LandingHeader`, `HowItWorks`)
-   Use composition over configuration where it improves readability

### Performance

-   **Lazy load** heavy components (e.g. charts) with `next/dynamic` and `ssr: false`
-   **Memoize** components that receive stable props: `memo(Component)`
-   **Memoize** callbacks and derived values: `useCallback`, `useMemo`
-   **Skeleton-first** pages: render layout with skeletons immediately, then swap in data

### HTTP / API

-   Deduplicate token refresh and other repeated requests
-   Use SWR or similar for client-side caching where appropriate
-   Avoid unnecessary re-fetches; batch when possible

### Bundle Size

-   Prefer tree-shakeable imports (e.g. `import { X } from "lib"` over `import *`)
-   Lazy load heavy dependencies (Recharts, etc.)
-   Keep dependencies minimal

---

## Code Style

-   **Formatting:** Run `bun run format` (Prettier) before committing
-   **Linting:** Fix lint errors; run `bun run lint`
-   **Comments:** Add JSDoc for public APIs; add inline comments for non-obvious logic
-   **Indentation:** Prefer flatter structures; extract logic to reduce nesting

---

## Pull Request Checklist

-   [ ] All tests pass (`bun test`)
-   [ ] New components follow theming guidelines
-   [ ] New features have tests
-   [ ] Bun is used for all commands (no npm)
-   [ ] Code is formatted and linted
-   [ ] Reusable logic is abstracted appropriately
