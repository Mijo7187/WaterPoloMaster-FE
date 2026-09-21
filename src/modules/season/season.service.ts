import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { seasonRepo } from "./season.repo";
import type { FSeasonList, IGetSeason, IPostSeason } from "./season.types";

class SeasonService {
  getSeasonsList = (
    filters?: FSeasonList,
  ): IApiPaginatedResponse<IGetSeason> => {
    return seasonRepo.getSeasonsList(filters);
  };

  getSeasonById = (id: number): IApiGetResponse<IGetSeason> => {
    return seasonRepo.getSeasonById(id);
  };

  createSeason = (payload: IPostSeason): IApiPostResponse => {
    return seasonRepo.createSeason(payload);
  };

  updateSeason = (id: number, payload: IPostSeason): IApiNoContentResponse => {
    return seasonRepo.updateSeason(id, payload);
  };
}

export const seasonService = new SeasonService();
