import to from "await-to-js";
import { makeAutoObservable } from "mobx";
import { authStore } from "@modules/auth/auth.store";
import {
  IBaseStoreConfig,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
  modalStore,
  ModalTypeEnum,
  PaginationEnum,
  paginationStore,
} from "@stores";

import { QUARTER_INITIAL_STATE } from "./quarter.constants";
import { quarterService } from "./quarter.service";
import {
  IGetQuarter,
  IGetQuarterUsersList,
  IPostQuarter,
  IPostQuarterUsersList,
} from "./quarter.types";

class QuarterStore implements IBaseStoreConfig<QuarterStore> {
  quartersList: IGetQuarter[] = [];
  quarter: IGetQuarter | IPostQuarter = QUARTER_INITIAL_STATE;
  quarterUsersList: IGetQuarterUsersList[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterQuarter(): IGetQuarter | IPostQuarter {
    return this.quarter;
  }

  get getterQuartersList(): IGetQuarter[] {
    return this.quartersList;
  }

  get getterQuarterUsersList(): IGetQuarterUsersList[] {
    return this.quarterUsersList;
  }

  handleChange<K extends keyof QuarterStore>(key: K, value: QuarterStore[K]) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  // #region General

  getQuartersList = async () => {
    this.isLoading = true;
    const filters = {
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.QUARTER_PAGINATION,
      ),
      order_by: "year",
    };
    const [err, res] = await to<IPaginatedResponse<IGetQuarter>>(
      quarterService.getQuartersList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("quartersList", res.items);
  };

  async getQuarterById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetQuarter>(quarterService.getQuarterById(id));
    if (err) return Promise.reject(err);
    this.handleChange("quarter", res);
  }

  async createQuarter(payload: IPostQuarter) {
    this.isLoading = true;
    const [err, _res] = await to<IPostResponse>(
      quarterService.createQuarter({
        ...payload,
        company_id: authStore.getAuthUser.company_id,
      }),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.QUARTER_MODAL);
    void this.getQuartersList();
  }

  async updateQuarter(id: number, payload: IGetQuarter) {
    this.isLoading = true;
    const [err, _res] = await to<INoContentResponse>(
      quarterService.updateQuarter(id, payload),
    );
    if (err) return Promise.reject(err);
    this.handleChange("quarter", payload);
  }

  // #endregion General

  // #region User

  getQuarterUsersList = async () => {
    this.isLoading = true;
    const filters = {
      quarter_id: (this.quarter as IGetQuarter).id,
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.USER_PAGINATION,
      ),
    };
    const [err, res] = await to<IPaginatedResponse<IGetQuarterUsersList>>(
      quarterService.getAllQuarterUsersList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("quarterUsersList", res.items);
    paginationStore.set(PaginationEnum.USER_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  addUserToQuarter = async (payload: IPostQuarterUsersList) => {
    const [err] = await to<IPostResponse>(
      quarterService.createQuarterUsersList(payload),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.QUARTER_ADD_USER_MODAL);
    void this.getQuarterUsersList();
  };

  removeUserFromQuarter = async (id: number) => {
    const [err] = await to<INoContentResponse>(
      quarterService.deleteQuarterUsersList(id),
    );
    if (err) return Promise.reject(err);
    void this.getQuarterUsersList();
  };

  // #endregion User
}

export const quarterStore = new QuarterStore();
