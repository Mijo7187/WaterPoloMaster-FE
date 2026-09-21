import dayjs from "dayjs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { filtersService } from "./filters.service";
import { filtersStore } from "./filters.store";
import { FilterGroupsEnum } from "./filters.types";

beforeEach(() => {
  filtersStore.resetStore();
});

describe("FiltersStore – updateFilter", () => {
  it("sets a string filter value", () => {
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "name", "John");
    expect(filtersStore.getFilterValue(FilterGroupsEnum.USERS, "name")).toBe(
      "John",
    );
  });

  it("sets a numeric filter value", () => {
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "age", 30);
    expect(filtersStore.getFilterValue(FilterGroupsEnum.USERS, "age")).toBe(30);
  });

  it("updates an existing filter value", () => {
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "name", "John");
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "name", "Jane");
    expect(filtersStore.getFilterValue(FilterGroupsEnum.USERS, "name")).toBe(
      "Jane",
    );
  });

  it("stores undefined when passed undefined", () => {
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "name", undefined);
    expect(
      filtersStore.getFilterValue(FilterGroupsEnum.USERS, "name"),
    ).toBeUndefined();
  });

  it("logs error for unknown filter group", () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    // @ts-expect-error - testing invalid group
    filtersStore.updateFilter("INVALID_GROUP", "key", "value");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe("FiltersStore – clearFilters", () => {
  it("clears all filters within a group", () => {
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "name", "John");
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "email", "john@test.com");
    filtersStore.clearFilters(FilterGroupsEnum.USERS);
    expect(
      filtersStore.getFilterValue(FilterGroupsEnum.USERS, "name"),
    ).toBeUndefined();
    expect(
      filtersStore.getFilterValue(FilterGroupsEnum.USERS, "email"),
    ).toBeUndefined();
  });

  it("only clears the specified group", () => {
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "name", "John");
    filtersStore.updateFilter(FilterGroupsEnum.COMPANY, "name", "Corp");
    filtersStore.clearFilters(FilterGroupsEnum.USERS);
    expect(filtersStore.getFilterValue(FilterGroupsEnum.COMPANY, "name")).toBe(
      "Corp",
    );
  });
});

describe("FiltersStore – getFilterValue", () => {
  it("returns undefined for a key that was never set", () => {
    expect(
      filtersStore.getFilterValue(FilterGroupsEnum.USERS, "nonexistent"),
    ).toBeUndefined();
  });

  it("returns the correct value after it is set", () => {
    filtersStore.updateFilter(FilterGroupsEnum.SIFARNICI, "city", "Belgrade");
    expect(
      filtersStore.getFilterValue(FilterGroupsEnum.SIFARNICI, "city"),
    ).toBe("Belgrade");
  });
});

describe("FiltersStore – getFilterGroupValues", () => {
  it("returns an object with all values in the group", () => {
    filtersStore.updateFilter(FilterGroupsEnum.COMPANY, "name", "Test Corp");
    filtersStore.updateFilter(FilterGroupsEnum.COMPANY, "city", "Novi Sad");
    const values = filtersStore.getFilterGroupValues(FilterGroupsEnum.COMPANY);
    expect(values).toEqual({ name: "Test Corp", city: "Novi Sad" });
  });

  it("returns empty object when group has no filters set", () => {
    const values = filtersStore.getFilterGroupValues(FilterGroupsEnum.COMPANY);
    expect(values).toEqual({});
  });
});

describe("FiltersStore – setFilterGroup", () => {
  it("sets multiple filters at once", () => {
    filtersStore.setFilterGroup(FilterGroupsEnum.USERS, {
      name: "John",
      age: 30,
      active: true,
    });
    expect(filtersStore.getFilterValue(FilterGroupsEnum.USERS, "name")).toBe(
      "John",
    );
    expect(filtersStore.getFilterValue(FilterGroupsEnum.USERS, "age")).toBe(30);
  });

  it("merges with existing group filters", () => {
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "email", "a@b.com");
    filtersStore.setFilterGroup(FilterGroupsEnum.USERS, { name: "Alice" });
    expect(filtersStore.getFilterValue(FilterGroupsEnum.USERS, "email")).toBe(
      "a@b.com",
    );
    expect(filtersStore.getFilterValue(FilterGroupsEnum.USERS, "name")).toBe(
      "Alice",
    );
  });

  it("logs error for unknown filter group", () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    // @ts-expect-error - testing invalid group
    filtersStore.setFilterGroup("BAD_GROUP", { key: "value" });
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe("FiltersStore – getFilterGroupMap", () => {
  it("returns a map-like object for a valid group", () => {
    const map = filtersStore.getFilterGroupMap(FilterGroupsEnum.USERS);
    // toBeInstanceOf(Map) fails in jsdom due to cross-realm Map constructors;
    // check the Map interface instead.
    expect(map).toBeDefined();
    expect(typeof map?.get).toBe("function");
    expect(typeof map?.set).toBe("function");
  });
});

describe("FiltersStore – resetStore", () => {
  it("resets all filter groups to empty maps", () => {
    filtersStore.updateFilter(FilterGroupsEnum.USERS, "name", "John");
    filtersStore.updateFilter(FilterGroupsEnum.COMPANY, "type", "CLUB");
    filtersStore.resetStore();
    expect(
      filtersStore.getFilterValue(FilterGroupsEnum.USERS, "name"),
    ).toBeUndefined();
    expect(
      filtersStore.getFilterValue(FilterGroupsEnum.COMPANY, "type"),
    ).toBeUndefined();
  });

  it("keeps all expected filter groups after reset", () => {
    filtersStore.resetStore();
    Object.values(FilterGroupsEnum).forEach((group) => {
      const map = filtersStore.getFilterGroupMap(group);
      expect(map).toBeDefined();
      expect(typeof map?.get).toBe("function");
    });
  });
});

describe("FiltersService – toStoreFilterEntries", () => {
  const RANGE_KEYS: [string, string] = ["start_date", "end_date"];

  it("passes a string value through", () => {
    expect(filtersService.toStoreFilterEntries("name", "John")).toEqual([
      ["name", "John"],
    ]);
  });

  it("passes number and boolean values through", () => {
    expect(filtersService.toStoreFilterEntries("age", 30)).toEqual([
      ["age", 30],
    ]);
    expect(filtersService.toStoreFilterEntries("is_active", false)).toEqual([
      ["is_active", false],
    ]);
  });

  it("passes an array (multi select) through", () => {
    expect(filtersService.toStoreFilterEntries("ids", [1, 2])).toEqual([
      ["ids", [1, 2]],
    ]);
  });

  it("maps empty string and null to undefined", () => {
    expect(filtersService.toStoreFilterEntries("name", "")).toEqual([
      ["name", undefined],
    ]);
    expect(filtersService.toStoreFilterEntries("name", null)).toEqual([
      ["name", undefined],
    ]);
  });

  it("formats a dayjs value as YYYY-MM-DD", () => {
    expect(
      filtersService.toStoreFilterEntries("date", dayjs("2026-03-15T10:20")),
    ).toEqual([["date", "2026-03-15"]]);
  });

  it("splits a date range into two entries using rangeKeys", () => {
    const range = [dayjs("2026-01-01"), dayjs("2026-01-31")];
    expect(
      filtersService.toStoreFilterEntries("period", range, RANGE_KEYS),
    ).toEqual([
      ["start_date", "2026-01-01"],
      ["end_date", "2026-01-31"],
    ]);
  });

  it("sets both range keys to undefined when the range is cleared", () => {
    expect(
      filtersService.toStoreFilterEntries("period", null, RANGE_KEYS),
    ).toEqual([
      ["start_date", undefined],
      ["end_date", undefined],
    ]);
  });

  it("keeps an open-ended range (one side empty)", () => {
    const range = [dayjs("2026-01-01"), null];
    expect(
      filtersService.toStoreFilterEntries("period", range, RANGE_KEYS),
    ).toEqual([
      ["start_date", "2026-01-01"],
      ["end_date", undefined],
    ]);
  });
});

describe("FiltersStore – updateFilter with service entries", () => {
  it("writes split range entries into the group", () => {
    filtersService
      .toStoreFilterEntries(
        "period",
        [dayjs("2026-02-01"), dayjs("2026-02-10")],
        ["start_date", "end_date"],
      )
      .forEach(([key, value]) => {
        filtersStore.updateFilter(FilterGroupsEnum.PAYMENT, key, value);
      });

    expect(filtersStore.getFilterGroupValues(FilterGroupsEnum.PAYMENT)).toEqual(
      { start_date: "2026-02-01", end_date: "2026-02-10" },
    );
  });
});
