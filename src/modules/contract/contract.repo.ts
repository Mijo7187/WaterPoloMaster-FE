import { axiosMain } from "@config/axiosConfig";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { CONTRACT_ENDPOINTS } from "./contract.constants";
import {
  FContractList,
  IGetContract,
  IPostContract,
  IPutContract,
} from "./contract.types";

const getContractsList = (
  filters?: FContractList,
): IApiPaginatedResponse<IGetContract> => {
  return axiosMain.get(CONTRACT_ENDPOINTS.CONTRACT, { params: filters });
};

const getContractById = (id: number): IApiGetResponse<IGetContract> => {
  return axiosMain.get(`${CONTRACT_ENDPOINTS.CONTRACT}${id}`);
};

const createContract = (payload: IPostContract): IApiPostResponse => {
  return axiosMain.post(CONTRACT_ENDPOINTS.CONTRACT, payload);
};

const updateContract = (
  id: number,
  payload: IPutContract,
): IApiNoContentResponse => {
  return axiosMain.put(`${CONTRACT_ENDPOINTS.CONTRACT}${id}`, payload);
};

const activateContract = (id: number): IApiPostResponse => {
  return axiosMain.post(`${CONTRACT_ENDPOINTS.CONTRACT}${id}/activate`);
};

export const contractRepo = {
  getContractsList,
  getContractById,
  createContract,
  updateContract,
  activateContract,
};
