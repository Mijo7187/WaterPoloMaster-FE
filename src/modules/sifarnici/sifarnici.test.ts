import { beforeEach, describe, expect, it, vi } from "vitest";
import { PaginationEnum, paginationStore } from "@stores";

import { sifarniciService } from "./sifarnici.service";
import { sifarniciStore } from "./sifarnici.store";
import { SifarniciTypeEnum } from "./sifarnici.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

// vi.mock() is hoisted before imports execute, so enum values aren't available
// inside the factory – use raw string keys instead.
vi.mock("./sifarnici.constants", () => ({
  SIFARNICI_MAP_CONFIG: {
    CITY: { labelAccessor: ["name"], valueAccessor: "id" },
    COUNTRY: { labelAccessor: ["name"], valueAccessor: "id" },
    COMPANY: { labelAccessor: ["name"], valueAccessor: "id" },
  },
  SIFARNICI_API_URL_MAP: {
    CITY: "/city",
    COUNTRY: "/country",
    COMPANY: "/company",
  },
  SIFARNIK_INITIAL_VALUE: {
    items: [],
    pagination: { page: 1, size: 50, total: 0, pages: 0 },
  },
  SIFARNIK_MODAL_CONFIG_DATA: {},
  SIFARNIK_FILTERS_CONFIG_DATA: {},
  SIFARNIK_TABLE_CONFIG_DATA: {},
  SIFARNIK_SELECT_OPTIONS: [],
}));

vi.mock("./sifarnici.repo", () => ({
  sifarniciRepo: {
    fetchSifarniciOptions: vi.fn(),
    fetchSifarnikListTable: vi.fn(),
    fetchSifarnikById: vi.fn(),
    postSifarnik: vi.fn(),
    updateSifarnik: vi.fn(),
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockCity = { id: 1, name: "Beograd", country_id: 1 };
const mockCountry = { id: 1, name: "Srbija" };

const mockPaginatedCities = {
  items: [mockCity],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  sifarniciStore.resetAll();
  sifarniciStore.sifarniciListTable = [];
  sifarniciStore.sifarnik = null;
});

// ─── SifarniciService – makeLabel ─────────────────────────────────────────────

describe("SifarniciService – makeLabel", () => {
  it("returns a single-key label", () => {
    const result = sifarniciService.makeLabel(["name"], {
      name: "Beograd",
      code: "BG",
    });
    expect(result).toBe("Beograd");
  });

  it("joins multiple keys with a space", () => {
    const result = sifarniciService.makeLabel(["first_name", "last_name"], {
      first_name: "Marko",
      last_name: "Markovic",
    });
    expect(result).toBe("Marko Markovic");
  });

  it("skips missing keys (returns empty string for them)", () => {
    const result = sifarniciService.makeLabel(["name", "missing"], {
      name: "Beograd",
    });
    expect(result).toBe("Beograd ");
  });

  it("returns empty string for an empty keys array", () => {
    expect(sifarniciService.makeLabel([], { name: "Beograd" })).toBe("");
  });
});

// ─── SifarniciService – makeSifarnikOption ────────────────────────────────────

describe("SifarniciService – makeSifarnikOption", () => {
  it("builds a select option with label, value, and item", () => {
    const option = sifarniciService.makeSifarnikOption(
      SifarniciTypeEnum.CITY,
      mockCity,
    );
    expect(option.label).toBe("Beograd");
    expect(option.value).toBe(1);
    expect(option.item).toEqual(mockCity);
  });

  it("uses valueAccessor from config", () => {
    const option = sifarniciService.makeSifarnikOption(
      SifarniciTypeEnum.COUNTRY,
      mockCountry,
    );
    expect(option.value).toBe(1);
  });
});

// ─── SifarniciService – makeSifarnikOptionsSelect ─────────────────────────────

describe("SifarniciService – makeSifarnikOptionsSelect", () => {
  it("maps an array of items to select options", () => {
    const options = sifarniciService.makeSifarnikOptionsSelect(
      SifarniciTypeEnum.CITY,
      [mockCity, { id: 2, name: "Novi Sad", country_id: 1 }],
    );
    expect(options).toHaveLength(2);
    expect(options[0].label).toBe("Beograd");
    expect(options[1].label).toBe("Novi Sad");
  });

  it("returns empty array for empty input", () => {
    const options = sifarniciService.makeSifarnikOptionsSelect(
      SifarniciTypeEnum.CITY,
      [],
    );
    expect(options).toEqual([]);
  });
});

// ─── SifarniciStore – setSifarnikOptions ──────────────────────────────────────

describe("SifarniciStore – setSifarnikOptions", () => {
  it("stores items as select options", () => {
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    const items = sifarniciStore.getSifarnikItems(SifarniciTypeEnum.CITY);
    expect(items).toHaveLength(1);
    expect(items?.[0].label).toBe("Beograd");
    expect(items?.[0].value).toBe(1);
  });

  it("stores pagination info", () => {
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    const pagination = sifarniciStore.getSifarnikPagination(
      SifarniciTypeEnum.CITY,
    ) as {
      page: number;
      total: number;
    };
    expect(pagination.page).toBe(1);
    expect(pagination.total).toBe(1);
  });

  it("merges new items without duplicating existing ones", () => {
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    const items = sifarniciStore.getSifarnikItems(SifarniciTypeEnum.CITY);
    expect(items).toHaveLength(1);
  });

  it("appends genuinely new items to existing ones", () => {
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    const page2 = {
      items: [{ id: 2, name: "Novi Sad", country_id: 1 }],
      pagination: { page: 2, size: 50, total: 2, pages: 1 },
    };
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      page2,
      SifarniciTypeEnum.CITY,
    );
    const items = sifarniciStore.getSifarnikItems(SifarniciTypeEnum.CITY);
    expect(items).toHaveLength(2);
  });
});

// ─── SifarniciStore – setDefaultOptions ───────────────────────────────────────

describe("SifarniciStore – setDefaultOptions", () => {
  it("stores a single default option and returns the original object", () => {
    const result = sifarniciStore.setDefaultOptions(
      SifarniciTypeEnum.CITY,
      mockCity,
      SifarniciTypeEnum.CITY,
    );
    expect(result).toEqual(mockCity);
    const items = sifarniciStore.getSifarnikItems(SifarniciTypeEnum.CITY);
    expect(items).toHaveLength(1);
    expect(items?.[0].label).toBe("Beograd");
  });
});

// ─── SifarniciStore – resetSifarnikByKey ──────────────────────────────────────

describe("SifarniciStore – resetSifarnikByKey", () => {
  it("removes the specified key from the map", () => {
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    sifarniciStore.resetSifarnikByKey(SifarniciTypeEnum.CITY);
    expect(
      sifarniciStore.getSifarnikByKey(SifarniciTypeEnum.CITY),
    ).toBeUndefined();
  });

  it("does not affect other keys", () => {
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.COUNTRY,
      { items: [mockCountry], pagination: mockPaginatedCities.pagination },
      SifarniciTypeEnum.COUNTRY,
    );
    sifarniciStore.resetSifarnikByKey(SifarniciTypeEnum.CITY);
    expect(
      sifarniciStore.getSifarnikByKey(SifarniciTypeEnum.COUNTRY),
    ).toBeDefined();
  });
});

// ─── SifarniciStore – resetAll ────────────────────────────────────────────────

describe("SifarniciStore – resetAll", () => {
  it("clears all keys from the select values map", () => {
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.COUNTRY,
      { items: [mockCountry], pagination: mockPaginatedCities.pagination },
      SifarniciTypeEnum.COUNTRY,
    );
    sifarniciStore.resetAll();
    expect(
      sifarniciStore.getSifarnikByKey(SifarniciTypeEnum.CITY),
    ).toBeUndefined();
    expect(
      sifarniciStore.getSifarnikByKey(SifarniciTypeEnum.COUNTRY),
    ).toBeUndefined();
  });
});

// ─── SifarniciStore – getArrayToObjSifarnik ───────────────────────────────────

describe("SifarniciStore – getArrayToObjSifarnik", () => {
  it("returns null when key has no items", () => {
    expect(sifarniciStore.getArrayToObjSifarnik("missing")).toBeNull();
  });

  it("returns items keyed by value", () => {
    sifarniciStore.setSifarnikOptions(
      SifarniciTypeEnum.CITY,
      mockPaginatedCities,
      SifarniciTypeEnum.CITY,
    );
    const obj = sifarniciStore.getArrayToObjSifarnik(
      SifarniciTypeEnum.CITY,
    ) as Record<number, { value: number }>;
    expect(obj).not.toBeNull();
    expect(obj[1].value).toBe(1);
  });
});

// ─── SifarniciStore – fetchSifarnikListTable ──────────────────────────────────

describe("SifarniciStore – fetchSifarnikListTable", () => {
  it("populates sifarniciListTable on success", async () => {
    const { sifarniciRepo } = await import("./sifarnici.repo");
    vi.mocked(sifarniciRepo.fetchSifarnikListTable).mockResolvedValue(
      mockPaginatedCities as never,
    );

    await sifarniciStore.fetchSifarnikListTable(SifarniciTypeEnum.CITY);

    expect(sifarniciStore.sifarniciListTable).toEqual([mockCity]);
    expect(
      paginationStore.get(PaginationEnum.SIFARNICI_PAGINATION)?.total,
    ).toBe(1);
  });

  it("does not throw on service error (silent fail)", async () => {
    const { sifarniciRepo } = await import("./sifarnici.repo");
    vi.mocked(sifarniciRepo.fetchSifarnikListTable).mockRejectedValue(
      new Error("Server error"),
    );

    await expect(
      sifarniciStore.fetchSifarnikListTable(SifarniciTypeEnum.CITY),
    ).resolves.not.toThrow();
  });
});
