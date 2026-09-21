import to from "await-to-js";
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

import { MEMBERSHIP_INITIAL_STATE } from "./membership.constants";
import { membershipService } from "./membership.service";
import { IGetMembership, IPostMembership } from "./membership.types";

class MembershipStore implements IBaseStoreConfig<MembershipStore> {
  membershipsList: IGetMembership[] = [];
  membership: IGetMembership | IPostMembership = MEMBERSHIP_INITIAL_STATE;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterMembership(): IGetMembership | IPostMembership {
    return this.membership;
  }

  get getterMembershipsList(): IGetMembership[] {
    return this.membershipsList;
  }

  handleChange<K extends keyof MembershipStore>(
    key: K,
    value: MembershipStore[K],
  ) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  /**
   * `price_total` is derived server-side and `id` is in the path, so neither
   * belongs in a write payload — the form object carries both.
   */
  private toWritePayload(
    payload: IGetMembership | IPostMembership,
  ): IPostMembership {
    return {
      company_id: authStore.getAuthUser.company_id,
      name: payload.name,
      program: payload.program,
      months_count: payload.months_count,
      price_month: payload.price_month,
      installments_count: payload.installments_count,
      is_active: payload.is_active,
    };
  }

  getMembershipsList = async () => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.MEMBERSHIP),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.MEMBERSHIP_PAGINATION,
      ),
    };
    const [err, res] = await to<IPaginatedResponse<IGetMembership>>(
      membershipService.getMembershipsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("membershipsList", res.items);
    paginationStore.set(PaginationEnum.MEMBERSHIP_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  async getMembershipById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetMembership>(
      membershipService.getMembershipById(id),
    );
    if (err) return Promise.reject(err);
    this.handleChange("membership", res);
  }

  async createMembership(payload: IPostMembership) {
    this.isLoading = true;
    const [err, _res] = await to<IPostResponse>(
      membershipService.createMembership(this.toWritePayload(payload)),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.MEMBERSHIP_MODAL);
    void this.getMembershipsList();
  }

  async updateMembership(id: number, payload: IGetMembership) {
    this.isLoading = true;
    const [err, _res] = await to<INoContentResponse>(
      membershipService.updateMembership(id, this.toWritePayload(payload)),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.MEMBERSHIP_MODAL);
    void this.getMembershipsList();
  }
}

export const membershipStore = new MembershipStore();
