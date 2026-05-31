import { axiosMain } from "@config/axiosConfig";
import { IApiGetResponse } from "@stores";

import {
  IGetAuthUser,
  IPostAuthUser,
  IRequestPasswordReset,
  ISetNewPassword,
} from "./auth.types";

const postLogin = (values: IPostAuthUser): IApiGetResponse<IGetAuthUser> => {
  return axiosMain.post("/auth/login", values);
};

const requestPasswordReset = (values: IRequestPasswordReset) => {
  return axiosMain.post("/auth/resetPassword", values);
};

const setNewPassword = (values: ISetNewPassword) => {
  return axiosMain.post("/auth/resetPasswordForUser", values);
};

const refreshToken = (refreshToken: string) => {
  return axiosMain.post("/auth/refresh", { refreshToken });
};

export const authRepo = {
  postLogin,
  requestPasswordReset,
  setNewPassword,
  refreshToken,
};
