/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosMain } from "@config/axiosConfig";
import {
  FiltersWithPagination,
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { SIFARNICI_API_URL_MAP } from "./sifarnici.constants";
import {
  FSifarnici,
  IGetSifarnikType,
  SifarniciTypeEnum,
} from "./sifarnici.types";

const fetchSifarniciOptions = <T = IGetSifarnikType, F = FSifarnici>(
  sifarniciName: SifarniciTypeEnum,
  filters: FiltersWithPagination<F>,
  routeParams?: string,
): IApiPaginatedResponse<T> => {
  const sifarniciRoute = `${SIFARNICI_API_URL_MAP[sifarniciName]}/${routeParams ?? ""}`;
  return axiosMain.get(sifarniciRoute, { params: filters });
};

const fetchSifarnikListTable = <F = FSifarnici>(
  sifarnikType: SifarniciTypeEnum,
  filters: FiltersWithPagination<F>,
): IApiPaginatedResponse<IGetSifarnikType> => {
  const route = SIFARNICI_API_URL_MAP[sifarnikType];
  return axiosMain.get(route, { params: filters });
};

const fetchSifarnikById = (
  sifarnikType: SifarniciTypeEnum,
  id: number,
): IApiGetResponse<IGetSifarnikType> => {
  const route = SIFARNICI_API_URL_MAP[sifarnikType];
  return axiosMain.get(`${route}/${id}`);
};

const postSifarnik = (
  sifarnikType: SifarniciTypeEnum,
  data: any,
): IApiPostResponse => {
  const route = SIFARNICI_API_URL_MAP[sifarnikType];
  return axiosMain.post(route, data);
};

const updateSifarnik = (
  sifarnikType: SifarniciTypeEnum,
  id: number,
  data: any,
): IApiNoContentResponse => {
  const route = SIFARNICI_API_URL_MAP[sifarnikType];
  return axiosMain.put(`${route}/${id}`, data);
};

export const sifarniciRepo = {
  fetchSifarniciOptions,
  fetchSifarnikListTable,
  fetchSifarnikById,
  postSifarnik,
  updateSifarnik,
};
