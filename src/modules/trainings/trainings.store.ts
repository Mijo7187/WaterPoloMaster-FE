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
} from "@stores";

import { TRAINING_INITIAL_STATE } from "./trainings.constants";
import { trainingsService } from "./trainings.service";
import { IGetTraining, IPostTraining } from "./trainings.types";

class TrainingsStore implements IBaseStoreConfig<TrainingsStore> {
  trainingsList: IGetTraining[] = [];
  training: IGetTraining | IPostTraining = TRAINING_INITIAL_STATE;
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

  handleChange<K extends keyof TrainingsStore>(
    key: K,
    value: TrainingsStore[K],
  ) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  getTrainingsList = async (filters?: object) => {
    this.isLoading = true;
    const [err, res] = await to<IPaginatedResponse<IGetTraining>>(
      trainingsService.getTrainingsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("trainingsList", res as unknown as IGetTraining[]);
  };

  async getTrainingById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetTraining>(
      trainingsService.getTrainingById(id),
    );
    if (err) return Promise.reject(err);
    this.handleChange("training", res);
  }

  async createTraining(payload: IPostTraining) {
    this.isLoading = true;
    const [err, _res] = await to<IPostResponse>(
      trainingsService.createTraining({
        ...payload,
        company_id: authStore.getAuthUser.company_id,
      }),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.TRAINING_MODAL);
    void this.getTrainingsList();
  }

  async updateTraining(id: number, payload: IGetTraining) {
    this.isLoading = true;
    const [err, _res] = await to<INoContentResponse>(
      trainingsService.updateTraining(id, payload),
    );
    if (err) return Promise.reject(err);
    this.handleChange("training", payload);
  }
}

export const trainingsStore = new TrainingsStore();
