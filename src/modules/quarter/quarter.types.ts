import { IGetCompany } from "@modules/company/company.types";
import { IGetUser } from "@modules/users";
import { IPostPagination } from "@stores";

export enum QuarterTypeEnum {
  Q1 = "Q1",
  Q2 = "Q2",
  Q3 = "Q3",
  Q4 = "Q4",
}

export enum TypeOfTrainingEnum {
  WATERPOLO = "waterpolo",
  SWIMMING = "swimming",
}

export interface IPostQuarter {
  quarter_type: QuarterTypeEnum;
  year: number | null;
  waterpolo_price: number | null;
  swimming_price: number | null;
  description?: string;
  company_id: number | null;
}

export interface IGetQuarter extends IPostQuarter {
  id: number;
  created_at: string;
  updated_at: string;
  number_of_waterpolo_users: number;
  number_of_swimming_users: number;
  company?: IGetCompany;
}

export interface FQuarterList extends IPostPagination {
  order_by: string;
}

export interface IPostQuarterUsersList {
  quarter_id: number;
  user_id: number;
  type_of_training: TypeOfTrainingEnum;
}

export interface IGetQuarterUsersList extends IPostQuarterUsersList {
  id: number;
  quarter: IGetQuarter;
  user: IGetUser;
  created_at: string;
}

export interface FQuarterUsersList {
  quarter_id?: number;
  user_id?: number;
  page?: number;
  size?: number;
}

export interface FUsersNotInQuarter {
  quarter_id: number;
  company_id: number;
}
