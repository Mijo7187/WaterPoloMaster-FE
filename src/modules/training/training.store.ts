import to from "await-to-js";
import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { authStore } from "@modules/auth/auth.store";
import type { IGetUser } from "@modules/users/users.types";
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

import { TRAINING_INITIAL_STATE } from "./training.constants";
import { trainingService } from "./training.service";
import {
  FUsersNotInTraining,
  IGetTraining,
  IGetTrainingUsersList,
  IPostTraining,
  IPostTrainingUsersList,
} from "./training.types";

class TrainingStore implements IBaseStoreConfig<TrainingStore> {
  trainingsList: IGetTraining[] = [];
  training: IGetTraining | IPostTraining = TRAINING_INITIAL_STATE;
  trainingUsersList: IGetTrainingUsersList[] = [];
  usersNotInTrainingList: IGetUser[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterTraining(): IGetTraining | IPostTraining {
    return this.training;
  }

  get getterTrainingsList(): IGetTraining[] {
    return this.trainingsList;
  }

  get getterTrainingUsersList(): IGetTrainingUsersList[] {
    return this.trainingUsersList;
  }

  get getterUsersNotInTrainingList(): IGetUser[] {
    return this.usersNotInTrainingList;
  }

  handleChange<K extends keyof TrainingStore>(key: K, value: TrainingStore[K]) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  getTrainingUserByUserId(userId: number): IGetTrainingUsersList | undefined {
    return this.trainingUsersList.find((item) => item.user_id === userId);
  }

  private normalizePayload<T extends IPostTraining>(payload: T): T {
    const toDate = (v: string) =>
      /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : dayjs(v).format("YYYY-MM-DD");
    const toTime = (v: string) =>
      /^\d{2}:\d{2}:\d{2}$/.test(v) ? v : dayjs(v).format("HH:mm:ss");
    return {
      ...payload,
      training_date: toDate(payload.training_date),
      start_time: toTime(payload.start_time),
      end_time: toTime(payload.end_time),
    };
  }

  // #region General

  getTrainingsList = async () => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.TRAINING),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TRAINING_PAGINATION,
      ),
      order_by: "training_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTraining>>(
      trainingService.getTrainingsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("trainingsList", res.items);
  };

  async getTrainingById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetTraining>(
      trainingService.getTrainingById(id),
    );
    if (err) return Promise.reject(err);
    this.handleChange("training", res);
  }

  async createTraining(payload: IPostTraining) {
    this.isLoading = true;
    const normalized = this.normalizePayload({
      ...payload,
      company_id: authStore.getAuthUser.company_id,
    });
    const [err, _res] = await to<IPostResponse>(
      trainingService.createTraining(normalized),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.TRAINING_MODAL);
    void this.getTrainingsList();
  }

  async updateTraining(id: number, payload: IGetTraining) {
    this.isLoading = true;
    const normalized = this.normalizePayload(payload);
    const [err, _res] = await to<INoContentResponse>(
      trainingService.updateTraining(id, normalized),
    );
    if (err) return Promise.reject(err);
    this.handleChange("training", normalized);
  }

  // #endregion General

  // #region User

  getTrainingsListByUserId = async (userId: number) => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.TRAINING),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TRAINING_PAGINATION,
      ),
      user_id: userId,
      order_by: "training_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTraining>>(
      trainingService.getTrainingsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("trainingsList", res.items);
  };

  getTrainingsListByCompanyId = async (companyId: number) => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.TRAINING),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TRAINING_PAGINATION,
      ),
      company_id: companyId,
      order_by: "training_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTraining>>(
      trainingService.getTrainingsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("trainingsList", res.items);
  };

  getTrainingsListByPoolId = async (poolId: number) => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.TRAINING),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TRAINING_PAGINATION,
      ),
      pool_id: poolId,
      order_by: "training_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTraining>>(
      trainingService.getTrainingsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("trainingsList", res.items);
  };

  getTrainingsListByQuarterId = async (quarterId: number) => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.TRAINING),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TRAINING_PAGINATION,
      ),
      quarter_id: quarterId,
      order_by: "training_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTraining>>(
      trainingService.getTrainingsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("trainingsList", res.items);
  };

  getTrainingUsersList = async () => {
    this.isLoading = true;
    const filters = {
      training_id: (this.training as IGetTraining).id,
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.USER_PAGINATION,
      ),
    };
    const [err, res] = await to<IPaginatedResponse<IGetTrainingUsersList>>(
      trainingService.getAllTrainingUsersList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("trainingUsersList", res.items);
    paginationStore.set(PaginationEnum.USER_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  getUsersNotInTraining = async (training_id: number, company_id: number) => {
    const filters: FUsersNotInTraining = { training_id, company_id };
    const [err, res] = await to<{ items: IGetUser[] }>(
      trainingService.getUsersNotInTraining(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("usersNotInTrainingList", res.items);
  };

  addUserToTraining = async (payload: IPostTrainingUsersList) => {
    const [err] = await to<IPostResponse>(
      trainingService.createTrainingUsersList(payload),
    );
    if (err) return Promise.reject(err);
    void this.getTrainingUsersList();
    void this.getUsersNotInTraining(
      payload.training_id,
      authStore.getAuthUser.company_id,
    );
  };

  removeUserFromTraining = async (id: number, trainingId: number) => {
    const [err] = await to<INoContentResponse>(
      trainingService.deleteTrainingUsersList(id),
    );
    if (err) return Promise.reject(err);
    void this.getTrainingUsersList();
    void this.getUsersNotInTraining(
      trainingId,
      authStore.getAuthUser.company_id,
    );
  };

  // #endregion User
}

export const trainingStore = new TrainingStore();
