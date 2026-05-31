import { runInAction } from "mobx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modalStore } from "@stores/modal/modal.store";
import { ModalTypeEnum } from "@stores/modal/modal.types";

import { COMPANY_INITIAL_STATE } from "./company.constants";
import { companyStore } from "./company.store";
import { CompanyTypeEnum } from "./company.types";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("./company.service", () => ({
  companyService: {
    getCompanies: vi.fn(),
    getCompanyById: vi.fn(),
    createCompany: vi.fn(),
    updateCompany: vi.fn(),
  },
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockCountry = {
  id: 1,
  name: "Srbija",
  is_active: true,
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};

const mockCompany = {
  id: 1,
  name: "Plivački Klub Beograd",
  address: "Cara Dušana 1",
  phone_number: "011-123-456",
  email: "pk@beograd.com",
  company_type: CompanyTypeEnum.CLUB,
  city_id: "1",
  country_id: "1",
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
  city: {
    id: 1,
    name: "Beograd",
    country_id: "1",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    country: mockCountry,
  },
  country: mockCountry,
};

const mockPaginatedResponse = {
  items: [mockCompany],
  pagination: { page: 1, size: 50, total: 1, pages: 1 },
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  runInAction(() => {
    companyStore.companiesList = [];
    companyStore.company = COMPANY_INITIAL_STATE;
    companyStore.isLoading = false;
  });
  modalStore.removeAllModals();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("CompanyStore – initial state", () => {
  it("starts with empty companiesList", () => {
    expect(companyStore.companiesList).toEqual([]);
  });

  it("starts with COMPANY_INITIAL_STATE for company", () => {
    expect(companyStore.company).toEqual(COMPANY_INITIAL_STATE);
  });

  it("starts with isLoading false", () => {
    expect(companyStore.isLoading).toBe(false);
  });
});

describe("CompanyStore – getters", () => {
  it("getterCompany reflects current company", () => {
    runInAction(() => {
      companyStore.company = mockCompany;
    });
    expect(companyStore.getterCompany).toEqual(mockCompany);
  });

  it("getterCompaniesList reflects current list", () => {
    runInAction(() => {
      companyStore.companiesList = [mockCompany];
    });
    expect(companyStore.getterCompaniesList).toHaveLength(1);
    expect(companyStore.getterCompaniesList[0].name).toBe(
      "Plivački Klub Beograd",
    );
  });
});

describe("CompanyStore – handleChange", () => {
  it("updates isLoading", () => {
    companyStore.handleChange("isLoading", true);
    expect(companyStore.isLoading).toBe(true);
  });

  it("updates companiesList", () => {
    companyStore.handleChange("companiesList", [mockCompany]);
    expect(companyStore.companiesList).toHaveLength(1);
  });
});

describe("CompanyStore – getCompanies", () => {
  it("sets companiesList to the items from response", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.getCompanies).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    await companyStore.getCompanies();

    expect(companyStore.companiesList).toEqual([mockCompany]);
  });

  it("passes filters to the service", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.getCompanies).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    const filters = { name__ilike: "Beograd" };
    await companyStore.getCompanies(filters);

    expect(companyService.getCompanies).toHaveBeenCalledWith(filters);
  });

  it("rejects on service error", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.getCompanies).mockRejectedValue(
      new Error("Server error"),
    );

    await expect(companyStore.getCompanies()).rejects.toThrow();
  });
});

describe("CompanyStore – getCompanyById", () => {
  it("sets company on success", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.getCompanyById).mockResolvedValue(
      mockCompany as never,
    );

    await companyStore.getCompanyById(1);

    expect(companyStore.company).toEqual(mockCompany);
  });

  it("rejects on service error", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.getCompanyById).mockRejectedValue(
      new Error("Not found"),
    );

    await expect(companyStore.getCompanyById(999)).rejects.toThrow();
  });
});

describe("CompanyStore – createCompany", () => {
  it("clears COMPANY_MODAL and refreshes list on success", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.createCompany).mockResolvedValue(1 as never);
    vi.mocked(companyService.getCompanies).mockResolvedValue(
      mockPaginatedResponse as never,
    );

    modalStore.openModal(ModalTypeEnum.COMPANY_MODAL);
    await companyStore.createCompany(mockCompany);

    expect(
      modalStore.getterModalListNames.includes(ModalTypeEnum.COMPANY_MODAL),
    ).toBe(false);
  });

  it("rejects on service error", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.createCompany).mockRejectedValue(
      new Error("Duplicate name"),
    );

    await expect(companyStore.createCompany(mockCompany)).rejects.toThrow();
  });
});

describe("CompanyStore – updateCompany", () => {
  it("updates company state on success", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.updateCompany).mockResolvedValue(true as never);

    const updated = { ...mockCompany, name: "Updated Club" };
    await companyStore.updateCompany(1, updated);

    expect(companyStore.company).toEqual(updated);
  });

  it("rejects on service error", async () => {
    const { companyService } = await import("./company.service");
    vi.mocked(companyService.updateCompany).mockRejectedValue(
      new Error("Update failed"),
    );

    await expect(companyStore.updateCompany(1, mockCompany)).rejects.toThrow();
  });
});
