import { axiosMain } from "@config/axiosConfig";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { SEASON_ENDPOINTS } from "./season.constants";
import { FSeasonList, IGetSeason, IPostSeason } from "./season.types";

const getSeasonsList = (
  filters?: FSeasonList,
): IApiPaginatedResponse<IGetSeason> => {
  return axiosMain.get(SEASON_ENDPOINTS.SEASON, { params: filters });
};

const getSeasonById = (id: number): IApiGetResponse<IGetSeason> => {
  return axiosMain.get(`${SEASON_ENDPOINTS.SEASON}${id}`);
};

const createSeason = (payload: IPostSeason): IApiPostResponse => {
  return axiosMain.post(SEASON_ENDPOINTS.SEASON, payload);
};

const updateSeason = (
  id: number,
  payload: IPostSeason,
): IApiNoContentResponse => {
  return axiosMain.put(`${SEASON_ENDPOINTS.SEASON}${id}`, payload);
};

export const seasonRepo = {
  getSeasonsList,
  getSeasonById,
  createSeason,
  updateSeason,
};
