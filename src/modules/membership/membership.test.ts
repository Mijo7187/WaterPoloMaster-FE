import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { MEMBERSHIP_INITIAL_STATE } from "./membership.constants";
import { membershipStore } from "./membership.store";
import { ProgramEnum } from "./membership.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./membership.service", () => ({
  membershipService: {
    getMembershipsList: vi.fn(),
    getMembershipById: vi.fn(),
    createMembership: vi.fn(),
    updateMembership: vi.fn(),
  },
}));

vi.mock("@modules/auth/auth.store", () => ({
  authStore: { getAuthUser: { company_id: 1 } },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockMembership = {
  id: 1,
  company_id: 1,
  name: "Vaterpolo — godišnja",
  program: ProgramEnum.WATERPOLO,
  months_count: 10,
  price_month: 5000,
  installments_count: 10,
  is_active: true,
  price_total: 50000,
};

const mockPaginatedResponse = {
  items: [mockMembership],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    membershipStore.membershipsList = [];
    membershipStore.membership = MEMBERSHIP_INITIAL_STATE;
    membershipStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("MembershipStore – initial state", () => {
  it("starts with empty membershipsList", () => {
    expect(membershipStore.membershipsList).toEqual([]);
  });

  it("starts with MEMBERSHIP_INITIAL_STATE for membership", () => {
    expect(membershipStore.membership).toEqual(MEMBERSHIP_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(membershipStore.isLoading).toBe(false);
  });
});

describe("MembershipStore – getters", () => {
  it("getterMembership reflects the current membership", () => {
    runInAction(() => {
      membershipStore.membership = mockMembership;
    });
    expect(membershipStore.getterMembership).toEqual(mockMembership);
  });

  it("getterMembershipsList reflects the current list", () => {
    runInAction(() => {
      membershipStore.membershipsList = [mockMembership];
    });
    expect(membershipStore.getterMembershipsList).toHaveLength(1);
  });
});

describe("MembershipStore – handleChange", () => {
  it("updates isLoading", () => {
    membershipStore.handleChange("isLoading", true);
    expect(membershipStore.isLoading).toBe(true);
  });

  it("updates membershipsList", () => {
    membershipStore.handleChange("membershipsList", [mockMembership]);
    expect(membershipStore.membershipsList).toHaveLength(1);
  });
});

describe("MembershipStore – getMembershipsList", () => {
  it("sets membershipsList on success", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.getMembershipsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await membershipStore.getMembershipsList();

    expect(membershipStore.membershipsList).toEqual([mockMembership]);
  });

  it("rejects on service error", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.getMembershipsList).mockRejectedValue(
      new Error("Network error"),
    );

    await expect(membershipStore.getMembershipsList()).rejects.toThrow();
  });
});

describe("MembershipStore – getMembershipById", () => {
  it("sets membership on success", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.getMembershipById).mockResolvedValue(
      mockMembership as never,
    );

    await membershipStore.getMembershipById(1);

    expect(membershipStore.membership).toEqual(mockMembership);
  });

  it("rejects on service error", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.getMembershipById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(membershipStore.getMembershipById(999)).rejects.toThrow();
  });
});

describe("MembershipStore – createMembership", () => {
  it("clears MEMBERSHIP_MODAL on success", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.createMembership).mockResolvedValue(1 as never);
    vi.mocked(membershipService.getMembershipsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.MEMBERSHIP_MODAL);
    await membershipStore.createMembership(mockMembership);

    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.MEMBERSHIP_MODAL),
    ).toBe(false);
  });

  it("injects the authenticated user's company_id", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.createMembership).mockResolvedValue(1 as never);
    vi.mocked(membershipService.getMembershipsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await membershipStore.createMembership({
      ...mockMembership,
      company_id: 99,
    });

    expect(
      vi.mocked(membershipService.createMembership).mock.calls[0][0],
    ).toMatchObject({ company_id: 1 });
  });

  it("strips the server-derived fields from the payload", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.createMembership).mockResolvedValue(1 as never);
    vi.mocked(membershipService.getMembershipsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await membershipStore.createMembership(mockMembership);

    const payload = vi.mocked(membershipService.createMembership).mock
      .calls[0][0];
    expect(payload).not.toHaveProperty("id");
    expect(payload).not.toHaveProperty("price_total");
  });

  it("rejects on service error", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.createMembership).mockRejectedValue(
      new Error("Validation error"),
    );

    await expect(
      membershipStore.createMembership(mockMembership),
    ).rejects.toThrow();
  });
});

describe("MembershipStore – updateMembership", () => {
  it("sends the write payload without the server-derived fields", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.updateMembership).mockResolvedValue(
      true as never,
    );
    vi.mocked(membershipService.getMembershipsList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await membershipStore.updateMembership(1, mockMembership);

    const payload = vi.mocked(membershipService.updateMembership).mock
      .calls[0][1];
    expect(Object.keys(payload).sort()).toEqual([
      "company_id",
      "installments_count",
      "is_active",
      "months_count",
      "name",
      "price_month",
      "program",
    ]);
  });

  it("rejects on service error", async () => {
    const { membershipService } = await import("./membership.service");
    vi.mocked(membershipService.updateMembership).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(
      membershipStore.updateMembership(1, mockMembership),
    ).rejects.toThrow();
  });
});
