import {
  CITY_FILTERS_INITIAL_STATE,
  CITY_INITIAL_STATE,
} from "@modules/sifarnici/city/city.constants";
import {
  COUNTRY_FILTERS_INITIAL_STATE,
  COUNTRY_INITIAL_STATE,
} from "@modules/sifarnici/country/country.constants";
import {
  PAYMENT_TYPE_FILTERS_INITIAL_STATE,
  PAYMENT_TYPE_INITIAL_STATE,
} from "@modules/sifarnici/paymentType/paymentType.constants";
import {
  SifarniciFiltersMapConfig,
  SifarniciModalMapConfig,
  SifarniciTableMapConfig,
  SifarniciTypeEnum,
} from "@modules/sifarnici/sifarnici.types";
import {
  SWIMMING_DISCIPLINE_FILTERS_INITIAL_STATE,
  SWIMMING_DISCIPLINE_INITIAL_STATE,
} from "@modules/sifarnici/swimmingDiscipline/swimmingDiscipline.constants";
import {
  TRAINING_TYPE_FILTERS_INITIAL_STATE,
  TRAINING_TYPE_INITIAL_STATE,
} from "@modules/sifarnici/trainingType/trainingType.constants";

import {
  CITY_FILTER_FIELDS,
  CITY_FORM_FIELDS,
  CITY_TABLE_COLUMNS,
} from "./components/City/City";
import {
  COUNTRY_FILTER_FIELDS,
  COUNTRY_FORM_FIELDS,
  COUNTRY_TABLE_COLUMNS,
} from "./components/Country/Country";
import {
  PAYMENT_TYPE_FILTER_FIELDS,
  PAYMENT_TYPE_FORM_FIELDS,
  PAYMENT_TYPE_TABLE_COLUMNS,
} from "./components/PaymentType/PaymentType";
import {
  SWIMMING_DISCIPLINE_FILTER_FIELDS,
  SWIMMING_DISCIPLINE_FORM_FIELDS,
  SWIMMING_DISCIPLINE_TABLE_COLUMNS,
} from "./components/SwimmingDiscipline/SwimmingDiscipline";
import {
  TRAINING_TYPE_FILTER_FIELDS,
  TRAINING_TYPE_FORM_FIELDS,
  TRAINING_TYPE_TABLE_COLUMNS,
} from "./components/TrainingType/TrainingType";

export const SIFARNIK_MODAL_CONFIG_DATA: SifarniciModalMapConfig = {
  [SifarniciTypeEnum.CITY]: {
    title: "Grad",
    components: CITY_FORM_FIELDS,
    formInitialState: CITY_INITIAL_STATE,
    width: 700,
  },
  [SifarniciTypeEnum.COUNTRY]: {
    title: "Država",
    components: COUNTRY_FORM_FIELDS,
    formInitialState: COUNTRY_INITIAL_STATE,
    width: 700,
  },
  [SifarniciTypeEnum.PAYMENT_TYPE]: {
    title: "Tip plaćanja",
    components: PAYMENT_TYPE_FORM_FIELDS,
    formInitialState: PAYMENT_TYPE_INITIAL_STATE,
    width: 700,
  },
  [SifarniciTypeEnum.TRAINING_TYPE]: {
    title: "Tip treninga",
    components: TRAINING_TYPE_FORM_FIELDS,
    formInitialState: TRAINING_TYPE_INITIAL_STATE,
    width: 700,
  },
  [SifarniciTypeEnum.SWIMMING_DISCIPLINE]: {
    title: "Plivačka disciplina",
    components: SWIMMING_DISCIPLINE_FORM_FIELDS,
    formInitialState: SWIMMING_DISCIPLINE_INITIAL_STATE,
    width: 700,
  },
};

export const SIFARNIK_FILTERS_CONFIG_DATA: SifarniciFiltersMapConfig = {
  [SifarniciTypeEnum.CITY]: {
    components: CITY_FILTER_FIELDS,
    filtersInitialState: CITY_FILTERS_INITIAL_STATE,
  },
  [SifarniciTypeEnum.COUNTRY]: {
    components: COUNTRY_FILTER_FIELDS,
    filtersInitialState: COUNTRY_FILTERS_INITIAL_STATE,
  },
  [SifarniciTypeEnum.PAYMENT_TYPE]: {
    components: PAYMENT_TYPE_FILTER_FIELDS,
    filtersInitialState: PAYMENT_TYPE_FILTERS_INITIAL_STATE,
  },
  [SifarniciTypeEnum.TRAINING_TYPE]: {
    components: TRAINING_TYPE_FILTER_FIELDS,
    filtersInitialState: TRAINING_TYPE_FILTERS_INITIAL_STATE,
  },
  [SifarniciTypeEnum.SWIMMING_DISCIPLINE]: {
    components: SWIMMING_DISCIPLINE_FILTER_FIELDS,
    filtersInitialState: SWIMMING_DISCIPLINE_FILTERS_INITIAL_STATE,
  },
};

export const SIFARNIK_TABLE_CONFIG_DATA: SifarniciTableMapConfig = {
  [SifarniciTypeEnum.CITY]: CITY_TABLE_COLUMNS,
  [SifarniciTypeEnum.COUNTRY]: COUNTRY_TABLE_COLUMNS,
  [SifarniciTypeEnum.PAYMENT_TYPE]: PAYMENT_TYPE_TABLE_COLUMNS,
  [SifarniciTypeEnum.TRAINING_TYPE]: TRAINING_TYPE_TABLE_COLUMNS,
  [SifarniciTypeEnum.SWIMMING_DISCIPLINE]: SWIMMING_DISCIPLINE_TABLE_COLUMNS,
};

const makeSifarniciSelectOptions = () =>
  Object.entries(SIFARNIK_MODAL_CONFIG_DATA).map(([key, value]) => ({
    label: value.title,
    value: key,
  }));

export const SIFARNIK_SELECT_OPTIONS = makeSifarniciSelectOptions();
