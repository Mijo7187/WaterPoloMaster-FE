import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { drawerStore } from "@stores/drawer/drawer.store";
import { DrawerTypeEnum } from "@stores/drawer/drawer.types";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { PAYMENT_INITIAL_STATE } from "./payment.constants";
import { paymentStore } from "./payment.store";
import { PaymentStatusEnum, PaymentTypeEnum } from "./payment.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./payment.service", () => ({
  paymentService: {
    getPaymentList: vi.fn(),
    getPaymentById: vi.fn(),
    createPayment: vi.fn(),
    updatePayment: vi.fn(),
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockPayment = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  sender_wallet_id: "aaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  receiver_wallet_id: "ffff-gggg-hhhh-iiii-jjjjjjjjjjjj",
  payment_type: PaymentTypeEnum.USER_QUARTERLY_FEE,
  amount: 500,
  status: PaymentStatusEnum.PENDING,
  description: "Test payment",
  created_at: "2024-01-01T00:00:00Z",
  sender_wallet: { id: 1, name: "Club A" } as never,
  receiver_wallet: { id: 2, name: "Club B" } as never,
};

const mockPaginatedResponse = {
  items: [mockPayment],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    paymentStore.paymentList = [];
    paymentStore.payment = PAYMENT_INITIAL_STATE;
    paymentStore.isLoading = false;
  });
  modalStore.removeAllModals();
  drawerStore.removeAllDrawers();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("PaymentStore – initial state", () => {
  it("starts with empty paymentList", () => {
    expect(paymentStore.paymentList).toEqual([]);
  });

  it("starts with PAYMENT_INITIAL_STATE for payment", () => {
    expect(paymentStore.payment).toEqual(PAYMENT_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(paymentStore.isLoading).toBe(false);
  });
});

describe("PaymentStore – getters", () => {
  it("getterPayment reflects current payment", () => {
    runInAction(() => {
      paymentStore.payment = mockPayment;
    });
    expect(paymentStore.getterPayment).toEqual(mockPayment);
  });

  it("getterPaymentList reflects current list", () => {
    runInAction(() => {
      paymentStore.paymentList = [mockPayment];
    });
    expect(paymentStore.getterPaymentList).toHaveLength(1);
    expect(paymentStore.getterPaymentList[0].id).toBe(mockPayment.id);
  });
});

describe("PaymentStore – handleChange", () => {
  it("updates isLoading", () => {
    paymentStore.handleChange("isLoading", true);
    expect(paymentStore.isLoading).toBe(true);
  });

  it("updates paymentList", () => {
    paymentStore.handleChange("paymentList", [mockPayment]);
    expect(paymentStore.paymentList).toHaveLength(1);
  });
});

describe("PaymentStore – getPaymentList", () => {
  it("sets paymentList on success", async () => {
    const { paymentService } = await import("./payment.service");
    vi.mocked(paymentService.getPaymentList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await paymentStore.getPaymentList();

    expect(paymentStore.paymentList).toEqual([mockPayment]);
  });

  it("rejects on service error", async () => {
    const { paymentService } = await import("./payment.service");
    vi.mocked(paymentService.getPaymentList).mockRejectedValue(
      new Error("Network error"),
    );

    await expect(paymentStore.getPaymentList()).rejects.toThrow();
  });
});

describe("PaymentStore – getPaymentById", () => {
  it("sets payment on success", async () => {
    const { paymentService } = await import("./payment.service");
    vi.mocked(paymentService.getPaymentById).mockResolvedValue(
      mockPayment as never,
    );

    await paymentStore.getPaymentById(mockPayment.id);

    expect(paymentStore.payment).toEqual(mockPayment);
  });

  it("rejects on service error", async () => {
    const { paymentService } = await import("./payment.service");
    vi.mocked(paymentService.getPaymentById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(
      paymentStore.getPaymentById("nonexistent-id"),
    ).rejects.toThrow();
  });
});

describe("PaymentStore – createPayment", () => {
  it("clears PAYMENT_MODAL and refreshes list on success", async () => {
    const { paymentService } = await import("./payment.service");
    vi.mocked(paymentService.createPayment).mockResolvedValue(1 as never);
    vi.mocked(paymentService.getPaymentList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.PAYMENT_MODAL);
    await paymentStore.createPayment(mockPayment);

    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.PAYMENT_MODAL),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { paymentService } = await import("./payment.service");
    vi.mocked(paymentService.createPayment).mockRejectedValue(
      new Error("Validation error"),
    );

    await expect(paymentStore.createPayment(mockPayment)).rejects.toThrow();
  });
});

describe("PaymentStore – updatePayment", () => {
  it("clears PAYMENT_DRAWER and refreshes list on success", async () => {
    const { paymentService } = await import("./payment.service");
    vi.mocked(paymentService.updatePayment).mockResolvedValue(true as never);
    vi.mocked(paymentService.getPaymentList).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    drawerStore.openDrawer(DrawerTypeEnum.PAYMENT_DRAWER);
    await paymentStore.updatePayment(mockPayment.id, mockPayment);

    expect(
      drawerStore.getterDrawerListNames.includes(DrawerTypeEnum.PAYMENT_DRAWER),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { paymentService } = await import("./payment.service");
    vi.mocked(paymentService.updatePayment).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(
      paymentStore.updatePayment(mockPayment.id, mockPayment),
    ).rejects.toThrow();
  });
});
