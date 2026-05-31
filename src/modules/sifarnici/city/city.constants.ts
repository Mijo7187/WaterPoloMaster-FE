import { FCity, IPostCity } from "./city.types";

export const CITY_INITIAL_STATE: IPostCity = {
  name: "",
  country_id: "",
};

export const CITY_FILTERS_INITIAL_STATE: FCity = {
  name__ilike: "",
};
