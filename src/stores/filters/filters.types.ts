import { FPayment } from "@modules/payment/payment.types";
import { FSifarnici } from "@modules/sifarnici";
import { FUser } from "@modules/users";
import { IPostPagination } from "@stores";

export enum FilterGroupsEnum {
  USERS = "users",
  COMPANY = "company",
  SIFARNICI = "sifarnici",
  TRAINING = "training",
  PAYMENT = "payment",
}

export type FiltersWithPagination<T = GlobalFilters> = T & IPostPagination;

export type GlobalFilters = FSifarnici | FUser | FPayment;
// | IFiltersCompany
// | IFiltersCategory
// | IFiltersUserList;

export type FilterValue = string | number | undefined | object;

export type FilterGroupMap = Map<string, FilterValue>;
