import to from "await-to-js";
import { makeAutoObservable } from "mobx";
import { usersService } from "@modules/users/users.service";
import { IGetUser } from "@modules/users/users.types";
import { RoutePathsEnum } from "@router/router.types";
import storage, { StorageEnum } from "@storage/storage";

import { authService } from "./auth.service";
import {
  IGetAuthUser,
  IPostAuthUser,
  IRequestPasswordReset,
  ISetNewPassword,
  UserRolesEnum,
} from "./auth.types";

type AuthStoreData = Pick<AuthStore, "authUser" | "authUserInfo">;

class AuthStore {
  constructor() {
    makeAutoObservable(this);
    this.initFromStorage();
  }
  authUser: IGetAuthUser = null as unknown as IGetAuthUser;
  authUserInfo: IGetUser | null = null;

  initFromStorage = () => {
    const storedUser = storage.getData(
      StorageEnum.AUTH_USER,
    ) as IGetAuthUser | null;
    if (storedUser) {
      const storedUserInfo = storage.getData(
        StorageEnum.AUTH_USER_INFO,
      ) as IGetUser | null;

      this.authUser = storedUser;
      if (storedUserInfo) {
        this.authUserInfo = storedUserInfo;
      }
    }
  };

  get getAuthUser(): IGetAuthUser {
    return this.authUser;
  }

  get getAuthUserInfo(): IGetUser {
    return this.authUserInfo ?? ({} as IGetUser);
  }

  get getAuthUserRoles(): UserRolesEnum[] {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return this.getAuthUser?.roles?.length
      ? this.getAuthUser.roles
      : ([] as UserRolesEnum[]);
  }

  get getIsSuperAdmin() {
    return this.getAuthUserRoles.includes(UserRolesEnum.SUPER_ADMIN);
  }

  handleChange<K extends keyof AuthStoreData>(key: K, value: AuthStoreData[K]) {
    (this as AuthStoreData)[key] = value;
  }

  postLogin = async (values: IPostAuthUser) => {
    const [err, res] = await to<IGetAuthUser>(authService.postLogin(values));
    if (err) return Promise.reject(err);
    this.handleChange("authUser", res);
    console.log(res, "Login response");
    storage.setData(StorageEnum.AUTH_USER, res);
    const [userErr, userObj] = await to(usersService.getUserById(res.user_id));
    if (userErr) return Promise.reject(userErr);
    storage.setData(StorageEnum.AUTH_USER_INFO, userObj);
    this.handleChange("authUserInfo", userObj);
    return res;
  };

  requestPasswordReset = async (values: IRequestPasswordReset) => {
    const [err, res] = await to(authService.requestPasswordReset(values));
    if (err) return Promise.reject(err);
    return res;
  };

  setNewPassword = async (values: ISetNewPassword) => {
    const [err, res] = await to(authService.setNewPassword(values));
    if (err) return Promise.reject(err);
    return res;
  };

  logoutUser = () => {
    this.handleChange("authUser", null as unknown as IGetAuthUser);
    this.handleChange("authUserInfo", null);
    storage.removeData(StorageEnum.AUTH_USER);
    storage.removeData(StorageEnum.AUTH_USER_INFO);
    window.location.replace(`/${RoutePathsEnum.LOGIN}`);
  };
}

export const authStore = new AuthStore();
