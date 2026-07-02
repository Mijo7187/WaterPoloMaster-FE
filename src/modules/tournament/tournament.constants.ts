import { IPostTournament } from "./tournament.types";

export const TOURNAMENT_ENDPOINTS = {
  TOURNAMENT: "/tournament/",
  TOURNAMENT_USERS_LIST: "/tournament-users/",
  USERS_NOT_IN_TOURNAMENT: "/tournament-users/users-not-in-tournament",
};

export const TOURNAMENT_INITIAL_STATE: IPostTournament = {
  company_id: null,
  pool_id: null,
  from_date: "",
  to_date: "",
  price: null,
  description: "",
};
