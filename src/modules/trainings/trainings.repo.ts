import { axiosMain } from "@config/axiosConfig";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { IGetTraining, IPostTraining } from "./trainings.types";

const TRAININGS_ENDPOINTS = {
  TRAININGS: "/training/",
};

const getTrainingsList = (
  filters?: object,
): IApiPaginatedResponse<IGetTraining> => {
  return axiosMain.get(TRAININGS_ENDPOINTS.TRAININGS, { params: filters });
};

const getTrainingById = (id: number): IApiGetResponse<IGetTraining> => {
  return axiosMain.get(`${TRAININGS_ENDPOINTS.TRAININGS}${id}`);
};

const createTraining = (payload: IPostTraining): IApiPostResponse => {
  return axiosMain.post(TRAININGS_ENDPOINTS.TRAININGS, payload);
};

const updateTraining = (
  id: number,
  payload: IPostTraining,
): IApiNoContentResponse => {
  return axiosMain.put(`${TRAININGS_ENDPOINTS.TRAININGS}${id}`, payload);
};

export const trainingsRepo = {
  getTrainingsList,
  getTrainingById,
  createTraining,
  updateTraining,
};
