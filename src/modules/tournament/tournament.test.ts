import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { TOURNAMENT_INITIAL_STATE } from "./tournament.constants";
import { tournamentStore } from "./tournament.store";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./tournament.service", () => ({
  tournamentService: {
    getTournamentsList: vi.fn(),
    getTournamentById: vi.fn(),
    createTournament: vi.fn(),
    updateTournament: vi.fn(),
  },
}));

vi.mock("@modules/auth/auth.store", () => ({
  authStore: {
    getAuthUser: { company_id: 42 },
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockTournament = {
  id: 1,
  company_id: 42,
  pool_id: 5,
  from_date: "2024-06-01",
  to_date: "2024-06-10",
  price: 1000,
  description: "Letnji turnir",
  number_of_users: 0,
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};

const mockPaginatedResponse = {
  items: [mockTournament],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    tournamentStore.tournamentsList = [];
    tournamentStore.tournament = TOURNAMENT_INITIAL_STATE;
    tournamentStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("TournamentStore – initial state", () => {
  it("starts with empty tournamentsList", () => {
    expect(tournamentStore.tournamentsList).toEqual([]);
  });

  it("starts with TOURNAMENT_INITIAL_STATE for tournament", () => {
    expect(tournamentStore.tournament).toEqual(TOURNAMENT_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(tournamentStore.isLoading).toBe(false);
  });
});

describe("TournamentStore – getters", () => {
  it("getterTournament reflects current tournament", () => {
    runInAction(() => {
      tournamentStore.tournament = mockTournament;
    });
    expect(tournamentStore.getterTournament).toEqual(mockTournament);
  });

  it("getterTournamentsList reflects current list", () => {
    runInAction(() => {
      tournamentStore.tournamentsList = [mockTournament];
    });
    expect(tournamentStore.getterTournamentsList).toHaveLength(1);
  });
});

describe("TournamentStore – handleChange", () => {
  it("updates isLoading", () => {
    tournamentStore.handleChange("isLoading", true);
    expect(tournamentStore.isLoading).toBe(true);
  });

  it("updates tournamentsList", () => {
    tournamentStore.handleChange("tournamentsList", [mockTournament]);
    expect(tournamentStore.tournamentsList).toHaveLength(1);
  });
});

describe("TournamentStore – getTournamentsList", () => {
  it("sets tournamentsList on success", async () => {
    const { tournamentService } = await import("./tournament.service");
    vi.mocked(tournamentService.getTournamentsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await tournamentStore.getTournamentsList();

    expect(tournamentStore.tournamentsList).toEqual([mockTournament]);
  });

  it("rejects on service error", async () => {
    const { tournamentService } = await import("./tournament.service");
    vi.mocked(tournamentService.getTournamentsList).mockRejectedValue(
      new Error("Server error"),
    );

    await expect(tournamentStore.getTournamentsList()).rejects.toThrow();
  });
});

describe("TournamentStore – getTournamentById", () => {
  it("sets tournament on success", async () => {
    const { tournamentService } = await import("./tournament.service");
    vi.mocked(tournamentService.getTournamentById).mockResolvedValue(
      mockTournament as never,
    );

    await tournamentStore.getTournamentById(1);

    expect(tournamentStore.tournament).toEqual(mockTournament);
  });

  it("rejects on service error", async () => {
    const { tournamentService } = await import("./tournament.service");
    vi.mocked(tournamentService.getTournamentById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(tournamentStore.getTournamentById(999)).rejects.toThrow();
  });
});

describe("TournamentStore – createTournament", () => {
  it("injects company_id from authStore and clears TOURNAMENT_MODAL on success", async () => {
    const { tournamentService } = await import("./tournament.service");
    vi.mocked(tournamentService.createTournament).mockResolvedValue(1 as never);
    vi.mocked(tournamentService.getTournamentsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.TOURNAMENT_MODAL);
    await tournamentStore.createTournament(TOURNAMENT_INITIAL_STATE);

    expect(tournamentService.createTournament).toHaveBeenCalledWith(
      expect.objectContaining({ company_id: 42 }),
    );
    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.TOURNAMENT_MODAL),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { tournamentService } = await import("./tournament.service");
    vi.mocked(tournamentService.createTournament).mockRejectedValue(
      new Error("Bad request"),
    );

    await expect(
      tournamentStore.createTournament(TOURNAMENT_INITIAL_STATE),
    ).rejects.toThrow();
  });
});

describe("TournamentStore – updateTournament", () => {
  it("updates tournament state on success", async () => {
    const { tournamentService } = await import("./tournament.service");
    vi.mocked(tournamentService.updateTournament).mockResolvedValue(
      true as never,
    );

    const updated = { ...mockTournament, price: 2000 };
    await tournamentStore.updateTournament(1, updated);

    expect((tournamentStore.tournament as typeof mockTournament).price).toBe(
      2000,
    );
  });

  it("rejects on service error", async () => {
    const { tournamentService } = await import("./tournament.service");
    vi.mocked(tournamentService.updateTournament).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(
      tournamentStore.updateTournament(1, mockTournament),
    ).rejects.toThrow();
  });
});
