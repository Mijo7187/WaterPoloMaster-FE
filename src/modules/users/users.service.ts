import {
  FiltersWithPagination,
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { usersRepo } from "./users.repo";
import type { FUser, IGetUser, IPostUser } from "./users.types";

class UsersService {
  getAllUsers = <F = FUser>(
    filters: FiltersWithPagination<F>,
  ): IApiPaginatedResponse<IGetUser> => {
    return usersRepo.getAllUsers(filters);
  };

  getUserById = (id: number): IApiGetResponse<IGetUser> => {
    return usersRepo.getUserById(id);
  };

  createUser = (payload: IPostUser): IApiPostResponse => {
    return usersRepo.createUser(payload);
  };

  updateUser = (id: number, payload: IPostUser): IApiNoContentResponse => {
    return usersRepo.updateUser(id, payload);
  };
}

export const usersService = new UsersService();
