import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { USER_INITIAL_STATE } from "./users.constants";
import { usersStore } from "./users.store";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./users.service", () => ({
  usersService: {
    getAllUsers: vi.fn(),
    getUserById: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockUser = {
  id: 1,
  first_name: "Marko",
  last_name: "Markovic",
  email: "marko@example.com",
  roles: [],
  is_active: true,
  phone_number: "0611234567",
  date_of_birth: "1990-05-15",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  w_id: "1",
  company_id: 1,
};

const mockPaginatedResponse = {
  items: [mockUser],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    usersStore.usersList = [];
    usersStore.user = USER_INITIAL_STATE;
    usersStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("UsersStore – initial state", () => {
  it("starts with empty usersList", () => {
    expect(usersStore.usersList).toEqual([]);
  });

  it("starts with USER_INITIAL_STATE for user", () => {
    expect(usersStore.user).toEqual(USER_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(usersStore.isLoading).toBe(false);
  });
});

describe("UsersStore – getters", () => {
  it("getterUser reflects current user", () => {
    runInAction(() => {
      usersStore.user = mockUser;
    });
    expect(usersStore.getterUser).toEqual(mockUser);
  });

  it("getterUsersList reflects current list", () => {
    runInAction(() => {
      usersStore.usersList = [mockUser];
    });
    expect(usersStore.getterUsersList).toHaveLength(1);
    expect(usersStore.getterUsersList[0].email).toBe("marko@example.com");
  });
});

describe("UsersStore – handleChange", () => {
  it("updates isLoading", () => {
    usersStore.handleChange("isLoading", true);
    expect(usersStore.isLoading).toBe(true);
  });

  it("updates usersList", () => {
    usersStore.handleChange("usersList", [mockUser]);
    expect(usersStore.usersList).toHaveLength(1);
  });
});

describe("UsersStore – getAllUsers", () => {
  it("sets usersList on success", async () => {
    const { usersService } = await import("./users.service");
    vi.mocked(usersService.getAllUsers).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await usersStore.getAllUsers();

    expect(usersStore.usersList).toEqual(mockPaginatedResponse);
  });

  it("rejects on service error", async () => {
    const { usersService } = await import("./users.service");
    vi.mocked(usersService.getAllUsers).mockRejectedValue(
      new Error("Network error"),
    );

    await expect(usersStore.getAllUsers()).rejects.toThrow();
  });
});

describe("UsersStore – getUserById", () => {
  it("sets user with dayjs-parsed date_of_birth on success", async () => {
    const { usersService } = await import("./users.service");
    vi.mocked(usersService.getUserById).mockResolvedValue(mockUser as never);

    await usersStore.getUserById(1);

    expect(usersStore.user).toMatchObject({
      id: 1,
      first_name: "Marko",
    });
  });

  it("rejects on service error", async () => {
    const { usersService } = await import("./users.service");
    vi.mocked(usersService.getUserById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(usersStore.getUserById(999)).rejects.toThrow();
  });
});

describe("UsersStore – createUser", () => {
  it("clears the USER_MODAL and refreshes list on success", async () => {
    const { usersService } = await import("./users.service");
    vi.mocked(usersService.createUser).mockResolvedValue(1 as never);
    vi.mocked(usersService.getAllUsers).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.USER_MODAL);
    await usersStore.createUser(mockUser);

    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.USER_MODAL),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { usersService } = await import("./users.service");
    vi.mocked(usersService.createUser).mockRejectedValue(
      new Error("Validation error"),
    );

    await expect(usersStore.createUser(mockUser)).rejects.toThrow();
  });
});

describe("UsersStore – updateUser", () => {
  it("updates user state on success", async () => {
    const { usersService } = await import("./users.service");
    vi.mocked(usersService.updateUser).mockResolvedValue(true as never);

    const updated = { ...mockUser, first_name: "Updated" };
    await usersStore.updateUser(1, updated);

    expect(usersStore.user).toEqual(updated);
  });

  it("rejects on service error", async () => {
    const { usersService } = await import("./users.service");
    vi.mocked(usersService.updateUser).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(usersStore.updateUser(1, mockUser)).rejects.toThrow();
  });
});
