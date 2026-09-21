import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { SEASON_INITIAL_STATE } from "./season.constants";
import { seasonStore } from "./season.store";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./season.service", () => ({
  seasonService: {
    getSeasonsList: vi.fn(),
    getSeasonById: vi.fn(),
    createSeason: vi.fn(),
    updateSeason: vi.fn(),
  },
}));

vi.mock("@modules/auth/auth.store", () => ({
  authStore: { getAuthUser: { company_id: 1 } },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockSeason = {
  id: 1,
  company_id: 1,
  name: "2025/2026",
  start_date: "2025-09-01",
  end_date: "2026-06-30",
  is_current: true,
};

const mockPaginatedResponse = {
  items: [mockSeason],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    seasonStore.seasonsList = [];
    seasonStore.season = SEASON_INITIAL_STATE;
    seasonStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("SeasonStore – initial state", () => {
  it("starts with empty seasonsList", () => {
    expect(seasonStore.seasonsList).toEqual([]);
  });

  it("starts with SEASON_INITIAL_STATE for season", () => {
    expect(seasonStore.season).toEqual(SEASON_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(seasonStore.isLoading).toBe(false);
  });
});

describe("SeasonStore – getters", () => {
  it("getterSeason reflects current season", () => {
    runInAction(() => {
      seasonStore.season = mockSeason;
    });
    expect(seasonStore.getterSeason).toEqual(mockSeason);
  });

  it("getterSeasonsList reflects current list", () => {
    runInAction(() => {
      seasonStore.seasonsList = [mockSeason];
    });
    expect(seasonStore.getterSeasonsList).toHaveLength(1);
  });
});

describe("SeasonStore – handleChange", () => {
  it("updates isLoading", () => {
    seasonStore.handleChange("isLoading", true);
    expect(seasonStore.isLoading).toBe(true);
  });

  it("updates seasonsList", () => {
    seasonStore.handleChange("seasonsList", [mockSeason]);
    expect(seasonStore.seasonsList).toHaveLength(1);
  });
});

describe("SeasonStore – getSeasonsList", () => {
  it("sets seasonsList on success", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.getSeasonsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await seasonStore.getSeasonsList();

    expect(seasonStore.seasonsList).toEqual([mockSeason]);
  });

  it("rejects on service error", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.getSeasonsList).mockRejectedValue(
      new Error("Network error"),
    );

    await expect(seasonStore.getSeasonsList()).rejects.toThrow();
  });
});

describe("SeasonStore – getSeasonById", () => {
  it("sets season on success", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.getSeasonById).mockResolvedValue(
      mockSeason as never,
    );

    await seasonStore.getSeasonById(1);

    expect(seasonStore.season).toEqual(mockSeason);
  });

  it("rejects on service error", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.getSeasonById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(seasonStore.getSeasonById(999)).rejects.toThrow();
  });
});

describe("SeasonStore – createSeason", () => {
  it("clears SEASON_MODAL on success", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.createSeason).mockResolvedValue(1 as never);
    vi.mocked(seasonService.getSeasonsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.SEASON_MODAL);
    await seasonStore.createSeason(mockSeason);

    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.SEASON_MODAL),
    ).toBe(false);
  });

  it("normalizes dates to YYYY-MM-DD", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.createSeason).mockResolvedValue(1 as never);
    vi.mocked(seasonService.getSeasonsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await seasonStore.createSeason({
      ...mockSeason,
      start_date: "2025-09-01T00:00:00Z",
    });

    expect(vi.mocked(seasonService.createSeason).mock.calls[0][0]).toMatchObject(
      { start_date: "2025-09-01" },
    );
  });

  it("rejects on service error", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.createSeason).mockRejectedValue(
      new Error("Validation error"),
    );

    await expect(seasonStore.createSeason(mockSeason)).rejects.toThrow();
  });
});

describe("SeasonStore – updateSeason", () => {
  it("sets season on success", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.updateSeason).mockResolvedValue(true as never);

    await seasonStore.updateSeason(1, mockSeason);

    expect(seasonStore.season).toMatchObject({ name: "2025/2026" });
  });

  it("rejects on service error", async () => {
    const { seasonService } = await import("./season.service");
    vi.mocked(seasonService.updateSeason).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(seasonStore.updateSeason(1, mockSeason)).rejects.toThrow();
  });
});
