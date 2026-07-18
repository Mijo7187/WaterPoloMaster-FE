import { IPostTraining, TrainingStatusEnum } from "./training.types";

export const TRAINING_ENDPOINTS = {
  TRAINING: "/training/",
  TRAINING_USERS_LIST: "/training-users/",
  USERS_NOT_IN_TRAINING: "/training-users/users-not-in-training",
};

export const TRAINING_INITIAL_STATE: IPostTraining = {
  pool_id: null,
  company_id: null,
  training_date: "",
  start_time: "",
  end_time: "",
  price: null,
  status: TrainingStatusEnum.INCOMING,
};
