import { makeAutoObservable, runInAction } from "mobx";
import { computedFn } from "mobx-utils";

import { PAGINATION_INITIAL_STATE } from "./pagination.constants";
import {
  IGetPagination,
  IPostPagination,
  PaginationEnum,
} from "./pagination.types";

class PaginationStore {
  params: Partial<Record<PaginationEnum, IGetPagination>> = {};

  constructor() {
    makeAutoObservable(this);
  }

  get = computedFn(function (
    this: PaginationStore,
    key: PaginationEnum,
  ): IGetPagination | null {
    return this.params[key] ?? null;
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
    const params = this.params[key];
    return {
      page: params?.page ?? PAGINATION_INITIAL_STATE.page,
      size: params?.size ?? PAGINATION_INITIAL_STATE.size,
    };
  }

  setFromResponse(key: PaginationEnum, pagination: IGetPagination) {
    runInAction(() => {
      this.params[key] = pagination;
    });
  }

  resetPage(key: PaginationEnum) {
    runInAction(() => {
      if (this.params[key]) {
        this.params[key].page = 1;
      }
    });
  }

  updateField(key: PaginationEnum, field: keyof IGetPagination, value: number) {
    runInAction(() => {
      if (this.params[key]) {
        this.params[key][field] = value;
      }
    });
  }

  increaseTotalRecords(key: PaginationEnum) {
    runInAction(() => {
      const current = this.params[key];
      if (current) {
        current.total = (current.total || 0) + 1;
      }
    });
  }

  decreaseTotalRecords(key: PaginationEnum) {
    runInAction(() => {
      const current = this.params[key];
      if (current && current.total > 0) {
        current.total -= 1;
      }
    });
  }

  remove(key: PaginationEnum) {
    runInAction(() => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.params[key];
    });
  }
}

export const paginationStore = new PaginationStore();
