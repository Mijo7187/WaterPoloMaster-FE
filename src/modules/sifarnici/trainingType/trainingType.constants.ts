import { authStore } from "@modules/auth/auth.store";

import { FTrainingType, IPostTrainingType } from "./trainingType.types";

export const TRAINING_TYPE_INITIAL_STATE: IPostTrainingType = {
  name: "",
  company_id: authStore.getAuthUser.company_id,
  is_active: true,
};

export const TRAINING_TYPE_FILTERS_INITIAL_STATE: FTrainingType = {
  name__ilike: "",
  is_active: null,
};
