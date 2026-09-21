import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { contractRepo } from "./contract.repo";
import type {
  FContractList,
  IGetContract,
  IPostContract,
  IPutContract,
} from "./contract.types";

class ContractService {
  getContractsList = (
    filters?: FContractList,
  ): IApiPaginatedResponse<IGetContract> => {
    return contractRepo.getContractsList(filters);
  };

  getContractById = (id: number): IApiGetResponse<IGetContract> => {
    return contractRepo.getContractById(id);
  };

  createContract = (payload: IPostContract): IApiPostResponse => {
    return contractRepo.createContract(payload);
  };

  updateContract = (
    id: number,
    payload: IPutContract,
  ): IApiNoContentResponse => {
    return contractRepo.updateContract(id, payload);
  };

  activateContract = (id: number): IApiPostResponse => {
    return contractRepo.activateContract(id);
  };
}

export const contractService = new ContractService();
