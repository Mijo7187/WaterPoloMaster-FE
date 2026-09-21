import dayjs from "dayjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContractStatusEnum } from "@modules/contract/contract.types";

import { arrayToObject } from "./arrayToObject";
import {
  computeContractStatus,
  splitMembershipIntoInstallments,
  sumInstallments,
} from "./contractHelpers";
import { EMAIL_FIELD_RULE, REQUIRED_FIELD_RULE } from "./formRules";
import { handleSearchOptions } from "./handleSearchOptions";
import { pickFields } from "./pickFields";
import { setDynamicHeight } from "./setDynamicheight";

// ─── formRules ────────────────────────────────────────────────────────────────

describe("REQUIRED_FIELD_RULE", () => {
  it("returns required: true with Serbian message", () => {
    const rule = REQUIRED_FIELD_RULE(true);
    expect(rule.required).toBe(true);
    expect(rule.message).toBe("Obavezno polje");
  });

  it("returns required: false when passed false", () => {
    expect(REQUIRED_FIELD_RULE(false).required).toBe(false);
  });
});

describe("EMAIL_FIELD_RULE", () => {
  const { pattern } = EMAIL_FIELD_RULE;

  it("matches valid email addresses", () => {
    expect(pattern.test("user@example.com")).toBe(true);
    expect(pattern.test("user.name+tag@sub.domain.org")).toBe(true);
    expect(pattern.test("a@b.co")).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(pattern.test("notanemail")).toBe(false);
    expect(pattern.test("missing@tld")).toBe(false);
    expect(pattern.test("@nodomain.com")).toBe(false);
    expect(pattern.test("no spaces@test.com")).toBe(false);
  });

  it("has the correct Serbian error message", () => {
    expect(EMAIL_FIELD_RULE.message).toBe("Neispravna email adresa");
  });
});

// ─── pickFields ───────────────────────────────────────────────────────────────

describe("pickFields", () => {
  it("removes null values", () => {
    expect(pickFields({ a: null })).toEqual({});
  });

  it("removes undefined values", () => {
    expect(pickFields({ a: undefined })).toEqual({});
  });

  it("removes empty string values", () => {
    expect(pickFields({ a: "" })).toEqual({});
  });

  it('removes "Invalid Date" string values', () => {
    expect(pickFields({ a: "Invalid Date" })).toEqual({});
  });

  it("trims whitespace from string values", () => {
    expect(pickFields({ a: "  hello  " })).toEqual({ a: "hello" });
  });

  it("keeps valid string values", () => {
    expect(pickFields({ a: "hello" })).toEqual({ a: "hello" });
  });

  it("keeps valid number values", () => {
    expect(pickFields({ a: 42 })).toEqual({ a: 42 });
  });

  it("keeps boolean false values", () => {
    expect(pickFields({ a: false })).toEqual({ a: false });
  });

  it("keeps boolean true values", () => {
    expect(pickFields({ a: true })).toEqual({ a: true });
  });

  it("formats dayjs dates as YYYY-MM-DD", () => {
    const date = dayjs("2024-03-15");
    expect(pickFields({ a: date })).toEqual({ a: "2024-03-15" });
  });

  it("keeps multiple valid fields and removes invalid ones", () => {
    const result = pickFields({
      name: "John",
      age: 30,
      email: "",
      address: null,
    });
    expect(result).toEqual({ name: "John", age: 30 });
  });

  it("returns empty object for fully empty input", () => {
    expect(pickFields({ a: null, b: undefined, c: "" })).toEqual({});
  });
});

// ─── arrayToObject ────────────────────────────────────────────────────────────

describe("arrayToObject", () => {
  it("converts array to object keyed by id by default", () => {
    const items = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const result = arrayToObject(items);
    expect(result[1]).toEqual({ id: 1, name: "Alice" });
    expect(result[2]).toEqual({ id: 2, name: "Bob" });
  });

  it("converts array to object keyed by custom accessor", () => {
    const items = [
      { code: "A", label: "Apple" },
      { code: "B", label: "Banana" },
    ];
    const result = arrayToObject(items, "code");
    expect(result.A).toEqual({ code: "A", label: "Apple" });
    expect(result.B).toEqual({ code: "B", label: "Banana" });
  });

  it("returns empty object for empty array", () => {
    expect(arrayToObject([])).toEqual({});
  });

  it("last item wins on duplicate key", () => {
    const items = [
      { id: 1, name: "First" },
      { id: 1, name: "Second" },
    ];
    const result = arrayToObject(items);
    expect(result[1].name).toBe("Second");
  });
});

// ─── handleSearchOptions ──────────────────────────────────────────────────────

describe("handleSearchOptions", () => {
  it("returns true when label contains input (same case)", () => {
    expect(handleSearchOptions("Alice", { label: "Alice", value: 1 })).toBe(
      true,
    );
  });

  it("returns true with case-insensitive match", () => {
    expect(handleSearchOptions("alice", { label: "Alice", value: 1 })).toBe(
      true,
    );
    expect(handleSearchOptions("ALICE", { label: "alice", value: 1 })).toBe(
      true,
    );
  });

  it("returns true for partial match", () => {
    expect(handleSearchOptions("ali", { label: "Alice", value: 1 })).toBe(
      true,
    );
  });

  it("returns false when label does not contain input", () => {
    expect(handleSearchOptions("xyz", { label: "Alice", value: 1 })).toBe(
      false,
    );
  });

  it("returns false for undefined option", () => {
    expect(handleSearchOptions("test", undefined)).toBe(false);
  });

  it("returns true for empty input string (matches everything)", () => {
    expect(handleSearchOptions("", { label: "Alice", value: 1 })).toBe(true);
  });
});

// ─── setDynamicHeight ─────────────────────────────────────────────────────────

describe("setDynamicHeight", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
      configurable: true,
    });
  });

  it("does nothing if the wrapper element is not found", () => {
    expect(() => { setDynamicHeight("nonexistent", []); }).not.toThrow();
  });

  it("sets maxHeight to viewport height when no elements subtracted", () => {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.appendChild(wrapper);

    setDynamicHeight("wrapper", []);

    expect(wrapper.style.maxHeight).toBe("800px");
    expect(wrapper.style.overflowY).toBe("auto");
  });

  it("subtracts specified element heights from viewport height", () => {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.appendChild(wrapper);

    const header = document.createElement("div");
    header.id = "header";
    Object.defineProperty(header, "offsetHeight", {
      value: 60,
      configurable: true,
    });
    document.body.appendChild(header);

    setDynamicHeight("wrapper", ["header"]);

    expect(wrapper.style.maxHeight).toBe("740px");
  });

  it("subtracts extraMinus from final height", () => {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.appendChild(wrapper);

    setDynamicHeight("wrapper", [], 50);

    expect(wrapper.style.maxHeight).toBe("750px");
  });

  it("ignores missing subtracted elements gracefully", () => {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.appendChild(wrapper);

    setDynamicHeight("wrapper", ["nonexistent-element"]);

    expect(wrapper.style.maxHeight).toBe("800px");
  });

  it("never goes below 0px for maxHeight", () => {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.appendChild(wrapper);

    setDynamicHeight("wrapper", [], 9999);

    expect(wrapper.style.maxHeight).toBe("0px");
  });
});

// ─── contractHelpers ─────────────────────────────────────────────────────────

describe("computeContractStatus", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 21, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("is DRAFT when the start is in the future", () => {
    expect(computeContractStatus("2026-10-01", "2027-06-30")).toBe(
      ContractStatusEnum.DRAFT,
    );
  });

  it("is DRAFT when there is no start date", () => {
    expect(computeContractStatus(null, null)).toBe(ContractStatusEnum.DRAFT);
    expect(computeContractStatus("", null)).toBe(ContractStatusEnum.DRAFT);
  });

  it("is ACTIVE when started and open-ended", () => {
    expect(computeContractStatus("2026-01-01", null)).toBe(
      ContractStatusEnum.ACTIVE,
    );
  });

  it("is ACTIVE when started and the end is in the future", () => {
    expect(computeContractStatus("2026-01-01", "2026-12-31")).toBe(
      ContractStatusEnum.ACTIVE,
    );
  });

  it("is ENDED when both start and end are in the past", () => {
    expect(computeContractStatus("2025-09-01", "2026-06-30")).toBe(
      ContractStatusEnum.ENDED,
    );
  });

  it("treats today as started and still running", () => {
    expect(computeContractStatus("2026-09-21", "2026-09-21")).toBe(
      ContractStatusEnum.ACTIVE,
    );
  });

  it("accepts dayjs values", () => {
    expect(computeContractStatus(dayjs("2025-09-01"), dayjs("2026-06-30"))).toBe(
      ContractStatusEnum.ENDED,
    );
  });

  it("keeps a CANCELLED contract cancelled", () => {
    expect(
      computeContractStatus(
        "2026-01-01",
        null,
        ContractStatusEnum.CANCELLED,
      ),
    ).toBe(ContractStatusEnum.CANCELLED);
  });
});

describe("sumInstallments", () => {
  it("sums the amounts", () => {
    expect(sumInstallments([{ amount: 100 }, { amount: 250 }])).toBe(350);
  });

  it("treats null amounts as 0", () => {
    expect(sumInstallments([{ amount: null }, { amount: 50 }])).toBe(50);
  });

  it("rounds to 2 decimals", () => {
    expect(sumInstallments([{ amount: 0.1 }, { amount: 0.2 }])).toBe(0.3);
  });

  it("returns 0 for empty or missing rows", () => {
    expect(sumInstallments([])).toBe(0);
    expect(sumInstallments(null)).toBe(0);
  });
});

describe("splitMembershipIntoInstallments", () => {
  it("splits evenly by months and amount", () => {
    const rows = splitMembershipIntoInstallments({
      startMonth: "2025-09-15",
      monthsCount: 10,
      installmentsCount: 2,
      total: 5000,
    });

    expect(rows).toEqual([
      {
        period_start: "2025-09-01",
        period_end: "2026-01-31",
        due_date: "2025-09-01",
        amount: 2500,
      },
      {
        period_start: "2026-02-01",
        period_end: "2026-06-30",
        due_date: "2026-02-01",
        amount: 2500,
      },
    ]);
  });

  it("puts the leftover months and cents on the last row", () => {
    const rows = splitMembershipIntoInstallments({
      startMonth: "2025-09-01",
      monthsCount: 10,
      installmentsCount: 3,
      total: 1000,
    });

    expect(rows.map((r) => r.amount)).toEqual([333.33, 333.33, 333.34]);
    expect(rows[2]).toMatchObject({
      period_start: "2026-03-01",
      period_end: "2026-06-30",
    });
    expect(sumInstallments(rows)).toBe(1000);
  });

  it("returns a single row covering the whole term", () => {
    const rows = splitMembershipIntoInstallments({
      startMonth: "2025-09-01",
      monthsCount: 10,
      installmentsCount: 1,
      total: 5000,
    });

    expect(rows).toEqual([
      {
        period_start: "2025-09-01",
        period_end: "2026-06-30",
        due_date: "2025-09-01",
        amount: 5000,
      },
    ]);
  });
});
