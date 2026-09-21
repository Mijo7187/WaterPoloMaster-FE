import { axiosMain } from "@config/axiosConfig";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { CONTRACT_INSTALLMENT_ENDPOINTS } from "./contractInstallment.constants";
import {
  FContractInstallmentList,
  IGetContractInstallment,
  IPostContractInstallment,
} from "./contractInstallment.types";

const getContractInstallmentsList = (
  filters?: FContractInstallmentList,
): IApiPaginatedResponse<IGetContractInstallment> => {
  return axiosMain.get(
    CONTRACT_INSTALLMENT_ENDPOINTS.CONTRACT_INSTALLMENT,
    { params: filters },
  );
};

const getContractInstallmentById = (
  id: number,
): IApiGetResponse<IGetContractInstallment> => {
  return axiosMain.get(
    `${CONTRACT_INSTALLMENT_ENDPOINTS.CONTRACT_INSTALLMENT}${id}`,
  );
};

const createContractInstallment = (
  payload: IPostContractInstallment,
): IApiPostResponse => {
  return axiosMain.post(
    CONTRACT_INSTALLMENT_ENDPOINTS.CONTRACT_INSTALLMENT,
    payload,
  );
};

const updateContractInstallment = (
  id: number,
  payload: IPostContractInstallment,
): IApiNoContentResponse => {
  return axiosMain.put(
    `${CONTRACT_INSTALLMENT_ENDPOINTS.CONTRACT_INSTALLMENT}${id}`,
    payload,
  );
};

export const contractInstallmentRepo = {
  getContractInstallmentsList,
  getContractInstallmentById,
  createContractInstallment,
  updateContractInstallment,
};
