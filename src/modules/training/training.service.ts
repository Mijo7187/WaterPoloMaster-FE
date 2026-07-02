import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";
import type { IGetUser } from "@modules/users/users.types";

import { trainingRepo } from "./training.repo";
import type {
  FTrainingList,
  FTrainingUsersList,
  FUsersNotInTraining,
  IGetTraining,
  IGetTrainingUsersList,
  IPostTraining,
  IPostTrainingUsersList,
} from "./training.types";

class TrainingService {
  // #region General

  getTrainingsList = (
    filters?: FTrainingList,
  ): IApiPaginatedResponse<IGetTraining> => {
    return trainingRepo.getTrainingsList(filters);
  };

  getTrainingById = (id: number): IApiGetResponse<IGetTraining> => {
    return trainingRepo.getTrainingById(id);
  };

  createTraining = (payload: IPostTraining): IApiPostResponse => {
    return trainingRepo.createTraining(payload);
  };

  updateTraining = (
    id: number,
    payload: IPostTraining,
  ): IApiNoContentResponse => {
    return trainingRepo.updateTraining(id, payload);
  };

  // #endregion General

  // #region User

  getAllTrainingUsersList = (
    filters?: FTrainingUsersList,
  ): IApiPaginatedResponse<IGetTrainingUsersList> =>
    trainingRepo.getAllTrainingUsersList(filters);

  createTrainingUsersList = (
    payload: IPostTrainingUsersList,
  ): IApiPostResponse => trainingRepo.createTrainingUsersList(payload);

  deleteTrainingUsersList = (id: number): IApiNoContentResponse =>
    trainingRepo.deleteTrainingUsersList(id);

  getUsersNotInTraining = (
    filters: FUsersNotInTraining,
  ): IApiGetResponse<{ items: IGetUser[] }> =>
    trainingRepo.getUsersNotInTraining(filters);

  // #endregion User
}

export const trainingService = new TrainingService();
