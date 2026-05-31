import { IPostTraining, TrainingStatusEnum } from "./trainings.types";

export const TRAINING_INITIAL_STATE: IPostTraining = {
  pool_id: null,
  company_id: null,
  start_training_date_time: "",
  end_training_date_time: "",
  price: null,
  payed: false,
  status: TrainingStatusEnum.INCOMING,
};
