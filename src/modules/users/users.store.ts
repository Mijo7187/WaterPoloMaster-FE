import to from "await-to-js";
import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import {
  FilterGroupsEnum,
  FiltersWithPagination,
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

import { USER_INITIAL_STATE } from "./users.constants";
import { usersService } from "./users.service";
import { FUser, IGetUser, IPostUser } from "./users.types";

class UsersStore implements IBaseStoreConfig<UsersStore> {
  usersList: IGetUser[] = [];
  user: IGetUser | IPostUser = USER_INITIAL_STATE;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterUser(): IGetUser | IPostUser {
    return this.user;
  }

  get getterUsersList(): IGetUser[] {
    return this.usersList;
  }

  handleChange<K extends keyof UsersStore>(key: K, value: UsersStore[K]) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  getAllUsers = async () => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.USERS),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.USER_PAGINATION,
      ),
    } as FiltersWithPagination<FUser>;

    const [err, res] = await to<IPaginatedResponse<IGetUser>>(
      usersService.getAllUsers(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("usersList", [...res.items]);
    paginationStore.set(PaginationEnum.USER_PAGINATION, res.pagination);
  };

  async getUserById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetUser>(usersService.getUserById(id));
    if (err) return Promise.reject(err);
    this.handleChange("user", {
      ...res,
      date_of_birth: dayjs(res.date_of_birth),
    });
  }

  async createUser(payload: IPostUser) {
    this.isLoading = true;
    const [err, _res] = await to<IPostResponse>(
      usersService.createUser(payload),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.USER_MODAL);
    void this.getAllUsers();
  }

  async updateUser(id: number, payload: IGetUser) {
    this.isLoading = true;
    const [err, _res] = await to<INoContentResponse>(
      usersService.updateUser(id, payload),
    );
    if (err) return Promise.reject(err);
    this.handleChange("user", payload);
  }
}

export const usersStore = new UsersStore();
