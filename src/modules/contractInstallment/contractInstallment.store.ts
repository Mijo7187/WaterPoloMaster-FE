import to from "await-to-js";
import { makeAutoObservable } from "mobx";
import {
  IBaseStoreConfig,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
  PaginationEnum,
  paginationStore,
} from "@stores";

import { CONTRACT_INSTALLMENT_INITIAL_STATE } from "./contractInstallment.constants";
import { contractInstallmentService } from "./contractInstallment.service";
import {
  IGetContractInstallment,
  IPostContractInstallment,
} from "./contractInstallment.types";

class ContractInstallmentStore
  implements IBaseStoreConfig<ContractInstallmentStore>
{
  contractInstallmentsList: IGetContractInstallment[] = [];
  contractInstallment: IGetContractInstallment | IPostContractInstallment =
    CONTRACT_INSTALLMENT_INITIAL_STATE;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterContractInstallment():
    | IGetContractInstallment
    | IPostContractInstallment {
    return this.contractInstallment;
  }

  get getterContractInstallmentsList(): IGetContractInstallment[] {
    return this.contractInstallmentsList;
  }

  handleChange<K extends keyof ContractInstallmentStore>(
    key: K,
    value: ContractInstallmentStore[K],
  ) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  getContractInstallmentsListByContractId = async (contractId: number) => {
    this.isLoading = true;
    const filters = {
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.CONTRACT_INSTALLMENT_PAGINATION,
      ),
      contract_id: contractId,
    };
    const [err, res] = await to<IPaginatedResponse<IGetContractInstallment>>(
      contractInstallmentService.getContractInstallmentsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("contractInstallmentsList", res.items);
    paginationStore.set(
      PaginationEnum.CONTRACT_INSTALLMENT_PAGINATION,
      res.pagination,
    );
    this.isLoading = false;
  };

  async getContractInstallmentById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetContractInstallment>(
      contractInstallmentService.getContractInstallmentById(id),
    );
    if (err) return Promise.reject(err);
    this.handleChange("contractInstallment", res);
  }

  async createContractInstallment(payload: IPostContractInstallment) {
    this.isLoading = true;
    const [err, _res] = await to<IPostResponse>(
      contractInstallmentService.createContractInstallment(payload),
    );
    if (err) return Promise.reject(err);
    if (payload.contract_id) {
      void this.getContractInstallmentsListByContractId(payload.contract_id);
    }
  }

  async updateContractInstallment(
    id: number,
    payload: IGetContractInstallment,
  ) {
    this.isLoading = true;
    const [err, _res] = await to<INoContentResponse>(
      contractInstallmentService.updateContractInstallment(id, payload),
    );
    if (err) return Promise.reject(err);
    this.handleChange("contractInstallment", payload);
    if (payload.contract_id) {
      void this.getContractInstallmentsListByContractId(payload.contract_id);
    }
  }
}

export const contractInstallmentStore = new ContractInstallmentStore();
