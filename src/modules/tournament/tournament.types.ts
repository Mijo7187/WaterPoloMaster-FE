import { IGetCompany } from "@modules/company/company.types";
import { IGetUser } from "@modules/users";
import { IPostPagination } from "@stores";

export interface IPostTournament {
  company_id: number | null;
  pool_id: number | null;
  season_id: number | null;
  from_date: string;
  to_date: string;
  price: number | null;
  description?: string;
}

export interface IGetTournament extends IPostTournament {
  id: number;
  created_at: string;
  updated_at: string;
  number_of_users: number;
  company?: IGetCompany;
  pool?: IGetCompany;
}

export interface FTournamentList extends IPostPagination {
  order_by: string;
  season_id?: number | null;
  company_id?: number | null;
  user_id?: number | null;
}

export interface IPostTournamentUsersList {
  tournament_id: number;
  user_id: number;
}

export interface IGetTournamentUsersList extends IPostTournamentUsersList {
  id: number;
  tournament: IGetTournament;
  user: IGetUser;
  created_at: string;
}

export interface FTournamentUsersList {
  tournament_id?: number;
  user_id?: number;
  page?: number;
  size?: number;
}

export interface FUsersNotInTournament {
  tournament_id: number;
  company_id: number;
  first_name__ilike?: string;
}
