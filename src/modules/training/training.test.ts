import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TrainingSegmentEnum } from "@modules/sifarnici/exerciseOption/exerciseOption.types";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { TRAINING_INITIAL_STATE } from "./training.constants";
import { trainingStore } from "./training.store";
import { IPostExerciseSegment, TrainingStatusEnum } from "./training.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./training.service", () => ({
  trainingService: {
    getTrainingsList: vi.fn(),
    getTrainingById: vi.fn(),
    createTraining: vi.fn(),
    updateTraining: vi.fn(),
    getSegmentsByTraining: vi.fn(),
    getSegmentById: vi.fn(),
    createSegment: vi.fn(),
    updateSegment: vi.fn(),
    deleteSegment: vi.fn(),
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
  season_id: 1,
  company_id: 42,
  training_date: "2024-06-01",
  start_time: "10:00:00",
  end_time: "12:00:00",
  price: 500,
  status: TrainingStatusEnum.INCOMING,
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};

const mockPaginatedResponse = {
  items: [mockTraining],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

const mockExerciseSegmentPayload: IPostExerciseSegment = {
  training_id: 1,
  segment_type: TrainingSegmentEnum.SWIMMING,
  duration_minutes: 30,
  notes: null,
  exercises: [{ exercise_option_id: 7, position: 0, meters: 100 }],
};

const mockSegment = {
  id: 9,
  training_id: 1,
  segment_type: TrainingSegmentEnum.SWIMMING,
  position: 0,
  duration_minutes: 30,
  notes: null,
  exercises: [{ id: 1, exercise_option_id: 7, position: 0, meters: 100 }],
  sparring: null,
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    trainingStore.trainingsList = [];
    trainingStore.training = TRAINING_INITIAL_STATE;
    trainingStore.trainingSegments = [];
    trainingStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("TrainingStore – initial state", () => {
  it("starts with empty trainingsList", () => {
    expect(trainingStore.trainingsList).toEqual([]);
  });

  it("starts with TRAINING_INITIAL_STATE for training", () => {
    expect(trainingStore.training).toEqual(TRAINING_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(trainingStore.isLoading).toBe(false);
  });
});

describe("TrainingStore – getters", () => {
  it("getterTraining reflects current training", () => {
    runInAction(() => {
      trainingStore.training = mockTraining;
    });
    expect(trainingStore.getterTraining).toEqual(mockTraining);
  });

  it("getterTrainingsList reflects current list", () => {
    runInAction(() => {
      trainingStore.trainingsList = [mockTraining];
    });
    expect(trainingStore.getterTrainingsList).toHaveLength(1);
    expect(trainingStore.getterTrainingsList[0].status).toBe(
      TrainingStatusEnum.INCOMING,
    );
  });
});

describe("TrainingStore – handleChange", () => {
  it("updates isLoading", () => {
    trainingStore.handleChange("isLoading", true);
    expect(trainingStore.isLoading).toBe(true);
  });

  it("updates trainingsList", () => {
    trainingStore.handleChange("trainingsList", [mockTraining]);
    expect(trainingStore.trainingsList).toHaveLength(1);
  });
});

describe("TrainingStore – getTrainingsList", () => {
  it("sets trainingsList on success", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.getTrainingsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await trainingStore.getTrainingsList();

    expect(trainingStore.trainingsList).toEqual(mockPaginatedResponse.items);
  });

  it("passes order_by filter to the service", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.getTrainingsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await trainingStore.getTrainingsList();

    expect(trainingService.getTrainingsList).toHaveBeenCalledWith(
      expect.objectContaining({ order_by: "training_date" }),
    );
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.getTrainingsList).mockRejectedValue(
      new Error("Server error"),
    );

    await expect(trainingStore.getTrainingsList()).rejects.toThrow();
  });
});

describe("TrainingStore – getTrainingById", () => {
  it("sets training on success", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.getTrainingById).mockResolvedValue(
      mockTraining as never,
    );

    await trainingStore.getTrainingById(1);

    expect(trainingStore.training).toEqual(mockTraining);
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.getTrainingById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(trainingStore.getTrainingById(999)).rejects.toThrow();
  });
});

describe("TrainingStore – createTraining", () => {
  it("injects company_id from authStore and clears TRAINING_MODAL on success", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.createTraining).mockResolvedValue(1 as never);
    vi.mocked(trainingService.getTrainingsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.TRAINING_MODAL);
    await trainingStore.createTraining(TRAINING_INITIAL_STATE);

    expect(trainingService.createTraining).toHaveBeenCalledWith(
      expect.objectContaining({ company_id: 42 }),
    );
    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.TRAINING_MODAL),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.createTraining).mockRejectedValue(
      new Error("Bad request"),
    );

    await expect(
      trainingStore.createTraining(TRAINING_INITIAL_STATE),
    ).rejects.toThrow();
  });
});

describe("TrainingStore – updateTraining", () => {
  it("updates training state on success", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.updateTraining).mockResolvedValue(true as never);

    const updated = { ...mockTraining, status: TrainingStatusEnum.FINISHED };
    await trainingStore.updateTraining(1, updated);

    expect(trainingStore.training).toEqual(updated);
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.updateTraining).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(
      trainingStore.updateTraining(1, mockTraining),
    ).rejects.toThrow();
  });
});

describe("TrainingStore – getSegmentsByTraining", () => {
  it("sets trainingSegments on success", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.getSegmentsByTraining).mockResolvedValue([
      mockSegment,
    ] as never);

    await trainingStore.getSegmentsByTraining(1);

    expect(trainingService.getSegmentsByTraining).toHaveBeenCalledWith(1);
    expect(trainingStore.trainingSegments).toEqual([mockSegment]);
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.getSegmentsByTraining).mockRejectedValue(
      new Error("Server error"),
    );

    await expect(trainingStore.getSegmentsByTraining(1)).rejects.toThrow();
  });
});

describe("TrainingStore – getSegmentById", () => {
  it("replaces only the matching segment in trainingSegments", async () => {
    const { trainingService } = await import("./training.service");
    const otherSegment = { ...mockSegment, id: 10 };
    const refreshedSegment = { ...mockSegment, duration_minutes: 45 };
    runInAction(() => {
      trainingStore.trainingSegments = [mockSegment, otherSegment] as never;
    });
    vi.mocked(trainingService.getSegmentById).mockResolvedValue(
      refreshedSegment as never,
    );

    await trainingStore.getSegmentById(9);

    expect(trainingService.getSegmentById).toHaveBeenCalledWith(9);
    expect(trainingStore.trainingSegments).toEqual([
      refreshedSegment,
      otherSegment,
    ]);
  });

  it("leaves trainingSegments untouched when the id is not in the list", async () => {
    const { trainingService } = await import("./training.service");
    runInAction(() => {
      trainingStore.trainingSegments = [mockSegment] as never;
    });
    vi.mocked(trainingService.getSegmentById).mockResolvedValue({
      ...mockSegment,
      id: 99,
    } as never);

    await trainingStore.getSegmentById(99);

    expect(trainingStore.trainingSegments).toEqual([mockSegment]);
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    runInAction(() => {
      trainingStore.trainingSegments = [mockSegment] as never;
    });
    vi.mocked(trainingService.getSegmentById).mockRejectedValue(
      new Error("Server error"),
    );

    await expect(trainingStore.getSegmentById(9)).rejects.toThrow();
    expect(trainingStore.trainingSegments).toEqual([mockSegment]);
  });
});

describe("TrainingStore – createSegment", () => {
  it("refreshes the segment list on success", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.createSegment).mockResolvedValue(1 as never);
    vi.mocked(trainingService.getSegmentsByTraining).mockResolvedValue([
      mockSegment,
    ] as never);

    await trainingStore.createSegment(mockExerciseSegmentPayload);

    expect(trainingService.createSegment).toHaveBeenCalledWith(
      mockExerciseSegmentPayload,
    );
    expect(trainingService.getSegmentsByTraining).toHaveBeenCalledWith(1);
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.createSegment).mockRejectedValue(
      new Error("Bad request"),
    );

    await expect(
      trainingStore.createSegment(mockExerciseSegmentPayload),
    ).rejects.toThrow();
    expect(trainingService.getSegmentsByTraining).not.toHaveBeenCalled();
  });
});

describe("TrainingStore – updateSegment", () => {
  it("refreshes the segment list on success", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.updateSegment).mockResolvedValue(true as never);
    vi.mocked(trainingService.getSegmentsByTraining).mockResolvedValue([
      mockSegment,
    ] as never);

    await trainingStore.updateSegment(9, 1, { duration_minutes: 45 });

    expect(trainingService.updateSegment).toHaveBeenCalledWith(9, {
      duration_minutes: 45,
    });
    expect(trainingService.getSegmentsByTraining).toHaveBeenCalledWith(1);
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.updateSegment).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(
      trainingStore.updateSegment(9, 1, { duration_minutes: 45 }),
    ).rejects.toThrow();
    expect(trainingService.getSegmentsByTraining).not.toHaveBeenCalled();
  });
});

describe("TrainingStore – deleteSegment", () => {
  it("refreshes the segment list on success", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.deleteSegment).mockResolvedValue(true as never);
    vi.mocked(trainingService.getSegmentsByTraining).mockResolvedValue(
      [] as never,
    );

    await trainingStore.deleteSegment(9, 1);

    expect(trainingService.deleteSegment).toHaveBeenCalledWith(9);
    expect(trainingService.getSegmentsByTraining).toHaveBeenCalledWith(1);
  });

  it("rejects on service error", async () => {
    const { trainingService } = await import("./training.service");
    vi.mocked(trainingService.deleteSegment).mockRejectedValue(
      new Error("Delete failed"),
    );

    await expect(trainingStore.deleteSegment(9, 1)).rejects.toThrow();
    expect(trainingService.getSegmentsByTraining).not.toHaveBeenCalled();
  });
});
