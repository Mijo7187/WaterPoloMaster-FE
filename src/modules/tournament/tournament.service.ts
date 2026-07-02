import type { IGetUser } from "@modules/users/users.types";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { tournamentRepo } from "./tournament.repo";
import type {
  FTournamentList,
  FTournamentUsersList,
  FUsersNotInTournament,
  IGetTournament,
  IGetTournamentUsersList,
  IPostTournament,
  IPostTournamentUsersList,
} from "./tournament.types";

class TournamentService {
  // #region General

  getTournamentsList = (
    filters?: FTournamentList,
  ): IApiPaginatedResponse<IGetTournament> => {
    return tournamentRepo.getTournamentsList(filters);
  };

  getTournamentById = (id: number): IApiGetResponse<IGetTournament> => {
    return tournamentRepo.getTournamentById(id);
  };

  createTournament = (payload: IPostTournament): IApiPostResponse => {
    return tournamentRepo.createTournament(payload);
  };

  updateTournament = (
    id: number,
    payload: IPostTournament,
  ): IApiNoContentResponse => {
    return tournamentRepo.updateTournament(id, payload);
  };

  // #endregion General

  // #region User

  getAllTournamentUsersList = (
    filters?: FTournamentUsersList,
  ): IApiPaginatedResponse<IGetTournamentUsersList> =>
    tournamentRepo.getAllTournamentUsersList(filters);

  createTournamentUsersList = (
    payload: IPostTournamentUsersList,
  ): IApiPostResponse => tournamentRepo.createTournamentUsersList(payload);

  deleteTournamentUsersList = (id: number): IApiNoContentResponse =>
    tournamentRepo.deleteTournamentUsersList(id);

  getUsersNotInTournament = (
    filters: FUsersNotInTournament,
  ): IApiGetResponse<{ items: IGetUser[] }> =>
    tournamentRepo.getUsersNotInTournament(filters);

  // #endregion User
}

export const tournamentService = new TournamentService();
