import type { IGetUser } from "@modules/users/users.types";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { quarterRepo } from "./quarter.repo";
import type {
  FQuarterList,
  FQuarterUsersList,
  FUsersNotInQuarter,
  IGetQuarter,
  IGetQuarterUsersList,
  IPostQuarter,
  IPostQuarterUsersList,
} from "./quarter.types";

class QuarterService {
  // #region General

  getQuartersList = (
    filters?: FQuarterList,
  ): IApiPaginatedResponse<IGetQuarter> => {
    return quarterRepo.getQuartersList(filters);
  };

  getQuarterById = (id: number): IApiGetResponse<IGetQuarter> => {
    return quarterRepo.getQuarterById(id);
  };

  createQuarter = (payload: IPostQuarter): IApiPostResponse => {
    return quarterRepo.createQuarter(payload);
  };

  updateQuarter = (
    id: number,
    payload: IPostQuarter,
  ): IApiNoContentResponse => {
    return quarterRepo.updateQuarter(id, payload);
  };

  // #endregion General

  // #region User

  getAllQuarterUsersList = (
    filters?: FQuarterUsersList,
  ): IApiPaginatedResponse<IGetQuarterUsersList> =>
    quarterRepo.getAllQuarterUsersList(filters);

  createQuarterUsersList = (
    payload: IPostQuarterUsersList,
  ): IApiPostResponse => quarterRepo.createQuarterUsersList(payload);

  deleteQuarterUsersList = (id: number): IApiNoContentResponse =>
    quarterRepo.deleteQuarterUsersList(id);

  getUsersNotInQuarter = (
    filters: FUsersNotInQuarter,
  ): IApiGetResponse<{ items: IGetUser[] }> =>
    quarterRepo.getUsersNotInQuarter(filters);

  // #endregion User
}

export const quarterService = new QuarterService();
