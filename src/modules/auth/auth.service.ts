import { IApiGetResponse } from "@stores";

import { authRepo } from "./auth.repo";
import {
  IGetAuthUser,
  IPostAuthUser,
  IRequestPasswordReset,
  ISetNewPassword,
} from "./auth.types";

class AuthService {
  postLogin = (values: IPostAuthUser): IApiGetResponse<IGetAuthUser> =>
    authRepo.postLogin(values);

  requestPasswordReset = (values: IRequestPasswordReset) =>
    authRepo.requestPasswordReset(values);

  setNewPassword = (values: ISetNewPassword) => authRepo.setNewPassword(values);
}
export const authService = new AuthService();
