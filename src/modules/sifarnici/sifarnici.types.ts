import { FormInstance } from "antd";
import { ColumnsType } from "antd/es/table";
import { IGetCompany } from "@modules/company/company.types";
import { IGetContractInstallment } from "@modules/contractInstallment/contractInstallment.types";
import { IGetMembership } from "@modules/membership/membership.types";
import { IGetSeason } from "@modules/season/season.types";
import { IGetTournament } from "@modules/tournament/tournament.types";
import { IGetTraining } from "@modules/training/training.types";
import { IGetUser } from "@modules/users/users.types";
import {
  FilterConfig,
  ICrudOptionsConfig,
  IGetPagination,
  IPostPagination,
} from "@stores";

import { FCity, IGetCity, IPostCity } from "./city/city.types";
import { FCountry, IGetCountry, IPostCountry } from "./country/country.types";
import {
  FExerciseOption,
  IGetExerciseOption,
  IPostExerciseOption,
} from "./exerciseOption/exerciseOption.types";
import {
  FSelection,
  IGetSelection,
  IPostSelection,
} from "./selection/selection.types";

export enum SifarniciTypeEnum {
  COMPANY = "COMPANY",
  CITY = "CITY",
  COUNTRY = "COUNTRY",
  EXERCISE_OPTION = "EXERCISE_OPTION",
  USER = "USER",
  SEASON = "SEASON",
  SELECTION = "SELECTION",
  MEMBERSHIP = "MEMBERSHIP",
  // The three payable sources behind the payment payable picker.
  CONTRACT_INSTALLMENT = "CONTRACT_INSTALLMENT",
  TOURNAMENT = "TOURNAMENT",
  TRAINING = "TRAINING",
}

// #region SELECT SCROLL

export type IGetSifarnikType =
  | IGetCity
  | IGetCompany
  | IGetCountry
  | IGetExerciseOption
  | IGetSelection
  | IGetUser
  | IGetSeason
  | IGetMembership
  | IGetContractInstallment
  | IGetTournament
  | IGetTraining;

interface ISifarniciSelectConfig {
  labelAccessor: string[] | ((item: unknown) => React.ReactNode);
  valueAccessor?: string;
}

export type SifarniciMapConfig = Record<
  SifarniciTypeEnum,
  ISifarniciSelectConfig
>;

export type SifarniciApiMapConfig = Record<SifarniciTypeEnum, string>;

export type SifarniciGroupMap = Map<string, SifarniciValueConfig>;

export interface ISifarnikSelectOptions<T> {
  label: string | React.ReactNode;
  value: string | number;
  item: T;
}

export interface SifarniciValueConfig<T = unknown> {
  items: ISifarnikSelectOptions<T>[] | [];
  pagination: IPostPagination | IGetPagination;
}
// #endregion SELECT SCROLL
// #region CRUD

export type IPostSifarnikType =
  | IPostCity
  | IPostCountry
  | IPostExerciseOption
  | IPostSelection;

export type SifarniciModalMapConfig = Partial<
  Record<SifarniciTypeEnum, ISifarniciModalConfig>
>;

export interface ISifarniciModalConfig {
  title: string;
  components: (form: FormInstance) => ICrudOptionsConfig[];
  formInitialState: IPostSifarnikType;
  width?: string | number;
  extraValues?: () => Record<string, unknown>;
  // tableColumns: () => ColumnsType<any>;
}

export type FSifarnici =
  | FCity
  | FCountry
  | FExerciseOption
  | FSelection;
export type SifarniciFiltersMapConfig = Partial<
  Record<SifarniciTypeEnum, ISifarniciFiltersConfig>
>;
export interface ISifarniciFiltersConfig {
  filtersInitialState: FSifarnici;
  components: () => FilterConfig[];
}

export type SifarniciTableMapConfig = Partial<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<SifarniciTypeEnum, () => ColumnsType<any>>
>;
