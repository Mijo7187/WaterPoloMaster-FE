import { IGetUser } from "@modules/users/users.types";

export enum TrainingStatusEnum {
  INCOMING = "INCOMING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IPostTraining {
  pool_id: number | null;
  company_id: number | null;
  start_training_date_time: string;
  end_training_date_time: string;
  price: number | null;
  payed: boolean;
  status: TrainingStatusEnum;
}

export interface IGetTraining extends IPostTraining {
  id: number;
  created_at: string;
  updated_at: string;
  users_list: IGetUser[];
}
