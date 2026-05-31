import { FCountry, IPostCountry } from "./country.types";

export const COUNTRY_INITIAL_STATE: IPostCountry = {
  name: "",
  is_active: true,
};

export const COUNTRY_FILTERS_INITIAL_STATE: FCountry = {
  name__ilike: "",
  is_active: null,
};
