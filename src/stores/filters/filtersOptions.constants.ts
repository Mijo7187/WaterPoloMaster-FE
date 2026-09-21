import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";

import {
  FilterTypeEnum,
  IInputFilterConfig,
  IScrollSelectFilterConfig,
  ISelectFilterConfig,
} from "./filters.types";

// Reusable filter configs — spread them into a page's filterOptions and
// override what differs, e.g. `{ ...FILTER_SEASON, storeKey: "x", colSpan: 6 }`.

// antd Select only allows string/number values; axios serializes both to the
// same `is_active=true` query param, so no conversion to boolean is needed.
export const IS_ACTIVE_OPTIONS = [
  { label: "Aktivni", value: "true" },
  { label: "Neaktivni", value: "false" },
];

export const YES_NO_OPTIONS = [
  { label: "Da", value: "true" },
  { label: "Ne", value: "false" },
];

export const FILTER_NAME: IInputFilterConfig = {
  type: FilterTypeEnum.INPUT,
  formName: "name__ilike",
  label: "Naziv",
  placeholder: "Pretraži po nazivu",
  testId: "name",
};

export const FILTER_FIRST_NAME: IInputFilterConfig = {
  type: FilterTypeEnum.INPUT,
  formName: "first_name__ilike",
  label: "Ime",
  placeholder: "Pretraži po imenu",
  testId: "first-name",
};

export const FILTER_IS_ACTIVE: ISelectFilterConfig = {
  type: FilterTypeEnum.SELECT,
  formName: "is_active",
  label: "Status",
  placeholder: "Svi",
  options: IS_ACTIVE_OPTIONS,
  testId: "is-active",
};

export const FILTER_COMPANY: IScrollSelectFilterConfig = {
  type: FilterTypeEnum.SCROLL_SELECT,
  formName: "company_id",
  objName: "company",
  storeKey: "filter_company",
  sifarnikName: SifarniciTypeEnum.COMPANY,
  label: "Klub",
  placeholder: "Svi klubovi",
  testId: "company",
  allowClear: true,
};

export const FILTER_SEASON: IScrollSelectFilterConfig = {
  type: FilterTypeEnum.SCROLL_SELECT,
  formName: "season_id",
  objName: "season",
  storeKey: "filter_season",
  sifarnikName: SifarniciTypeEnum.SEASON,
  label: "Sezona",
  placeholder: "Sve sezone",
  testId: "season",
  allowClear: true,
};
