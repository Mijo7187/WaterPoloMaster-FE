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
  // [SifarniciTypeEnum.TRAINING_TYPE]: "/training-type",
  // [SifarniciTypeEnum.SWIMMING_DISCIPLINE]: "/swimming-discipline",
  [SifarniciTypeEnum.USER_NOT_IN_QUARTER]:
    "/quarter-users/users-not-in-quarter",
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
  // [SifarniciTypeEnum.TRAINING_TYPE]: {
  //   labelAccessor: ["name"],
  // },
  // [SifarniciTypeEnum.SWIMMING_DISCIPLINE]: {
  //   labelAccessor: ["name"],
  // },
  [SifarniciTypeEnum.USER_NOT_IN_QUARTER]: {
    labelAccessor: ["first_name", "last_name"],
  },
};
