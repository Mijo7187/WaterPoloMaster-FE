import { axiosMain } from "@config/axiosConfig";
import type { IGetUser } from "@modules/users/users.types";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { QUARTER_ENDPOINTS } from "./quarter.constants";
import {
  FQuarterList,
  FQuarterUsersList,
  FUsersNotInQuarter,
  IGetQuarter,
  IGetQuarterUsersList,
  IPostQuarter,
  IPostQuarterUsersList,
} from "./quarter.types";

// #region General

const getQuartersList = (
  filters?: FQuarterList,
): IApiPaginatedResponse<IGetQuarter> => {
  return axiosMain.get(QUARTER_ENDPOINTS.QUARTER, { params: filters });
};

const getQuarterById = (id: number): IApiGetResponse<IGetQuarter> => {
  return axiosMain.get(`${QUARTER_ENDPOINTS.QUARTER}${id}`);
};

const createQuarter = (payload: IPostQuarter): IApiPostResponse => {
  return axiosMain.post(QUARTER_ENDPOINTS.QUARTER, payload);
};

const updateQuarter = (
  id: number,
  payload: IPostQuarter,
): IApiNoContentResponse => {
  return axiosMain.put(`${QUARTER_ENDPOINTS.QUARTER}${id}`, payload);
};

// #endregion General

// #region User

const getAllQuarterUsersList = (
  filters?: FQuarterUsersList,
): IApiPaginatedResponse<IGetQuarterUsersList> =>
  axiosMain.get(QUARTER_ENDPOINTS.QUARTER_USERS_LIST, { params: filters });

const createQuarterUsersList = (
  payload: IPostQuarterUsersList,
): IApiPostResponse =>
  axiosMain.post(QUARTER_ENDPOINTS.QUARTER_USERS_LIST, payload);

const deleteQuarterUsersList = (id: number): IApiNoContentResponse =>
  axiosMain.delete(`${QUARTER_ENDPOINTS.QUARTER_USERS_LIST}${id}`);

const getUsersNotInQuarter = (
  filters: FUsersNotInQuarter,
): IApiGetResponse<{ items: IGetUser[] }> =>
  axiosMain.get(QUARTER_ENDPOINTS.USERS_NOT_IN_QUARTER, { params: filters });

// #endregion User

export const quarterRepo = {
  getQuartersList,
  getQuarterById,
  createQuarter,
  updateQuarter,
  getAllQuarterUsersList,
  createQuarterUsersList,
  deleteQuarterUsersList,
  getUsersNotInQuarter,
};
