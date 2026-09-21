import { axiosMain } from "@config/axiosConfig";
import type { IGetUser } from "@modules/users/users.types";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import {
  FTrainingList,
  FTrainingUsersList,
  FUsersNotInTraining,
  IGetTraining,
  IGetTrainingSegmente,
  IGetTrainingUsersList,
  IPostTraining,
  IPostTrainingSegment,
  IPostTrainingUsersList,
} from "./training.types";

const TRAINING_ENDPOINTS = {
  TRAINING: "/training/",
  TRAINING_USERS_LIST: "/training-users/",
  USERS_NOT_IN_TRAINING: "/training-users/users-not-in-training",
  TRAINING_SEGMENTS: "/training-segment/",
  SEGMENTS_BY_TRAINING: "/training-segment/by-training/",
};

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

// #region Segments

const getSegmentsByTrainingId = (
  trainingId: number,
): IApiGetResponse<IGetTrainingSegmente[]> =>
  axiosMain.get(`${TRAINING_ENDPOINTS.SEGMENTS_BY_TRAINING}${trainingId}`);

const getSegmentById = (id: number): IApiGetResponse<IGetTrainingSegmente> =>
  axiosMain.get(`${TRAINING_ENDPOINTS.TRAINING_SEGMENTS}${id}`);

const createSegment = (payload: IPostTrainingSegment): IApiPostResponse =>
  axiosMain.post(TRAINING_ENDPOINTS.TRAINING_SEGMENTS, payload);

const updateSegment = (
  id: number,
  payload: IPostTrainingSegment,
): IApiNoContentResponse =>
  axiosMain.patch(`${TRAINING_ENDPOINTS.TRAINING_SEGMENTS}${id}`, payload);

const deleteSegment = (id: number): IApiNoContentResponse =>
  axiosMain.delete(`${TRAINING_ENDPOINTS.TRAINING_SEGMENTS}${id}`);

// #endregion Segments

export const trainingRepo = {
  getTrainingsList,
  getTrainingById,
  createTraining,
  updateTraining,
  getAllTrainingUsersList,
  createTrainingUsersList,
  deleteTrainingUsersList,
  getUsersNotInTraining,
  getSegmentsByTrainingId,
  getSegmentById,
  createSegment,
  updateSegment,
  deleteSegment,
};
