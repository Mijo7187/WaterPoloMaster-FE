import { authStore } from "@modules/auth/auth.store";
import {
  CITY_FILTERS_INITIAL_STATE,
  CITY_INITIAL_STATE,
} from "@modules/sifarnici/city/city.constants";
import {
  COUNTRY_FILTERS_INITIAL_STATE,
  COUNTRY_INITIAL_STATE,
} from "@modules/sifarnici/country/country.constants";
import {
  EXERCISE_OPTION_FILTERS_INITIAL_STATE,
  EXERCISE_OPTION_INITIAL_STATE,
} from "@modules/sifarnici/exerciseOption/exerciseOption.constants";
import {
  SELECTION_FILTERS_INITIAL_STATE,
  SELECTION_INITIAL_STATE,
} from "@modules/sifarnici/selection/selection.constants";
import {
  SifarniciFiltersMapConfig,
  SifarniciModalMapConfig,
  SifarniciTableMapConfig,
  SifarniciTypeEnum,
} from "@modules/sifarnici/sifarnici.types";

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
  EXERCISE_OPTION_FILTER_FIELDS,
  EXERCISE_OPTION_FORM_FIELDS,
  EXERCISE_OPTION_TABLE_COLUMNS,
} from "./components/ExerciseOption/ExerciseOption";
import {
  SELECTION_FILTER_FIELDS,
  SELECTION_FORM_FIELDS,
  SELECTION_TABLE_COLUMNS,
} from "./components/Selection/Selection";

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
  [SifarniciTypeEnum.EXERCISE_OPTION]: {
    title: "Opcija vežbe",
    components: EXERCISE_OPTION_FORM_FIELDS,
    formInitialState: EXERCISE_OPTION_INITIAL_STATE,
    width: 700,
    extraValues: () => {
      return { company_id: authStore.authUser.company_id };
    },
  },
  [SifarniciTypeEnum.SELECTION]: {
    title: "Selekcija",
    components: SELECTION_FORM_FIELDS,
    formInitialState: SELECTION_INITIAL_STATE,
    width: 700,
    extraValues: () => {
      return { company_id: authStore.authUser.company_id };
    },
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
  [SifarniciTypeEnum.EXERCISE_OPTION]: {
    components: EXERCISE_OPTION_FILTER_FIELDS,
    filtersInitialState: EXERCISE_OPTION_FILTERS_INITIAL_STATE,
  },
  [SifarniciTypeEnum.SELECTION]: {
    components: SELECTION_FILTER_FIELDS,
    filtersInitialState: SELECTION_FILTERS_INITIAL_STATE,
  },
};

export const SIFARNIK_TABLE_CONFIG_DATA: SifarniciTableMapConfig = {
  [SifarniciTypeEnum.CITY]: CITY_TABLE_COLUMNS,
  [SifarniciTypeEnum.COUNTRY]: COUNTRY_TABLE_COLUMNS,
  [SifarniciTypeEnum.EXERCISE_OPTION]: EXERCISE_OPTION_TABLE_COLUMNS,
  [SifarniciTypeEnum.SELECTION]: SELECTION_TABLE_COLUMNS,
};

const makeSifarniciSelectOptions = () =>
  Object.entries(SIFARNIK_MODAL_CONFIG_DATA).map(([key, value]) => ({
    label: value.title,
    value: key,
  }));

export const SIFARNIK_SELECT_OPTIONS = makeSifarniciSelectOptions();
