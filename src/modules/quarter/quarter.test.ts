import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { QUARTER_INITIAL_STATE } from "./quarter.constants";
import { quarterStore } from "./quarter.store";
import { QuarterTypeEnum, TypeOfTrainingEnum } from "./quarter.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./quarter.service", () => ({
  quarterService: {
    getQuartersList: vi.fn(),
    getQuarterById: vi.fn(),
    createQuarter: vi.fn(),
    updateQuarter: vi.fn(),
    getAllQuarterUsersList: vi.fn(),
    createQuarterUsersList: vi.fn(),
    deleteQuarterUsersList: vi.fn(),
  },
}));

vi.mock("@modules/auth/auth.store", () => ({
  authStore: {
    getAuthUser: { company_id: 42 },
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockQuarter = {
  id: 1,
  quarter_type: QuarterTypeEnum.Q1,
  year: 2024,
  waterpolo_price: 5000,
  swimming_price: 3000,
  description: "Prvi kvartal",
  company_id: 42,
  number_of_waterpolo_users: 0,
  number_of_swimming_users: 0,
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};

const mockPaginatedResponse = {
  items: [mockQuarter],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    quarterStore.quartersList = [];
    quarterStore.quarter = QUARTER_INITIAL_STATE;
    quarterStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("QuarterStore – initial state", () => {
  it("starts with empty quartersList", () => {
    expect(quarterStore.quartersList).toEqual([]);
  });

  it("starts with QUARTER_INITIAL_STATE for quarter", () => {
    expect(quarterStore.quarter).toEqual(QUARTER_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(quarterStore.isLoading).toBe(false);
  });
});

describe("QuarterStore – getters", () => {
  it("getterQuarter reflects current quarter", () => {
    runInAction(() => {
      quarterStore.quarter = mockQuarter;
    });
    expect(quarterStore.getterQuarter).toEqual(mockQuarter);
  });

  it("getterQuartersList reflects current list", () => {
    runInAction(() => {
      quarterStore.quartersList = [mockQuarter];
    });
    expect(quarterStore.getterQuartersList).toHaveLength(1);
    expect(quarterStore.getterQuartersList[0].quarter_type).toBe(
      QuarterTypeEnum.Q1,
    );
  });
});

describe("QuarterStore – handleChange", () => {
  it("updates isLoading", () => {
    quarterStore.handleChange("isLoading", true);
    expect(quarterStore.isLoading).toBe(true);
  });

  it("updates quartersList", () => {
    quarterStore.handleChange("quartersList", [mockQuarter]);
    expect(quarterStore.quartersList).toHaveLength(1);
  });
});

describe("QuarterStore – getQuartersList", () => {
  it("sets quartersList on success", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.getQuartersList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await quarterStore.getQuartersList();

    expect(quarterStore.quartersList).toEqual([mockQuarter]);
  });

  it("rejects on service error", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.getQuartersList).mockRejectedValue(
      new Error("Server error"),
    );

    await expect(quarterStore.getQuartersList()).rejects.toThrow();
  });
});

describe("QuarterStore – getQuarterById", () => {
  it("sets quarter on success", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.getQuarterById).mockResolvedValue(
      mockQuarter as never,
    );

    await quarterStore.getQuarterById(1);

    expect(quarterStore.quarter).toEqual(mockQuarter);
  });

  it("rejects on service error", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.getQuarterById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(quarterStore.getQuarterById(999)).rejects.toThrow();
  });
});

describe("QuarterStore – createQuarter", () => {
  it("injects company_id from authStore and clears QUARTER_MODAL on success", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.createQuarter).mockResolvedValue(1 as never);
    vi.mocked(quarterService.getQuartersList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.QUARTER_MODAL);
    await quarterStore.createQuarter(QUARTER_INITIAL_STATE);

    expect(quarterService.createQuarter).toHaveBeenCalledWith(
      expect.objectContaining({ company_id: 42 }),
    );
    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.QUARTER_MODAL),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.createQuarter).mockRejectedValue(
      new Error("Bad request"),
    );

    await expect(
      quarterStore.createQuarter(QUARTER_INITIAL_STATE),
    ).rejects.toThrow();
  });
});

describe("QuarterStore – addUserToQuarter", () => {
  it("sends type_of_training and clears QUARTER_ADD_USER_MODAL on success", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.createQuarterUsersList).mockResolvedValue(
      1 as never,
    );
    vi.mocked(quarterService.getAllQuarterUsersList).mockResolvedValue({
      items: [],
      pagination: { page: 1, size: 50, total: 0, pages: 0 },
    } as never);

    const payload = {
      quarter_id: 1,
      user_id: 7,
      type_of_training: TypeOfTrainingEnum.WATERPOLO,
    };

    modalStore.openModal(ModalTypeEnum.QUARTER_ADD_USER_MODAL);
    await quarterStore.addUserToQuarter(payload);

    expect(quarterService.createQuarterUsersList).toHaveBeenCalledWith(payload);
    expect(
      modalStore.getterModalListNames.includes(
        ModalTypeEnum.QUARTER_ADD_USER_MODAL,
      ),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.createQuarterUsersList).mockRejectedValue(
      new Error("Bad request"),
    );

    await expect(
      quarterStore.addUserToQuarter({
        quarter_id: 1,
        user_id: 7,
        type_of_training: TypeOfTrainingEnum.SWIMMING,
      }),
    ).rejects.toThrow();
  });
});

describe("QuarterStore – updateQuarter", () => {
  it("updates quarter state on success", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.updateQuarter).mockResolvedValue(true as never);

    const updated = { ...mockQuarter, waterpolo_price: 7000 };
    await quarterStore.updateQuarter(1, updated);

    expect(quarterStore.quarter).toEqual(updated);
  });

  it("rejects on service error", async () => {
    const { quarterService } = await import("./quarter.service");
    vi.mocked(quarterService.updateQuarter).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(quarterStore.updateQuarter(1, mockQuarter)).rejects.toThrow();
  });
});
