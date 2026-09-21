import type {
  IUxFormDatePickerProps,
  IUxFormInputNumberProps,
  IUxFormInputProps,
  IUxFormRangeDatePickerProps,
  IUxFormScrollSelect,
  IUxFormSelectProps,
} from "@components/UxFormComponents";
import { FContract } from "@modules/contract/contract.types";
import { FMembership } from "@modules/membership/membership.types";
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
  CONTRACT = "contract",
  MEMBERSHIP = "membership",
  SEASON = "season",
  TOURNAMENT = "tournament",
}

export type FiltersWithPagination<T = GlobalFilters> = T & IPostPagination;

export type GlobalFilters =
  | FSifarnici
  | FUser
  | FPayment
  | FContract
  | FMembership;
// | IFiltersCompany
// | IFiltersCategory
// | IFiltersUserList;

export type FilterValue = string | number | boolean | undefined | object;

export type FilterGroupMap = Map<string, FilterValue>;

// #region FILTER CONFIG
export enum FilterTypeEnum {
  INPUT = "input",
  INPUT_NUMBER = "input_number",
  SELECT = "select",
  SCROLL_SELECT = "scroll_select",
  DATE = "date",
  RANGE_DATE = "range_date",
}

interface IFilterConfigBase {
  /** antd Col span (24-grid). Ignored when `width` is set. Default 4 */
  colSpan?: number;
  /** Fixed min width of the column instead of span */
  width?: number | string;
  isVisible?: boolean;
}

export interface IInputFilterConfig
  extends IFilterConfigBase,
    IUxFormInputProps {
  type: FilterTypeEnum.INPUT;
}

export interface IInputNumberFilterConfig
  extends IFilterConfigBase,
    IUxFormInputNumberProps {
  type: FilterTypeEnum.INPUT_NUMBER;
}

export interface ISelectFilterConfig
  extends IFilterConfigBase,
    IUxFormSelectProps {
  type: FilterTypeEnum.SELECT;
}

export interface IScrollSelectFilterConfig
  extends IFilterConfigBase,
    IUxFormScrollSelect<unknown, object> {
  type: FilterTypeEnum.SCROLL_SELECT;
}

export interface IDateFilterConfig
  extends IFilterConfigBase,
    IUxFormDatePickerProps {
  type: FilterTypeEnum.DATE;
}

export interface IRangeDateFilterConfig
  extends IFilterConfigBase,
    IUxFormRangeDatePickerProps {
  type: FilterTypeEnum.RANGE_DATE;
  /** Store/API keys the [start, end] range is split into, e.g. ["start_date", "end_date"] */
  rangeKeys: [string, string];
}

export type FilterConfig =
  | IInputFilterConfig
  | IInputNumberFilterConfig
  | ISelectFilterConfig
  | IScrollSelectFilterConfig
  | IDateFilterConfig
  | IRangeDateFilterConfig;
/** Props of every page-level `XxxFilters` component, so it can be reused in profile tabs */
export interface IFiltersComponentProps {
  /** Overrides the default list fetch (e.g. a tab fetching by user / company id) */
  handleFiltersChange?: () => void;
  /** formNames of fields fixed by the context (e.g. season_id on a season's tab) */
  hiddenFields?: string[];
}
// #endregion FILTER CONFIG
