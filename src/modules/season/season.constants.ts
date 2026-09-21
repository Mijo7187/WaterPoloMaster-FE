import { IPostSeason } from "./season.types";

export const SEASON_ENDPOINTS = {
  SEASON: "/season/",
};

export const SEASON_INITIAL_STATE: IPostSeason = {
  company_id: null,
  name: "",
  start_date: "",
  end_date: "",
  is_current: false,
};
