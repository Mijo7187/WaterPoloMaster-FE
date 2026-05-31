import to from "await-to-js";
import { makeAutoObservable } from "mobx";
import {
  IBaseStoreConfig,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
  modalStore,
  ModalTypeEnum,
} from "@stores";

import { COMPANY_INITIAL_STATE } from "./company.constants";
import { companyService } from "./company.service";
import { IGetCompany, IPostCompany } from "./company.types";

class CompanyStore implements IBaseStoreConfig<CompanyStore> {
  companiesList: IGetCompany[] = [];
  company: IGetCompany | IPostCompany = COMPANY_INITIAL_STATE;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterCompany(): IGetCompany | IPostCompany {
    return this.company;
  }

  get getterCompaniesList(): IGetCompany[] {
    return this.companiesList;
  }

  handleChange<K extends keyof CompanyStore>(key: K, value: CompanyStore[K]) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  getCompanies = async (filters?: object) => {
    this.isLoading = true;
    const [err, res] = await to<IPaginatedResponse<IGetCompany>>(
      companyService.getCompanies(filters),
    );
    if (err) return Promise.reject(err);
    // this.handleChange("companiesList", res as unknown as IGetCompany[]);
    this.handleChange("companiesList", res.items);
  };

  async getCompanyById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetCompany>(companyService.getCompanyById(id));
    if (err) return Promise.reject(err);

    this.handleChange("company", res);
  }

  async createCompany(payload: IPostCompany) {
    this.isLoading = true;
    const [err, _res] = await to<IPostResponse>(
      companyService.createCompany(payload),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.COMPANY_MODAL);
    void this.getCompanies();
  }

  async updateCompany(id: number, payload: IGetCompany) {
    this.isLoading = true;
    const [err, _res] = await to<INoContentResponse>(
      companyService.updateCompany(id, payload),
    );
    if (err) return Promise.reject(err);
    this.handleChange("company", payload);
  }
}

export const companyStore = new CompanyStore();
