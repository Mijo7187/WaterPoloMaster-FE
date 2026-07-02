import { axiosMain } from "@config/axiosConfig";
import type { IGetUser } from "@modules/users/users.types";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { TRAINING_ENDPOINTS } from "./training.constants";
import {
  FTrainingList,
  FTrainingUsersList,
  FUsersNotInTraining,
  IGetTraining,
  IGetTrainingUsersList,
  IPostTraining,
  IPostTrainingUsersList,
} from "./training.types";

// #region General

const getTrainingsList = (
  filters?: FTrainingList,
): IApiPaginatedResponse<IGetTraining> => {
  return axiosMain.get(TRAINING_ENDPOINTS.TRAINING, { params: filters });
};

const getTrainingById = (id: number): IApiGetResponse<IGetTraining> => {
  return axiosMain.get(`${TRAINING_ENDPOINTS.TRAINING}${id}`);
};

const createTraining = (payload: IPostTraining): IApiPostResponse => {
  return axiosMain.post(TRAINING_ENDPOINTS.TRAINING, payload);
};

const updateTraining = (
  id: number,
  payload: IPostTraining,
): IApiNoContentResponse => {
  return axiosMain.put(`${TRAINING_ENDPOINTS.TRAINING}${id}`, payload);
};

// #endregion General

// #region User

const getAllTrainingUsersList = (
  filters?: FTrainingUsersList,
): IApiPaginatedResponse<IGetTrainingUsersList> =>
  axiosMain.get(TRAINING_ENDPOINTS.TRAINING_USERS_LIST, { params: filters });

const createTrainingUsersList = (
  payload: IPostTrainingUsersList,
): IApiPostResponse =>
  axiosMain.post(TRAINING_ENDPOINTS.TRAINING_USERS_LIST, payload);

const deleteTrainingUsersList = (id: number): IApiNoContentResponse =>
  axiosMain.delete(`${TRAINING_ENDPOINTS.TRAINING_USERS_LIST}${id}`);

const getUsersNotInTraining = (
  filters: FUsersNotInTraining,
): IApiGetResponse<{ items: IGetUser[] }> =>
  axiosMain.get(TRAINING_ENDPOINTS.USERS_NOT_IN_TRAINING, { params: filters });

// #endregion User

export const trainingRepo = {
  getTrainingsList,
  getTrainingById,
  createTraining,
  updateTraining,
  getAllTrainingUsersList,
  createTrainingUsersList,
  deleteTrainingUsersList,
  getUsersNotInTraining,
};
