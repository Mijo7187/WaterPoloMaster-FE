import { runInAction } from "mobx";
import { beforeEach, describe, expect, it } from "vitest";

import { PAGINATION_INITIAL_STATE } from "./pagination.constants";
import { paginationStore } from "./pagination.store";
import { PaginationEnum } from "./pagination.types";

const KEY = PaginationEnum.USER_PAGINATION;
const OTHER_KEY = PaginationEnum.COMPANY_PAGINATION;

const FULL_PAGINATION = {
  page: 1,
  size: 50,
  total: 100,
  pages: 2,
};

beforeEach(() => {
  runInAction(() => {
    paginationStore.params = {};
  });
});

describe("PaginationStore – get", () => {
  it("returns null when key does not exist", () => {
    expect(paginationStore.get(KEY)).toBeNull();
  });

  it("returns stored pagination when key exists", () => {
    paginationStore.set(KEY, { page: 2, size: 25 });
    const result = paginationStore.get(KEY);
    expect(result?.page).toBe(2);
    expect(result?.size).toBe(25);
  });
});

describe("PaginationStore – set", () => {
  it("creates an entry merged with default values", () => {
    paginationStore.set(KEY, { page: 3, size: 25 });
    const result = paginationStore.get(KEY);
    expect(result?.page).toBe(3);
    expect(result?.size).toBe(25);
    expect(result?.total).toBe(PAGINATION_INITIAL_STATE.total);
    expect(result?.pages).toBe(PAGINATION_INITIAL_STATE.pages);
  });

  it("merges over existing entry without losing untouched fields", () => {
    paginationStore.setFromResponse(KEY, FULL_PAGINATION);
    paginationStore.set(KEY, { page: 2, size: 50 });
    const result = paginationStore.get(KEY);
    expect(result?.page).toBe(2);
    expect(result?.total).toBe(100);
  });

  it("does not affect other keys", () => {
    paginationStore.set(KEY, { page: 5, size: 50 });
    expect(paginationStore.get(OTHER_KEY)).toBeNull();
  });
});

describe("PaginationStore – getRequestPaginationParams", () => {
  it("returns default page and size when no entry exists", () => {
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
    expect(paginationStore.get(KEY)?.page).toBe(3);
  });
});

describe("PaginationStore – resetPage", () => {
  it("resets page to 1", () => {
    paginationStore.set(KEY, { page: 5, size: 50 });
    paginationStore.resetPage(KEY);
    expect(paginationStore.get(KEY)?.page).toBe(1);
  });

  it("preserves other fields when resetting page", () => {
    paginationStore.setFromResponse(KEY, { ...FULL_PAGINATION, page: 5 });
    paginationStore.resetPage(KEY);
    expect(paginationStore.get(KEY)?.size).toBe(50);
    expect(paginationStore.get(KEY)?.total).toBe(100);
  });

  it("does nothing when key does not exist", () => {
    expect(() => {
      paginationStore.resetPage(KEY);
    }).not.toThrow();
  });
});

describe("PaginationStore – updateField", () => {
  it("updates a specific numeric field", () => {
    paginationStore.set(KEY, { page: 1, size: 50 });
    paginationStore.updateField(KEY, "page", 7);
    expect(paginationStore.get(KEY)?.page).toBe(7);
  });

  it("updates totalRecords field", () => {
    paginationStore.setFromResponse(KEY, FULL_PAGINATION);
    paginationStore.updateField(KEY, "total", 200);
    expect(paginationStore.get(KEY)?.total).toBe(200);
  });
});

describe("PaginationStore – increaseTotalRecords", () => {
  it("increments totalRecords by 1", () => {
    paginationStore.setFromResponse(KEY, {
      ...FULL_PAGINATION,
      total: 10,
    });
    paginationStore.increaseTotalRecords(KEY);
    expect(paginationStore.get(KEY)?.total).toBe(11);
  });

  it("works when totalRecords starts at 0", () => {
    paginationStore.setFromResponse(KEY, {
      ...FULL_PAGINATION,
      total: 0,
    });
    paginationStore.increaseTotalRecords(KEY);
    expect(paginationStore.get(KEY)?.total).toBe(1);
  });
});

describe("PaginationStore – decreaseTotalRecords", () => {
  it("decrements totalRecords by 1", () => {
    paginationStore.setFromResponse(KEY, {
      ...FULL_PAGINATION,
      total: 5,
    });
    paginationStore.decreaseTotalRecords(KEY);
    expect(paginationStore.get(KEY)?.total).toBe(4);
  });

  it("does not go below 0", () => {
    paginationStore.setFromResponse(KEY, {
      ...FULL_PAGINATION,
      total: 0,
    });
    paginationStore.decreaseTotalRecords(KEY);
    expect(paginationStore.get(KEY)?.total).toBe(0);
  });
});

describe("PaginationStore – remove", () => {
  it("removes the key from params", () => {
    paginationStore.set(KEY, { page: 1, size: 50 });
    paginationStore.remove(KEY);
    expect(paginationStore.get(KEY)).toBeNull();
  });

  it("does not affect other keys when removing one", () => {
    paginationStore.set(KEY, { page: 1, size: 50 });
    paginationStore.set(OTHER_KEY, { page: 2, size: 10 });
    paginationStore.remove(KEY);
    expect(paginationStore.get(OTHER_KEY)?.page).toBe(2);
  });
});
