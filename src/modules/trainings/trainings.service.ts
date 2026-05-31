import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { trainingsRepo } from "./trainings.repo";
import type { IGetTraining, IPostTraining } from "./trainings.types";

class TrainingsService {
  getTrainingsList = (
    filters?: object,
  ): IApiPaginatedResponse<IGetTraining> => {
    return trainingsRepo.getTrainingsList(filters);
  };

  getTrainingById = (id: number): IApiGetResponse<IGetTraining> => {
    return trainingsRepo.getTrainingById(id);
  };

  createTraining = (payload: IPostTraining): IApiPostResponse => {
    return trainingsRepo.createTraining(payload);
  };

  updateTraining = (
    id: number,
    payload: IPostTraining,
  ): IApiNoContentResponse => {
    return trainingsRepo.updateTraining(id, payload);
  };
}

export const trainingsService = new TrainingsService();
