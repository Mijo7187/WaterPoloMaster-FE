import { runInAction } from "mobx";
import { beforeEach, describe, expect, it } from "vitest";

import { PAGINATION_INITIAL_STATE } from "./pagination.constants";
import { paginationStore } from "./pagination.store";
import { IGetPagination, PaginationEnum } from "./pagination.types";

const KEY = PaginationEnum.USER_PAGINATION;
const OTHER_KEY = PaginationEnum.COMPANY_PAGINATION;

const FULL_PAGINATION: IGetPagination = {
  page: 1,
  size: 50,
  total: 100,
  pages: 2,
};

beforeEach(() => {
  runInAction(() => {
    paginationStore.params = Object.values(PaginationEnum).reduce(
      (acc, key) => {
        acc[key] = { ...PAGINATION_INITIAL_STATE };
        return acc;
      },
      {} as Record<PaginationEnum, IGetPagination>,
    );
  });
});

describe("PaginationStore – get", () => {
  it("returns the initial state for an untouched key", () => {
    expect(paginationStore.get(KEY)).toEqual(PAGINATION_INITIAL_STATE);
  });

  it("returns stored pagination when key has been set", () => {
    paginationStore.set(KEY, { page: 2, size: 25 });
    const result = paginationStore.get(KEY);
    expect(result.page).toBe(2);
    expect(result.size).toBe(25);
  });
});

describe("PaginationStore – set", () => {
  it("creates an entry merged with default values", () => {
    paginationStore.set(KEY, { page: 3, size: 25 });
    const result = paginationStore.get(KEY);
    expect(result.page).toBe(3);
    expect(result.size).toBe(25);
    expect(result.total).toBe(PAGINATION_INITIAL_STATE.total);
    expect(result.pages).toBe(PAGINATION_INITIAL_STATE.pages);
  });

  it("merges over existing entry without losing untouched fields", () => {
    paginationStore.setFromResponse(KEY, FULL_PAGINATION);
    paginationStore.set(KEY, { page: 2, size: 50 });
    const result = paginationStore.get(KEY);
    expect(result.page).toBe(2);
    expect(result.total).toBe(100);
  });

  it("does not affect other keys", () => {
    paginationStore.set(KEY, { page: 5, size: 50 });
    expect(paginationStore.get(OTHER_KEY)).toEqual(PAGINATION_INITIAL_STATE);
  });
});

describe("PaginationStore – getRequestPaginationParams", () => {
  it("returns default page and size for an untouched key", () => {
    const params = paginationStore.getRequestPaginationParams(KEY);
    expect(params).toEqual({
      page: PAGINATION_INITIAL_STATE.page,
      size: PAGINATION_INITIAL_STATE.size,
    });
  });

  it("returns stored values when entry exists", () => {
    paginationStore.set(KEY, { page: 4, size: 50 });
    const params = paginationStore.getRequestPaginationParams(KEY);
    expect(params).toEqual({ page: 4, size: 50 });
  });
});

describe("PaginationStore – setFromResponse", () => {
  it("stores the full pagination response object", () => {
    paginationStore.setFromResponse(KEY, FULL_PAGINATION);
    expect(paginationStore.get(KEY)).toEqual(FULL_PAGINATION);
  });

  it("overwrites existing entry completely", () => {
    paginationStore.set(KEY, { page: 1, size: 50 });
    paginationStore.setFromResponse(KEY, { ...FULL_PAGINATION, page: 3 });
    expect(paginationStore.get(KEY).page).toBe(3);
  });
});

describe("PaginationStore – resetPage", () => {
  it("resets page to 1", () => {
    paginationStore.set(KEY, { page: 5, size: 50 });
    paginationStore.resetPage(KEY);
    expect(paginationStore.get(KEY).page).toBe(1);
  });

  it("preserves other fields when resetting page", () => {
    paginationStore.setFromResponse(KEY, { ...FULL_PAGINATION, page: 5 });
    paginationStore.resetPage(KEY);
    expect(paginationStore.get(KEY).size).toBe(50);
    expect(paginationStore.get(KEY).total).toBe(100);
  });
});

describe("PaginationStore – updateField", () => {
  it("updates a specific numeric field", () => {
    paginationStore.set(KEY, { page: 1, size: 50 });
    paginationStore.updateField(KEY, "page", 7);
    expect(paginationStore.get(KEY).page).toBe(7);
  });

  it("updates the total field", () => {
    paginationStore.setFromResponse(KEY, FULL_PAGINATION);
    paginationStore.updateField(KEY, "total", 200);
    expect(paginationStore.get(KEY).total).toBe(200);
  });
});

describe("PaginationStore – setTotal", () => {
  it("sets the total for the key", () => {
    paginationStore.setFromResponse(KEY, FULL_PAGINATION);
    paginationStore.setTotal(KEY, 42);
    expect(paginationStore.get(KEY).total).toBe(42);
  });
});

describe("PaginationStore – remove", () => {
  it("resets the key back to the initial state", () => {
    paginationStore.set(KEY, { page: 1, size: 50 });
    paginationStore.remove(KEY);
    expect(paginationStore.get(KEY)).toEqual(PAGINATION_INITIAL_STATE);
  });

  it("does not affect other keys when removing one", () => {
    paginationStore.set(KEY, { page: 1, size: 50 });
    paginationStore.set(OTHER_KEY, { page: 2, size: 10 });
    paginationStore.remove(KEY);
    expect(paginationStore.get(OTHER_KEY).page).toBe(2);
  });
});
