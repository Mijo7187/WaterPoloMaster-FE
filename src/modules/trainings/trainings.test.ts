import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { TRAINING_INITIAL_STATE } from "./trainings.constants";
import { trainingsStore } from "./trainings.store";
import { TrainingStatusEnum } from "./trainings.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./trainings.service", () => ({
  trainingsService: {
    getTrainingsList: vi.fn(),
    getTrainingById: vi.fn(),
    createTraining: vi.fn(),
    updateTraining: vi.fn(),
  },
}));

vi.mock("@modules/auth/auth.store", () => ({
  authStore: {
    getAuthUser: { company_id: 42 },
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockTraining = {
  id: 1,
  pool_id: 5,
  company_id: 42,
  start_training_date_time: "2024-06-01T10:00:00",
  end_training_date_time: "2024-06-01T12:00:00",
  price: 500,
  payed: false,
  status: TrainingStatusEnum.INCOMING,
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
  users_list: [],
};

const mockPaginatedResponse = {
  items: [mockTraining],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    trainingsStore.trainingsList = [];
    trainingsStore.training = TRAINING_INITIAL_STATE;
    trainingsStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("TrainingsStore – initial state", () => {
  it("starts with empty trainingsList", () => {
    expect(trainingsStore.trainingsList).toEqual([]);
  });

  it("starts with TRAINING_INITIAL_STATE for training", () => {
    expect(trainingsStore.training).toEqual(TRAINING_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(trainingsStore.isLoading).toBe(false);
  });
});

describe("TrainingsStore – getters", () => {
  it("getterTraining reflects current training", () => {
    runInAction(() => {
      trainingsStore.training = mockTraining;
    });
    expect(trainingsStore.getterTraining).toEqual(mockTraining);
  });

  it("getterTrainingsList reflects current list", () => {
    runInAction(() => {
      trainingsStore.trainingsList = [mockTraining];
    });
    expect(trainingsStore.getterTrainingsList).toHaveLength(1);
    expect(trainingsStore.getterTrainingsList[0].status).toBe(
      TrainingStatusEnum.INCOMING,
    );
  });
});

describe("TrainingsStore – handleChange", () => {
  it("updates isLoading", () => {
    trainingsStore.handleChange("isLoading", true);
    expect(trainingsStore.isLoading).toBe(true);
  });

  it("updates trainingsList", () => {
    trainingsStore.handleChange("trainingsList", [mockTraining]);
    expect(trainingsStore.trainingsList).toHaveLength(1);
  });
});

describe("TrainingsStore – getTrainingsList", () => {
  it("sets trainingsList on success", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.getTrainingsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await trainingsStore.getTrainingsList();

    expect(trainingsStore.trainingsList).toEqual(mockPaginatedResponse);
  });

  it("passes filters to the service", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.getTrainingsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    const filters = { status: TrainingStatusEnum.INCOMING };
    await trainingsStore.getTrainingsList(filters);

    expect(trainingsService.getTrainingsList).toHaveBeenCalledWith(filters);
  });

  it("rejects on service error", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.getTrainingsList).mockRejectedValue(
      new Error("Server error"),
    );

    await expect(trainingsStore.getTrainingsList()).rejects.toThrow();
  });
});

describe("TrainingsStore – getTrainingById", () => {
  it("sets training on success", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.getTrainingById).mockResolvedValue(
      mockTraining as never,
    );

    await trainingsStore.getTrainingById(1);

    expect(trainingsStore.training).toEqual(mockTraining);
  });

  it("rejects on service error", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.getTrainingById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(trainingsStore.getTrainingById(999)).rejects.toThrow();
  });
});

describe("TrainingsStore – createTraining", () => {
  it("injects company_id from authStore and clears TRAINING_MODAL on success", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.createTraining).mockResolvedValue(1 as never);
    vi.mocked(trainingsService.getTrainingsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.TRAINING_MODAL);
    await trainingsStore.createTraining(TRAINING_INITIAL_STATE);

    expect(trainingsService.createTraining).toHaveBeenCalledWith(
      expect.objectContaining({ company_id: 42 }),
    );
    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.TRAINING_MODAL),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.createTraining).mockRejectedValue(
      new Error("Bad request"),
    );

    await expect(
      trainingsStore.createTraining(TRAINING_INITIAL_STATE),
    ).rejects.toThrow();
  });
});

describe("TrainingsStore – updateTraining", () => {
  it("updates training state on success", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.updateTraining).mockResolvedValue(true as never);

    const updated = { ...mockTraining, status: TrainingStatusEnum.COMPLETED };
    await trainingsStore.updateTraining(1, updated);

    expect(trainingsStore.training).toEqual(updated);
  });

  it("rejects on service error", async () => {
    const { trainingsService } = await import("./trainings.service");
    vi.mocked(trainingsService.updateTraining).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(
      trainingsStore.updateTraining(1, mockTraining),
    ).rejects.toThrow();
  });
});
