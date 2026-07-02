import { axiosMain } from "@config/axiosConfig";
import type { IGetUser } from "@modules/users/users.types";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { TOURNAMENT_ENDPOINTS } from "./tournament.constants";
import {
  FTournamentList,
  FTournamentUsersList,
  FUsersNotInTournament,
  IGetTournament,
  IGetTournamentUsersList,
  IPostTournament,
  IPostTournamentUsersList,
} from "./tournament.types";

// #region General

const getTournamentsList = (
  filters?: FTournamentList,
): IApiPaginatedResponse<IGetTournament> => {
  return axiosMain.get(TOURNAMENT_ENDPOINTS.TOURNAMENT, { params: filters });
};

const getTournamentById = (id: number): IApiGetResponse<IGetTournament> => {
  return axiosMain.get(`${TOURNAMENT_ENDPOINTS.TOURNAMENT}${id}`);
};

const createTournament = (payload: IPostTournament): IApiPostResponse => {
  return axiosMain.post(TOURNAMENT_ENDPOINTS.TOURNAMENT, payload);
};

const updateTournament = (
  id: number,
  payload: IPostTournament,
): IApiNoContentResponse => {
  return axiosMain.put(`${TOURNAMENT_ENDPOINTS.TOURNAMENT}${id}`, payload);
};

// #endregion General

// #region User

const getAllTournamentUsersList = (
  filters?: FTournamentUsersList,
): IApiPaginatedResponse<IGetTournamentUsersList> =>
  axiosMain.get(TOURNAMENT_ENDPOINTS.TOURNAMENT_USERS_LIST, {
    params: filters,
  });

const createTournamentUsersList = (
  payload: IPostTournamentUsersList,
): IApiPostResponse =>
  axiosMain.post(TOURNAMENT_ENDPOINTS.TOURNAMENT_USERS_LIST, payload);

const deleteTournamentUsersList = (id: number): IApiNoContentResponse =>
  axiosMain.delete(`${TOURNAMENT_ENDPOINTS.TOURNAMENT_USERS_LIST}${id}`);

const getUsersNotInTournament = (
  filters: FUsersNotInTournament,
): IApiGetResponse<{ items: IGetUser[] }> =>
  axiosMain.get(TOURNAMENT_ENDPOINTS.USERS_NOT_IN_TOURNAMENT, {
    params: filters,
  });

// #endregion User

export const tournamentRepo = {
  getTournamentsList,
  getTournamentById,
  createTournament,
  updateTournament,
  getAllTournamentUsersList,
  createTournamentUsersList,
  deleteTournamentUsersList,
  getUsersNotInTournament,
};
