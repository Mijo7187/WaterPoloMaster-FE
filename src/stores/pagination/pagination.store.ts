import { makeAutoObservable, runInAction } from "mobx";
import { computedFn } from "mobx-utils";

import { PAGINATION_INITIAL_STATE } from "./pagination.constants";
import {
  IGetPagination,
  IPostPagination,
  PaginationEnum,
} from "./pagination.types";

class PaginationStore {
  params: Record<PaginationEnum, IGetPagination> = {
    [PaginationEnum.USER_PAGINATION]: PAGINATION_INITIAL_STATE,
    [PaginationEnum.COMPANY_PAGINATION]: PAGINATION_INITIAL_STATE,
    [PaginationEnum.SIFARNICI_PAGINATION]: PAGINATION_INITIAL_STATE,
    [PaginationEnum.TRAINING_PAGINATION]: PAGINATION_INITIAL_STATE,
    [PaginationEnum.PAYMENT_PAGINATION]: PAGINATION_INITIAL_STATE,
    [PaginationEnum.QUARTER_PAGINATION]: PAGINATION_INITIAL_STATE,
    [PaginationEnum.TOURNAMENT_PAGINATION]: PAGINATION_INITIAL_STATE,
  };

  constructor() {
    makeAutoObservable(this, { get: false });
  }

  get = computedFn(function (
    this: PaginationStore,
    key: PaginationEnum,
  ): IGetPagination {
    return this.params[key];
  });

  set(key: PaginationEnum, value: IPostPagination) {
    runInAction(() => {
      this.params[key] = {
        ...PAGINATION_INITIAL_STATE,
        ...this.params[key],
        ...value,
      };
    });
  }

  getRequestPaginationParams(key: PaginationEnum): IPostPagination {
    const params = this.get(key);
    return {
      page: params.page,
      size: params.size,
    };
  }

  setFromResponse(key: PaginationEnum, pagination: IGetPagination) {
    runInAction(() => {
      this.params[key] = pagination;
    });
  }

  resetPage(key: PaginationEnum) {
    runInAction(() => {
      this.params[key].page = 1;
    });
  }

  updateField(key: PaginationEnum, field: keyof IGetPagination, value: number) {
    runInAction(() => {
      this.params[key][field] = value;
    });
  }

  remove(key: PaginationEnum) {
    runInAction(() => {
      this.params[key] = PAGINATION_INITIAL_STATE;
    });
  }

  setTotal(key: PaginationEnum, total: number) {
    this.params[key].total = total;
  }
}

export const paginationStore = new PaginationStore();
