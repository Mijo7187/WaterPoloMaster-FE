import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { contractInstallmentRepo } from "./contractInstallment.repo";
import type {
  FContractInstallmentList,
  IGetContractInstallment,
  IPostContractInstallment,
} from "./contractInstallment.types";

class ContractInstallmentService {
  getContractInstallmentsList = (
    filters?: FContractInstallmentList,
  ): IApiPaginatedResponse<IGetContractInstallment> => {
    return contractInstallmentRepo.getContractInstallmentsList(filters);
  };

  getContractInstallmentById = (
    id: number,
  ): IApiGetResponse<IGetContractInstallment> => {
    return contractInstallmentRepo.getContractInstallmentById(id);
  };

  createContractInstallment = (
    payload: IPostContractInstallment,
  ): IApiPostResponse => {
    return contractInstallmentRepo.createContractInstallment(payload);
  };

  updateContractInstallment = (
    id: number,
    payload: IPostContractInstallment,
  ): IApiNoContentResponse => {
    return contractInstallmentRepo.updateContractInstallment(id, payload);
  };
}

export const contractInstallmentService = new ContractInstallmentService();
