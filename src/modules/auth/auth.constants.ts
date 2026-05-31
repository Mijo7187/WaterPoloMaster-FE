import { IPostAuthUser } from "./auth.types";

export const LOGIN_INITIAL_STATE: IPostAuthUser = {
  email: "",
  password: "",
};

// export const AUTH_USER_INITIAL_STATE: IGetAuthUser = {
//   access_token: "",
//   refresh_token: "",
//   user_id: ,
//   roles: [UserRolesEnum.ADMIN],
//   company_id: null,
// };
