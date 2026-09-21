import { IPostPagination } from "@stores";

export interface IPostSeason {
  company_id: number | null;
  name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}

export interface IGetSeason extends IPostSeason {
  id: number;
}

export interface FSeasonList extends IPostPagination {
  order_by?: string;
  company_id?: number | null;
  is_current?: boolean | null;
}
