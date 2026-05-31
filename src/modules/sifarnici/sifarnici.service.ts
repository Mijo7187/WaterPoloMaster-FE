import { FiltersWithPagination } from "@stores";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores/globals/globals.types";

import { SIFARNICI_MAP_CONFIG } from "./sifarnici.constants";
import { sifarniciRepo } from "./sifarnici.repo";
import {
  FSifarnici,
  IGetSifarnikType,
  IPostSifarnikType,
  ISifarnikSelectOptions,
  SifarniciTypeEnum,
} from "./sifarnici.types";

class SifarniciService {
  getSifarniciOptions = <T = IGetSifarnikType, F = FSifarnici>(
    sifarniciName: SifarniciTypeEnum,
    filters: FiltersWithPagination<F>,
    routeParams?: string,
  ): IApiPaginatedResponse<T> => {
    // nalazimo rutu sifarnika i dodajemo routeParams ako postoje kao props
    // const sifarniciRoute = `${SIFARNICI_API_URL_MAP[sifarniciName]}/${routeParams ?? ""}`;
    return sifarniciRepo.fetchSifarniciOptions<T, F>(
      sifarniciName,
      filters,
      routeParams,
    );
  };

  // pravimo listu opcija za select
  makeSifarnikOptionsSelect = <T>(
    sifarnikName: SifarniciTypeEnum,
    options: T[],
  ): ISifarnikSelectOptions<T>[] => {
    return options.map((item) => {
      return this.makeSifarnikOption(sifarnikName, item);
    });
  };

  makeLabel = (arr: string[], obj: Record<string, string>) => {
    let result = "";
    arr.forEach((key: string, index: number) => {
      result += obj[key] ?? "";
      if (index < arr.length - 1) {
        result += " ";
      }
    });
    return result;
  };

  // pravimo single opciju za select
  makeSifarnikOption = <T>(
    sifarniciName: SifarniciTypeEnum,
    item: T,
  ): ISifarnikSelectOptions<T> => {
    const sifarniciConfig = SIFARNICI_MAP_CONFIG[sifarniciName];

    const labelValue =
      typeof sifarniciConfig.labelAccessor === "function"
        ? sifarniciConfig.labelAccessor(item as unknown)
        : this.makeLabel(
            sifarniciConfig.labelAccessor,
            item as unknown as Record<string, string>,
          );

    const valueAccessor = sifarniciConfig.valueAccessor ?? "id";
    const value = (item as Record<string, string | number>)[valueAccessor];

    return {
      label: labelValue,
      value: value,
      item: item,
    };
  };

  // #region CRUD
  fetchSifarnikListTable = <F = FSifarnici>(
    sifarnikType: SifarniciTypeEnum,
    filters: FiltersWithPagination<F>,
  ): IApiPaginatedResponse<IGetSifarnikType> => {
    return sifarniciRepo.fetchSifarnikListTable(sifarnikType, filters);
  };

  fetchSifarnikById = (
    sifarnikType: SifarniciTypeEnum,
    id: number,
  ): IApiGetResponse<IGetSifarnikType> => {
    return sifarniciRepo.fetchSifarnikById(sifarnikType, id);
  };

  postSifarnik = (
    sifarnikType: SifarniciTypeEnum,
    data: IPostSifarnikType,
  ): IApiPostResponse => {
    return sifarniciRepo.postSifarnik(sifarnikType, data);
  };

  updateSifarnik = (
    sifarnikType: SifarniciTypeEnum,
    id: number,
    data: IPostSifarnikType,
  ): IApiNoContentResponse => {
    return sifarniciRepo.updateSifarnik(sifarnikType, id, data);
  };

  // #endregion CRUD
}

export const sifarniciService = new SifarniciService();
