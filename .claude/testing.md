# Testing

## Test Runner & Setup

- **Vitest** with globals enabled — no import needed for `describe`/`it`/`expect`, but always import explicitly from `"vitest"` for clarity
- Environment: `jsdom` (browser-like DOM available in all tests)
- Setup file: `src/test/setup.ts` — provides `@testing-library/jest-dom` matchers and a localStorage mock
- Commands: `npm test` (watch), `npm run test:run` (CI single run), `npm run test:coverage`

---

## When to Write Tests (Auto-trigger Rules)

Write a test file **without being asked** when any of these occur:

| Trigger | Test file |
|---|---|
| New utility function added to `src/utils/` | `src/utils/utils.test.ts` (add to existing file) |
| New store created in `src/stores/` | `src/stores/{name}/{name}.test.ts` |
| New module scaffolded in `src/modules/` | `src/modules/{name}/{name}.test.ts` |
| New action or computed getter added to an existing store | Add cases to the existing test file |
| Bug fixed | Add a regression test for the broken input |

**Do NOT write tests for:**
- Pure presentational components with no logic
- Page-level components (`src/pages/`)
- `{name}.repo.ts` — Axios pass-through, no logic to test
- `{name}.service.ts` — thin delegation, no logic to test
- `router.constants.tsx`, `router.service.ts`

---

## File Placement & Naming

```
src/modules/company/company.test.ts      ← module store
src/stores/pagination/pagination.test.ts ← global store
src/utils/utils.test.ts                  ← all utility functions in one file
src/components/SomeComponent/SomeComponent.test.tsx  ← component (rare)
```

- One test file per module/store
- All `src/utils/` functions share one `utils.test.ts`
- Suffix: `.test.ts` for logic, `.test.tsx` only when JSX is rendered

---

## Section Order

Always structure test files in this exact order with these comment headers:

```ts
// ─── Mocks ───────────────────────────────────────────────────────────────────

// ─── Fixtures ────────────────────────────────────────────────────────────────

// ─── Setup ───────────────────────────────────────────────────────────────────

// ─── Tests ───────────────────────────────────────────────────────────────────
```

---

## Pattern: Utility Functions

No mocking. Direct input → output. Always cover edge cases.

```ts
import { beforeEach, describe, expect, it } from "vitest";

import { myUtil } from "./myUtil";

describe("myUtil", () => {
  it("handles the happy path", () => {
    expect(myUtil("valid input")).toBe("expected output");
  });

  it("returns null for null input", () => {
    expect(myUtil(null)).toBeNull();
  });

  it("returns empty object for empty input", () => {
    expect(myUtil({})).toEqual({});
  });
});
```

---

## Pattern: Global Store (`src/stores/`)

No service mocks needed. Test state mutations and computed getters directly.

```ts
import { runInAction } from "mobx";
import { beforeEach, describe, expect, it } from "vitest";

import { PAGINATION_INITIAL_STATE } from "./pagination.constants";
import { paginationStore } from "./pagination.store";
import { PaginationEnum } from "./pagination.types";

const KEY = PaginationEnum.USER_PAGINATION;

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  runInAction(() => {
    paginationStore.params = {};
  });
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("PaginationStore – get", () => {
  it("returns null when key does not exist", () => {
    expect(paginationStore.get(KEY)).toBeNull();
  });
});
```

---

## Pattern: Module Store (`src/modules/`)

Mock the service at the top level with `vi.mock()`. Inside each async test, dynamic-import the mocked service and set return values with `vi.mocked()`. Test both success and rejection for every async action.

```ts
import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { COMPANY_INITIAL_STATE } from "./company.constants";
import { companyStore } from "./company.store";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./company.service", () => ({
  companyService: {
    getCompanies: vi.fn(),
    getCompanyById: vi.fn(),
    createCompany: vi.fn(),
    updateCompany: vi.fn(),
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockCompany = {
  id: 1,
  name: "Plivački Klub Beograd",
  // ... all required fields
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    companyStore.companiesList = [];
    companyStore.company = COMPANY_INITIAL_STATE;
    companyStore.isLoading = false;
  });
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("CompanyStore – getCompanies", () => {
  it("sets companiesList on success", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.getCompanies).mockResolvedValue(
      { items: [mockCompany], pagination: { page: 1, size: 50, total: 1, pages: 1 } } as never,
    );

    await companyStore.getCompanies();

    expect(companyStore.companiesList).toEqual([mockCompany]);
  });

  it("rejects on service error", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.getCompanies).mockRejectedValue(new Error("Server error"));

    await expect(companyStore.getCompanies()).rejects.toThrow();
  });
});
```

---

## Pattern: Component (rare — only when logic exists)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MyComponent } from "./MyComponent";

vi.mock("@modules/user/user.store", () => ({
  userStore: { users: [], isLoading: false },
}));

describe("MyComponent", () => {
  it("renders the title", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Title")).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", async () => {
    const handler = vi.fn();
    render(<MyComponent onClick={handler} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledOnce();
  });
});
```

---

## Required `describe` Blocks for Store Tests

Every store test file must include these groups:

| Group | What to test |
|---|---|
| `{Store} – initial state` | Each observable starts at its default value |
| `{Store} – getters` | Computed getter reflects state set via `runInAction` |
| `{Store} – handleChange` | Can update each key |
| `{Store} – {actionName}` | One `describe` per async action — success + rejection |

---

## Rules

- Always import from `"vitest"` explicitly: `{ beforeEach, describe, expect, it, vi }`
- Always call `vi.clearAllMocks()` in `beforeEach` when any mocks exist
- Reset store observables in `beforeEach` using `runInAction()`
- Use `as never` for mock return type casts — never `as any`
- Always dynamic-import the mocked service inside the test: `const { myService } = await import("./my.service")`
- Every async action gets at minimum: one success test + one rejection test
- Fixtures are plain objects defined after mocks — no helper functions
- Do NOT use `try/catch` in tests — let Vitest catch thrown errors
