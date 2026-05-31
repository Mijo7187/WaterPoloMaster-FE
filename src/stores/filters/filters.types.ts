import { FSifarnici } from "@modules/sifarnici";
import { FUser } from "@modules/users";
import { IPostPagination } from "@stores";

export enum FilterGroupsEnum {
  USERS = "users",
  COMPANY = "company",
  SIFARNICI = "sifarnici",
  INVENTORY = "inventory",
  PRODUCT = "product",
  ORDER = "order",
  DIMENSION = "dimension",
}

export type FiltersWithPagination<T = GlobalFilters> = T & IPostPagination;

export type GlobalFilters = FSifarnici | FUser;
// | IFiltersCompany
// | IFiltersCategory
// | IFiltersUserList;

export type FilterValue = string | number | undefined | object;

export type FilterGroupMap = Map<string, FilterValue>;
