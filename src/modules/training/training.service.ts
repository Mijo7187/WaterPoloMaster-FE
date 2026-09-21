import type { IGetUser } from "@modules/users/users.types";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { trainingRepo } from "./training.repo";
import {
  EventTypeEnum,
  type FTrainingList,
  type FTrainingUsersList,
  type FUsersNotInTraining,
  type IGetSparringEvent,
  type IGetTraining,
  type IGetTrainingSegmente,
  type IGetTrainingUsersList,
  type IPostTraining,
  type IPostTrainingSegment,
  type IPostTrainingUsersList,
  type SparringSideEnum,
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

  // #region Segments

  getSegmentsByTrainingId = (
    trainingId: number,
  ): IApiGetResponse<IGetTrainingSegmente[]> =>
    trainingRepo.getSegmentsByTrainingId(trainingId);

  getSegmentById = (id: number): IApiGetResponse<IGetTrainingSegmente> =>
    trainingRepo.getSegmentById(id);

  createSegment = (payload: IPostTrainingSegment): IApiPostResponse =>
    trainingRepo.createSegment(payload);

  updateSegment = (
    id: number,
    payload: IPostTrainingSegment,
  ): IApiNoContentResponse => trainingRepo.updateSegment(id, payload);

  deleteSegment = (id: number): IApiNoContentResponse =>
    trainingRepo.deleteSegment(id);

  goalsForSide = (
    side: SparringSideEnum,
    events: IGetSparringEvent[],
  ): number =>
    events.filter(
      (event) => event.side === side && event.event_type === EventTypeEnum.GOAL,
    ).length;

  // #endregion Segments
}

export const trainingService = new TrainingService();
