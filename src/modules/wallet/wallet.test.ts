import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { walletStore } from "./wallet.store";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./wallet.service", () => ({
  walletService: {
    getWalletById: vi.fn(),
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockWallet = {
  id: "wallet-1",
  balance: 1500,
  currency: "RSD",
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    walletStore.wallet = null;
    walletStore.isLoading = false;
  });
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("WalletStore – initial state", () => {
  it("starts with wallet as null", () => {
    expect(walletStore.wallet).toBeNull();
  });

  it("starts with isLoading false", () => {
    expect(walletStore.isLoading).toBe(false);
  });
});

describe("WalletStore – setIsLoading", () => {
  it("sets isLoading to true", () => {
    walletStore.setIsLoading(true);
    expect(walletStore.isLoading).toBe(true);
  });

  it("sets isLoading to false", () => {
    walletStore.setIsLoading(true);
    walletStore.setIsLoading(false);
    expect(walletStore.isLoading).toBe(false);
  });
});

describe("WalletStore – setWallet", () => {
  it("sets the wallet", () => {
    walletStore.setWallet(mockWallet as never);
    expect(walletStore.wallet).toEqual(mockWallet);
  });
});

describe("WalletStore – getWalletById", () => {
  it("sets wallet and resets isLoading on success", async () => {
    const { walletService } = await import("./wallet.service");
    vi.mocked(walletService.getWalletById).mockResolvedValue(
      mockWallet as never,
    );

    const result = await walletStore.getWalletById("wallet-1");

    expect(walletStore.wallet).toEqual(mockWallet);
    expect(walletStore.isLoading).toBe(false);
    expect(result).toEqual(mockWallet);
  });

  it("calls service with the correct id", async () => {
    const { walletService } = await import("./wallet.service");
    vi.mocked(walletService.getWalletById).mockResolvedValue(
      mockWallet as never,
    );

    await walletStore.getWalletById("wallet-42");

    expect(walletService.getWalletById).toHaveBeenCalledWith("wallet-42");
  });

  it("rejects and resets isLoading on service error", async () => {
    const { walletService } = await import("./wallet.service");
    vi.mocked(walletService.getWalletById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(walletStore.getWalletById("bad-id")).rejects.toThrow();
    expect(walletStore.isLoading).toBe(false);
  });
});
