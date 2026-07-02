import { IGetUser } from "@modules/users";
import { IPostPagination } from "@stores";

export enum TrainingStatusEnum {
  INCOMING = "INCOMING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IPostTraining {
  pool_id: number | null;
  company_id: number | null;
  training_date: string;
  start_time: string;
  end_time: string;
  price: number | null;
  status: TrainingStatusEnum;
  number_of_players?: number;
}

export interface IGetTraining extends IPostTraining {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface FTrainingList extends IPostPagination {
  order_by: string;
}

export interface IPostTrainingUsersList {
  training_id: number;
  user_id: number;
}

export interface IGetTrainingUsersList extends IPostTrainingUsersList {
  id: number;
  training: IGetTraining;
  user: IGetUser;
  created_at: string;
}

export interface FTrainingUsersList {
  training_id?: number;
  user_id?: number;
  page?: number;
  size?: number;
}

export interface FUsersNotInTraining {
  training_id: number;
  company_id: number;
}
