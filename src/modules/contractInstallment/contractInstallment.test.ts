import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CONTRACT_INSTALLMENT_INITIAL_STATE } from "./contractInstallment.constants";
import { contractInstallmentStore } from "./contractInstallment.store";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./contractInstallment.service", () => ({
  contractInstallmentService: {
    getContractInstallmentsList: vi.fn(),
    getContractInstallmentById: vi.fn(),
    createContractInstallment: vi.fn(),
    updateContractInstallment: vi.fn(),
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockInstallment = {
  id: 10,
  contract_id: 1,
  period_start: "2025-09-01",
  period_end: "2025-09-30",
  due_date: "2025-09-05",
  amount: 5000,
  waived: false,
};

const mockPaginatedResponse = {
  items: [mockInstallment],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    contractInstallmentStore.contractInstallmentsList = [];
    contractInstallmentStore.contractInstallment =
      CONTRACT_INSTALLMENT_INITIAL_STATE;
    contractInstallmentStore.isLoading = false;
  });
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("ContractInstallmentStore – initial state", () => {
  it("starts with empty contractInstallmentsList", () => {
    expect(contractInstallmentStore.contractInstallmentsList).toEqual([]);
  });

  it("starts with CONTRACT_INSTALLMENT_INITIAL_STATE", () => {
    expect(contractInstallmentStore.contractInstallment).toEqual(
      CONTRACT_INSTALLMENT_INITIAL_STATE,
    );
  });

  it("starts with isLoading false", () => {
    expect(contractInstallmentStore.isLoading).toBe(false);
  });
});

describe("ContractInstallmentStore – getters", () => {
  it("getterContractInstallment reflects current installment", () => {
    runInAction(() => {
      contractInstallmentStore.contractInstallment = mockInstallment;
    });
    expect(contractInstallmentStore.getterContractInstallment).toEqual(
      mockInstallment,
    );
  });

  it("getterContractInstallmentsList reflects current list", () => {
    runInAction(() => {
      contractInstallmentStore.contractInstallmentsList = [mockInstallment];
    });
    expect(
      contractInstallmentStore.getterContractInstallmentsList,
    ).toHaveLength(1);
  });
});

describe("ContractInstallmentStore – handleChange", () => {
  it("updates isLoading", () => {
    contractInstallmentStore.handleChange("isLoading", true);
    expect(contractInstallmentStore.isLoading).toBe(true);
  });

  it("updates contractInstallmentsList", () => {
    contractInstallmentStore.handleChange("contractInstallmentsList", [
      mockInstallment,
    ]);
    expect(contractInstallmentStore.contractInstallmentsList).toHaveLength(1);
  });
});

describe("ContractInstallmentStore – getContractInstallmentsListByContractId", () => {
  it("sets the list on success", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.getContractInstallmentsList,
    ).mockResolvedValue(mockPaginatedResponse as never);

    await contractInstallmentStore.getContractInstallmentsListByContractId(1);

    expect(contractInstallmentStore.contractInstallmentsList).toEqual([
      mockInstallment,
    ]);
  });

  it("filters by contract_id", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.getContractInstallmentsList,
    ).mockResolvedValue(mockPaginatedResponse as never);

    await contractInstallmentStore.getContractInstallmentsListByContractId(1);

    expect(
      vi.mocked(contractInstallmentService.getContractInstallmentsList).mock
        .calls[0][0],
    ).toMatchObject({ contract_id: 1 });
  });

  it("rejects on service error", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.getContractInstallmentsList,
    ).mockRejectedValue(new Error("Network error"));

    await expect(
      contractInstallmentStore.getContractInstallmentsListByContractId(1),
    ).rejects.toThrow();
  });
});

describe("ContractInstallmentStore – getContractInstallmentById", () => {
  it("sets contractInstallment on success", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.getContractInstallmentById,
    ).mockResolvedValue(mockInstallment as never);

    await contractInstallmentStore.getContractInstallmentById(10);

    expect(contractInstallmentStore.contractInstallment).toEqual(
      mockInstallment,
    );
  });

  it("rejects on service error", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.getContractInstallmentById,
    ).mockRejectedValue(new Error("Not found"));

    await expect(
      contractInstallmentStore.getContractInstallmentById(999),
    ).rejects.toThrow();
  });
});

describe("ContractInstallmentStore – createContractInstallment", () => {
  it("refreshes the contract's installments on success", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.createContractInstallment,
    ).mockResolvedValue(1 as never);
    vi.mocked(
      contractInstallmentService.getContractInstallmentsList,
    ).mockResolvedValue(mockPaginatedResponse as never);

    await contractInstallmentStore.createContractInstallment(mockInstallment);

    expect(
      vi.mocked(contractInstallmentService.getContractInstallmentsList),
    ).toHaveBeenCalled();
  });

  it("rejects on service error", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.createContractInstallment,
    ).mockRejectedValue(new Error("Validation error"));

    await expect(
      contractInstallmentStore.createContractInstallment(mockInstallment),
    ).rejects.toThrow();
  });
});

describe("ContractInstallmentStore – updateContractInstallment", () => {
  it("sets contractInstallment on success", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.updateContractInstallment,
    ).mockResolvedValue(true as never);
    vi.mocked(
      contractInstallmentService.getContractInstallmentsList,
    ).mockResolvedValue(mockPaginatedResponse as never);

    await contractInstallmentStore.updateContractInstallment(10, {
      ...mockInstallment,
      waived: true,
    });

    expect(contractInstallmentStore.contractInstallment).toMatchObject({
      waived: true,
    });
  });

  it("rejects on service error", async () => {
    const { contractInstallmentService } = await import(
      "./contractInstallment.service"
    );
    vi.mocked(
      contractInstallmentService.updateContractInstallment,
    ).mockRejectedValue(new Error("Update failed"));

    await expect(
      contractInstallmentStore.updateContractInstallment(10, mockInstallment),
    ).rejects.toThrow();
  });
});
