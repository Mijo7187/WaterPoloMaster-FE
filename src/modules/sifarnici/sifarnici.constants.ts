import { PAGINATION_INITIAL_STATE } from "@stores";

import {
  SifarniciApiMapConfig,
  SifarniciMapConfig,
  SifarniciTypeEnum,
  SifarniciValueConfig,
} from "./sifarnici.types";

export const SIFARNIK_INITIAL_VALUE: SifarniciValueConfig = {
  items: [],
  pagination: PAGINATION_INITIAL_STATE,
};

export const SIFARNICI_API_URL_MAP: SifarniciApiMapConfig = {
  [SifarniciTypeEnum.COMPANY]: "/company",
  [SifarniciTypeEnum.CITY]: "/city",
  [SifarniciTypeEnum.COUNTRY]: "/country",
  [SifarniciTypeEnum.PAYMENT_TYPE]: "/payment-type",
};

export const SIFARNICI_MAP_CONFIG: SifarniciMapConfig = {
  [SifarniciTypeEnum.COMPANY]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.CITY]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.COUNTRY]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.PAYMENT_TYPE]: {
    labelAccessor: ["name"],
  },
};
