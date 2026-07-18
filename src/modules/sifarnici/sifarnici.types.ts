import { FormInstance } from "antd";
import { ColumnsType } from "antd/es/table";
import { IGetCompany } from "@modules/company/company.types";
import { ICrudOptionsConfig, IGetPagination, IPostPagination } from "@stores";

import { FCity, IGetCity, IPostCity } from "./city/city.types";
import { FCountry, IGetCountry, IPostCountry } from "./country/country.types";
import {
  FSwimmingDiscipline,
  IGetSwimmingDiscipline,
  IPostSwimmingDiscipline,
} from "./swimmingDiscipline/swimmingDiscipline.types";
import {
  FTrainingType,
  IGetTrainingType,
  IPostTrainingType,
} from "./trainingType/trainingType.types";

export enum SifarniciTypeEnum {
  COMPANY = "COMPANY",
  CITY = "CITY",
  COUNTRY = "COUNTRY",
  // TRAINING_TYPE = "TRAINING_TYPE",
  // SWIMMING_DISCIPLINE = "SWIMMING_DISCIPLINE",
  USER_NOT_IN_QUARTER = "USER_NOT_IN_QUARTER",
}

// #region SELECT SCROLL

export type IGetSifarnikType =
  | IGetCity
  | IGetCompany
  | IGetCountry
  | IGetTrainingType
  | IGetSwimmingDiscipline;

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
  | IPostTrainingType
  | IPostSwimmingDiscipline;

export type SifarniciModalMapConfig = Partial<
  Record<SifarniciTypeEnum, ISifarniciModalConfig>
>;

export interface ISifarniciModalConfig {
  title: string;
  components: (form: FormInstance) => ICrudOptionsConfig[];
  formInitialState: IPostSifarnikType;
  width?: string | number;
  // tableColumns: () => ColumnsType<any>;
}

export type FSifarnici = FCity | FCountry | FTrainingType | FSwimmingDiscipline;
export type SifarniciFiltersMapConfig = Partial<
  Record<SifarniciTypeEnum, ISifarniciFiltersConfig>
>;
export interface ISifarniciFiltersConfig {
  filtersInitialState: FSifarnici;
  components: (form: FormInstance) => ICrudOptionsConfig[];
}

export type SifarniciTableMapConfig = Partial<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<SifarniciTypeEnum, () => ColumnsType<any>>
>;
