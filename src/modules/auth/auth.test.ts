import { runInAction } from "mobx";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { authStore } from "./auth.store";
import { UserRolesEnum } from "./auth.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./auth.service", () => ({
  authService: {
    postLogin: vi.fn(),
    requestPasswordReset: vi.fn(),
    setNewPassword: vi.fn(),
  },
}));

vi.mock("@modules/users/users.service", () => ({
  usersService: {
    getUserById: vi.fn(),
  },
}));

vi.mock("@storage/storage", () => ({
  default: {
    setData: vi.fn(),
    getData: vi.fn().mockReturnValue(null),
    removeData: vi.fn(),
  },
  StorageEnum: {
    AUTH_USER: "AUTH_USER",
    AUTH_USER_INFO: "AUTH_USER_INFO",
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockAuthUser = {
  access_token: "token-abc",
  refresh_token: "refresh-xyz",
  user_id: 1,
  roles: [UserRolesEnum.ADMIN],
  company_id: 10,
};

const mockUserInfo = {
  id: 1,
  first_name: "Marko",
  last_name: "Markovic",
  email: "marko@test.com",
  roles: [UserRolesEnum.ADMIN],
  is_active: true,
  phone_number: "0611234567",
  date_of_birth: "1990-01-01",
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(async () => {
  vi.clearAllMocks();
  runInAction(() => {
    authStore.authUser = null as unknown as typeof authStore.authUser;
    authStore.authUserInfo = null;
  });
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("AuthStore – computed getters (unauthenticated)", () => {
  it("getAuthUserRoles returns empty array when not logged in", () => {
    expect(authStore.getAuthUserRoles).toEqual([]);
  });

  it("getIsSuperAdmin returns false when not logged in", () => {
    expect(authStore.getIsSuperAdmin).toBe(false);
  });

  it("getAuthUserInfo returns empty object when not logged in", () => {
    expect(authStore.getAuthUserInfo).toEqual({});
  });
});

describe("AuthStore – handleChange", () => {
  it("updates authUser", () => {
    runInAction(() => {
      authStore.handleChange(
        "authUser",
        mockAuthUser as typeof authStore.authUser,
      );
    });
    expect(authStore.authUser).toEqual(mockAuthUser);
  });

  it("updates authUserInfo", () => {
    runInAction(() => {
      authStore.handleChange(
        "authUserInfo",
        mockUserInfo as typeof authStore.authUserInfo,
      );
    });
    expect(authStore.authUserInfo).toEqual(mockUserInfo);
  });
});

describe("AuthStore – computed getters (authenticated)", () => {
  beforeEach(() => {
    runInAction(() => {
      authStore.authUser = {
        ...mockAuthUser,
        roles: [UserRolesEnum.SUPER_ADMIN],
      } as typeof authStore.authUser;
    });
  });

  it("getAuthUser returns the stored auth user", () => {
    expect(authStore.getAuthUser.access_token).toBe("token-abc");
  });

  it("getAuthUserRoles returns roles array", () => {
    expect(authStore.getAuthUserRoles).toContain(UserRolesEnum.SUPER_ADMIN);
  });

  it("getIsSuperAdmin returns true for SUPER_ADMIN role", () => {
    expect(authStore.getIsSuperAdmin).toBe(true);
  });

  it("getIsSuperAdmin returns false for ADMIN role", () => {
    runInAction(() => {
      authStore.authUser = {
        ...mockAuthUser,
        roles: [UserRolesEnum.ADMIN],
      } as typeof authStore.authUser;
    });
    expect(authStore.getIsSuperAdmin).toBe(false);
  });
});

describe("AuthStore – postLogin", () => {
  it("sets authUser and authUserInfo on success", async () => {
    const { authService } = await import("./auth.service");
    const { usersService } = await import("@modules/users/users.service");
    vi.mocked(authService.postLogin).mockResolvedValue(mockAuthUser as never);
    vi.mocked(usersService.getUserById).mockResolvedValue(
      mockUserInfo as never,
    );

    await authStore.postLogin({ email: "marko@test.com", password: "pass" });

    expect(authStore.authUser).toEqual(mockAuthUser);
    expect(authStore.authUserInfo).toEqual(mockUserInfo);
  });

  it("rejects when authService.postLogin fails", async () => {
    const { authService } = await import("./auth.service");
    vi.mocked(authService.postLogin).mockRejectedValue(
      new Error("Invalid credentials"),
    );

    await expect(
      authStore.postLogin({ email: "bad@test.com", password: "wrong" }),
    ).rejects.toThrow();
  });

  it("rejects when getUserById fails after login", async () => {
    const { authService } = await import("./auth.service");
    const { usersService } = await import("@modules/users/users.service");
    vi.mocked(authService.postLogin).mockResolvedValue(mockAuthUser as never);
    vi.mocked(usersService.getUserById).mockRejectedValue(
      new Error("User not found"),
    );

    await expect(
      authStore.postLogin({ email: "marko@test.com", password: "pass" }),
    ).rejects.toThrow();
  });
});

describe("AuthStore – requestPasswordReset", () => {
  it("resolves when service succeeds", async () => {
    const { authService } = await import("./auth.service");
    vi.mocked(authService.requestPasswordReset).mockResolvedValue(
      undefined as never,
    );

    await expect(
      authStore.requestPasswordReset({ email: "user@test.com" }),
    ).resolves.not.toThrow();
  });

  it("rejects when service fails", async () => {
    const { authService } = await import("./auth.service");
    vi.mocked(authService.requestPasswordReset).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(
      authStore.requestPasswordReset({ email: "user@test.com" }),
    ).rejects.toThrow();
  });
});

describe("AuthStore – setNewPassword", () => {
  it("resolves when service succeeds", async () => {
    const { authService } = await import("./auth.service");
    vi.mocked(authService.setNewPassword).mockResolvedValue(undefined as never);

    await expect(
      authStore.setNewPassword({
        password: "NewPass1!",
        token: "tok",
        email: "u@test.com",
      }),
    ).resolves.not.toThrow();
  });

  it("rejects when service fails", async () => {
    const { authService } = await import("./auth.service");
    vi.mocked(authService.setNewPassword).mockRejectedValue(
      new Error("Expired token"),
    );

    await expect(
      authStore.setNewPassword({
        password: "NewPass1!",
        token: "bad",
        email: "u@test.com",
      }),
    ).rejects.toThrow();
  });
});

describe("AuthStore – logoutUser", () => {
  // jsdom does not allow spying on window.location.replace directly;
  // stub the entire location object so the navigation call is interceptable.
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("location", { replace: mockReplace, href: "/" });
    mockReplace.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("clears authUser and authUserInfo", () => {
    runInAction(() => {
      authStore.authUser = mockAuthUser as typeof authStore.authUser;
      authStore.authUserInfo = mockUserInfo as typeof authStore.authUserInfo;
    });

    authStore.logoutUser();

    expect(authStore.authUser).toBeNull();
    expect(authStore.authUserInfo).toBeNull();
  });

  it("redirects to the login page", () => {
    authStore.logoutUser();
    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining("login"));
  });
});
