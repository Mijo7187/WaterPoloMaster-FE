import { axiosMain } from "@config/axiosConfig";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { IGetCompany, IPostCompany } from "./company.types";

const COMPANY_ENDPOINTS = {
  COMPANY: "/company/",
};

const getCompanies = (filters?: object): IApiPaginatedResponse<IGetCompany> => {
  return axiosMain.get(COMPANY_ENDPOINTS.COMPANY, { params: filters });
};

const getCompanyById = (id: number): IApiGetResponse<IGetCompany> => {
  return axiosMain.get(`${COMPANY_ENDPOINTS.COMPANY}${id}`);
};

const createCompany = (payload: IPostCompany): IApiPostResponse => {
  return axiosMain.post(COMPANY_ENDPOINTS.COMPANY, payload);
};

const updateCompany = (
  id: number,
  payload: IPostCompany,
): IApiNoContentResponse => {
  return axiosMain.put(`${COMPANY_ENDPOINTS.COMPANY}${id}`, payload);
};

export const companyRepo = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
};
