import {
  IPostQuarter,
  QuarterTypeEnum,
  TypeOfTrainingEnum,
} from "./quarter.types";

export const QUARTER_ENDPOINTS = {
  QUARTER: "/quarter/",
  QUARTER_USERS_LIST: "/quarter-users/",
  USERS_NOT_IN_QUARTER: "/quarter-users/users-not-in-quarter",
};

export const QUARTER_INITIAL_STATE: IPostQuarter = {
  quarter_type: QuarterTypeEnum.Q1,
  year: null,
  waterpolo_price: null,
  swimming_price: null,
  description: "",
  company_id: null,
};

export const QUARTER_TYPE_OPTIONS = Object.values(QuarterTypeEnum).map(
  (type) => ({
    label: type,
    value: type,
  }),
);

export const TYPE_OF_TRAINING_OPTIONS = [
  { label: "Vaterpolo", value: TypeOfTrainingEnum.WATERPOLO },
  { label: "Plivanje", value: TypeOfTrainingEnum.SWIMMING },
];
