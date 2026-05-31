// import { USERS_ENDPOINTS } from "./users.constants";

import { axiosMain } from "@config/axiosConfig";
import {
  FiltersWithPagination,
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { FUser, IGetUser, IPostUser } from "./users.types";

// TODO: Replace with actual axios instance from src/config/axios.ts
// import { api } from '@/config/axios';

const USERS_ENDPOINTS = {
  USERS: "/users/",
};

const getAllUsers = <F = FUser>(
  filters: FiltersWithPagination<F>,
): IApiPaginatedResponse<IGetUser> => {
  return axiosMain.get(USERS_ENDPOINTS.USERS, { params: filters });
};

const getUserById = (id: number): IApiGetResponse<IGetUser> => {
  return axiosMain.get(`${USERS_ENDPOINTS.USERS}${id}`);
};

const createUser = (payload: IPostUser): IApiPostResponse => {
  // TODO:  remove password when it is implemented
  return axiosMain.post(USERS_ENDPOINTS.USERS, {
    ...payload,
    password: "Test123!",
  });
};

const updateUser = (id: number, payload: IPostUser): IApiNoContentResponse => {
  return axiosMain.put(`${USERS_ENDPOINTS.USERS}${id}`, payload);
};

export const usersRepo = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
};
