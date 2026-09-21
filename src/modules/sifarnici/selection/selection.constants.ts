import { FSelection, IPostSelection } from "./selection.types";

export const SELECTION_INITIAL_STATE: IPostSelection = {
  company_id: null,
  name: "",
  age_min: null,
  age_max: null,
};

export const SELECTION_FILTERS_INITIAL_STATE: FSelection = {
  name__ilike: "",
  company_id: null,
};
