import { authStore } from "@modules/auth/auth.store";

import {
  FSwimmingDiscipline,
  IPostSwimmingDiscipline,
} from "./swimmingDiscipline.types";

export const SWIMMING_DISCIPLINE_INITIAL_STATE: IPostSwimmingDiscipline = {
  name: "",
  company_id: authStore.getAuthUser.company_id,
  is_active: true,
};

export const SWIMMING_DISCIPLINE_FILTERS_INITIAL_STATE: FSwimmingDiscipline = {
  name__ilike: "",
  is_active: null,
};
