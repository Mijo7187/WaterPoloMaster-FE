import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { companyRepo } from "./company.repo";
import type { IGetCompany, IPostCompany } from "./company.types";

class CompanyService {
  getCompanies = (filters?: object): IApiPaginatedResponse<IGetCompany> => {
    return companyRepo.getCompanies(filters);
  };

  getCompanyById = (id: number): IApiGetResponse<IGetCompany> => {
    return companyRepo.getCompanyById(id);
  };

  createCompany = (payload: IPostCompany): IApiPostResponse => {
    return companyRepo.createCompany(payload);
  };

  updateCompany = (
    id: number,
    payload: IPostCompany,
  ): IApiNoContentResponse => {
    return companyRepo.updateCompany(id, payload);
  };
}

export const companyService = new CompanyService();
