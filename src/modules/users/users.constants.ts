import { IPostUser } from "./users.types";

export const USER_INITIAL_STATE: IPostUser = {
  first_name: "",
  last_name: "",
  email: "",
  roles: [],
  is_active: true,
  phone_number: "",
  date_of_birth: "",
  company_id: null,
};
