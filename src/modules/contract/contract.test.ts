import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProgramEnum } from "@modules/membership/membership.types";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { CONTRACT_INITIAL_STATE } from "./contract.constants";
import { contractStore } from "./contract.store";
import { ContractStatusEnum, ContractTypeEnum } from "./contract.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./contract.service", () => ({
  contractService: {
    getContractsList: vi.fn(),
    getContractById: vi.fn(),
    createContract: vi.fn(),
    updateContract: vi.fn(),
    activateContract: vi.fn(),
  },
}));

vi.mock("@modules/auth/auth.store", () => ({
  authStore: { getAuthUser: { company_id: 1 } },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockContract = {
  id: 1,
  company_id: 1,
  user_id: 7,
  contract_type: ContractTypeEnum.MEMBERSHIP,
  membership_id: 3,
  amount: 5000,
  installments_list: [
    {
      period_start: "2025-09-01",
      period_end: "2026-01-31",
      due_date: "2025-09-01",
      amount: 2500,
    },
    {
      period_start: "2026-02-01",
      period_end: "2026-06-30",
      due_date: "2026-02-01",
      amount: 2500,
    },
  ],
  start_date: "2025-09-01",
  end_date: "2026-06-30",
  status: ContractStatusEnum.DRAFT,
  signed_at: "2025-08-20",
  program: ProgramEnum.SWIMMING,
  user: { id: 7, first_name: "Marko", last_name: "Marković" } as never,
};

const mockPaginatedResponse = {
  items: [mockContract],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    contractStore.contractsList = [];
    contractStore.contract = CONTRACT_INITIAL_STATE;
    contractStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("ContractStore – initial state", () => {
  it("starts with empty contractsList", () => {
    expect(contractStore.contractsList).toEqual([]);
  });

  it("starts with CONTRACT_INITIAL_STATE for contract", () => {
    expect(contractStore.contract).toEqual(CONTRACT_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(contractStore.isLoading).toBe(false);
  });
});

describe("ContractStore – getters", () => {
  it("getterContract reflects current contract", () => {
    runInAction(() => {
      contractStore.contract = mockContract;
    });
    expect(contractStore.getterContract).toEqual(mockContract);
  });

  it("getterContractsList reflects current list", () => {
    runInAction(() => {
      contractStore.contractsList = [mockContract];
    });
    expect(contractStore.getterContractsList).toHaveLength(1);
  });
});

describe("ContractStore – handleChange", () => {
  it("updates isLoading", () => {
    contractStore.handleChange("isLoading", true);
    expect(contractStore.isLoading).toBe(true);
  });

  it("updates contractsList", () => {
    contractStore.handleChange("contractsList", [mockContract]);
    expect(contractStore.contractsList).toHaveLength(1);
  });
});

describe("ContractStore – getContractsList", () => {
  it("sets contractsList on success", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await contractStore.getContractsList();

    expect(contractStore.contractsList).toEqual([mockContract]);
  });

  it("rejects on service error", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.getContractsList).mockRejectedValue(
      new Error("Network error"),
    );

    await expect(contractStore.getContractsList()).rejects.toThrow();
  });
});

describe("ContractStore – getContractById", () => {
  it("sets contract on success", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.getContractById).mockResolvedValue(
      mockContract as never,
    );

    await contractStore.getContractById(1);

    expect(contractStore.contract).toEqual(mockContract);
  });

  it("rejects on service error", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.getContractById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(contractStore.getContractById(999)).rejects.toThrow();
  });
});

describe("ContractStore – createContract", () => {
  it("clears CONTRACT_MODAL on success", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.createContract).mockResolvedValue(1 as never);
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.CONTRACT_MODAL);
    await contractStore.createContract(mockContract);

    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.CONTRACT_MODAL),
    ).toBe(false);
  });

  it("sends the installment schedule for a MEMBERSHIP contract", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.createContract).mockResolvedValue(1 as never);
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await contractStore.createContract(mockContract);

    expect(
      vi.mocked(contractService.createContract).mock.calls[0][0],
    ).toMatchObject({
      membership_id: 3,
      installments_list: mockContract.installments_list,
    });
  });

  it("derives start_date, end_date and amount from the installments", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.createContract).mockResolvedValue(1 as never);
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await contractStore.createContract({
      ...mockContract,
      start_date: "2000-01-01",
      end_date: null,
      amount: 1,
      installments_list: [
        {
          period_start: "2025-10-01T00:00:00",
          period_end: "2025-10-31",
          due_date: "2025-10-05",
          amount: 100.1,
        },
        {
          period_start: "2025-11-01",
          period_end: "2025-12-31",
          due_date: "2025-11-05",
          amount: 200.2,
        },
      ],
    });

    const payload = vi.mocked(contractService.createContract).mock.calls[0][0];
    expect(payload).toMatchObject({
      start_date: "2025-10-01",
      end_date: "2025-12-31",
      amount: 300.3,
    });
    expect(payload.installments_list?.[0].period_start).toBe("2025-10-01");
  });

  it("strips the read-only fields the POST endpoint does not accept", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.createContract).mockResolvedValue(1 as never);
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await contractStore.createContract(mockContract);

    const payload = vi.mocked(contractService.createContract).mock.calls[0][0];
    expect(payload).not.toHaveProperty("id");
    expect(payload).not.toHaveProperty("user");
    // `contract` has no program column — it lives on the membership.
    expect(payload).not.toHaveProperty("program");
  });

  it("strips the membership terms for a STAFF contract", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.createContract).mockResolvedValue(1 as never);
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await contractStore.createContract({
      ...mockContract,
      contract_type: ContractTypeEnum.STAFF,
    });

    const payload = vi.mocked(contractService.createContract).mock.calls[0][0];
    expect(payload).not.toHaveProperty("membership_id");
    expect(payload).not.toHaveProperty("installments_list");
  });

  it("keeps the STAFF amount as entered", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.createContract).mockResolvedValue(1 as never);
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await contractStore.createContract({
      ...mockContract,
      contract_type: ContractTypeEnum.STAFF,
      amount: 80000,
    });

    expect(
      vi.mocked(contractService.createContract).mock.calls[0][0],
    ).toMatchObject({ amount: 80000, start_date: "2025-09-01" });
  });

  it("keeps end_date for a STAFF contract", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.createContract).mockResolvedValue(1 as never);
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await contractStore.createContract({
      ...mockContract,
      contract_type: ContractTypeEnum.STAFF,
    });

    expect(
      vi.mocked(contractService.createContract).mock.calls[0][0],
    ).toMatchObject({ end_date: "2026-06-30" });
  });

  it("rejects on service error", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.createContract).mockRejectedValue(
      new Error("Validation error"),
    );

    await expect(contractStore.createContract(mockContract)).rejects.toThrow();
  });
});

describe("ContractStore – updateContract", () => {
  it("sends only the updatable fields", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.updateContract).mockResolvedValue(true as never);
    vi.mocked(contractService.getContractById).mockResolvedValue(
      mockContract as never,
    );

    await contractStore.updateContract(1, mockContract);

    const payload = vi.mocked(contractService.updateContract).mock.calls[0][1];
    expect(Object.keys(payload).sort()).toEqual([
      "amount",
      "end_date",
      "signed_at",
      "status",
    ]);
    expect(payload).not.toHaveProperty("contract_type");
    expect(payload).not.toHaveProperty("installments_list");
  });

  it("rejects on service error", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.updateContract).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(
      contractStore.updateContract(1, mockContract),
    ).rejects.toThrow();
  });
});

describe("ContractStore – activateContract", () => {
  it("refreshes the contract on success", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.activateContract).mockResolvedValue(1 as never);
    vi.mocked(contractService.getContractById).mockResolvedValue({
      ...mockContract,
      status: ContractStatusEnum.ACTIVE,
    } as never);
    vi.mocked(contractService.getContractsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await contractStore.activateContract(1);

    expect(vi.mocked(contractService.activateContract)).toHaveBeenCalledWith(1);
  });

  it("rejects on service error", async () => {
    const { contractService } = await import("./contract.service");
    vi.mocked(contractService.activateContract).mockRejectedValue(
      new Error("Cannot activate"),
    );

    await expect(contractStore.activateContract(1)).rejects.toThrow();
  });
});
