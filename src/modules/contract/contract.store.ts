import to from "await-to-js";
import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { authStore } from "@modules/auth/auth.store";
import {
  FilterGroupsEnum,
  IBaseStoreConfig,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
  modalStore,
  ModalTypeEnum,
  PaginationEnum,
  paginationStore,
} from "@stores";
import { filtersStore } from "@stores/filters/filters.store";
import { sumInstallments } from "@utils/contractHelpers";

import { CONTRACT_INITIAL_STATE } from "./contract.constants";
import { contractService } from "./contract.service";
import {
  ContractTypeEnum,
  IGetContract,
  IPostContract,
  IPutContract,
} from "./contract.types";

class ContractStore implements IBaseStoreConfig<ContractStore> {
  contractsList: IGetContract[] = [];
  contract: IGetContract | IPostContract = CONTRACT_INITIAL_STATE;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterContract(): IGetContract | IPostContract {
    return this.contract;
  }

  get getterContractsList(): IGetContract[] {
    return this.contractsList;
  }

  handleChange<K extends keyof ContractStore>(key: K, value: ContractStore[K]) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  private toDate(value?: string | null): string | null {
    if (!value) return null;
    return /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? value
      : dayjs(value).format("YYYY-MM-DD");
  }

  /**
   * Built field by field rather than spread: the form object also carries `id`
   * and the nested read models, none of which POST /contract accepts.
   *
   * MEMBERSHIP: the installment rows are the source of truth — `start_date`,
   * `end_date` and `amount` are re-derived from them so the three can never
   * disagree with the schedule the backend validates against.
   *
   * STAFF: installments come from the monthly salary job and a membership
   * means nothing, so both are stripped.
   *
   * `program` is deliberately absent — `contract` has no such column; it lives
   * on the membership the contract points at.
   */
  private normalizeCreatePayload(payload: IPostContract): IPostContract {
    const normalized: IPostContract = {
      company_id: authStore.getAuthUser.company_id,
      user_id: payload.user_id,
      contract_type: payload.contract_type,
      membership_id: payload.membership_id ?? null,
      start_date: this.toDate(payload.start_date) ?? "",
      end_date: this.toDate(payload.end_date),
      amount: payload.amount ?? null,
      status: payload.status,
      signed_at: this.toDate(payload.signed_at),
    };
    if (normalized.contract_type === ContractTypeEnum.STAFF) {
      delete normalized.membership_id;
      return normalized;
    }
    const installments = (payload.installments_list ?? []).map((row) => ({
      period_start: this.toDate(row.period_start) ?? "",
      period_end: this.toDate(row.period_end) ?? "",
      due_date: this.toDate(row.due_date) ?? "",
      amount: row.amount ?? 0,
    }));
    normalized.installments_list = installments;
    if (installments.length) {
      normalized.start_date = installments[0].period_start;
      normalized.end_date = installments[installments.length - 1].period_end;
      normalized.amount = sumInstallments(installments);
    }
    return normalized;
  }

  /** PUT accepts only these four fields — see IPutContract. */
  private toUpdatePayload(payload: IGetContract | IPutContract): IPutContract {
    return {
      end_date: this.toDate(payload.end_date),
      amount: payload.amount,
      status: payload.status,
      signed_at: this.toDate(payload.signed_at),
    };
  }

  getContractsList = async () => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.CONTRACT),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.CONTRACT_PAGINATION,
      ),
    };
    const [err, res] = await to<IPaginatedResponse<IGetContract>>(
      contractService.getContractsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("contractsList", res.items);
    paginationStore.set(PaginationEnum.CONTRACT_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  getContractsListByUserId = async (userId: number) => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.CONTRACT),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.CONTRACT_PAGINATION,
      ),
      user_id: userId,
    };
    const [err, res] = await to<IPaginatedResponse<IGetContract>>(
      contractService.getContractsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("contractsList", res.items);
    paginationStore.set(PaginationEnum.CONTRACT_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  getContractsListBySeasonId = async (seasonId: number) => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.CONTRACT),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.CONTRACT_PAGINATION,
      ),
      season_id: seasonId,
    };
    const [err, res] = await to<IPaginatedResponse<IGetContract>>(
      contractService.getContractsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("contractsList", res.items);
    paginationStore.set(PaginationEnum.CONTRACT_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  getContractsListByCompanyId = async (companyId: number) => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.CONTRACT),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.CONTRACT_PAGINATION,
      ),
      company_id: companyId,
    };
    const [err, res] = await to<IPaginatedResponse<IGetContract>>(
      contractService.getContractsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("contractsList", res.items);
    paginationStore.set(PaginationEnum.CONTRACT_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  async getContractById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetContract>(
      contractService.getContractById(id),
    );
    if (err) return Promise.reject(err);
    this.handleChange("contract", res);
    this.isLoading = false;
  }

  async createContract(payload: IPostContract) {
    this.isLoading = true;
    const [err, _res] = await to<IPostResponse>(
      contractService.createContract(this.normalizeCreatePayload(payload)),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.CONTRACT_MODAL);
    void this.getContractsList();
  }

  async updateContract(id: number, payload: IGetContract | IPutContract) {
    this.isLoading = true;
    const [err, _res] = await to<INoContentResponse>(
      contractService.updateContract(id, this.toUpdatePayload(payload)),
    );
    if (err) return Promise.reject(err);
    void this.getContractById(id);
  }

  /** Edit from the list modal — closes it and refreshes the list instead of the single contract. */
  async updateContractFromList(
    id: number,
    payload: IGetContract | IPutContract,
  ) {
    this.isLoading = true;
    const [err, _res] = await to<INoContentResponse>(
      contractService.updateContract(id, this.toUpdatePayload(payload)),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.CONTRACT_MODAL);
    this.handleChange("contract", CONTRACT_INITIAL_STATE);
    void this.getContractsList();
  }

  activateContract = async (id: number) => {
    this.isLoading = true;
    const [err] = await to<IPostResponse>(contractService.activateContract(id));
    if (err) return Promise.reject(err);
    void this.getContractById(id);
    void this.getContractsList();
  };
}

export const contractStore = new ContractStore();
