export enum UserRolesEnum {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  COACH = "COACH",
  PLAYER = "PLAYER",
  USER = "USER",
}

export interface IPostAuthUser {
  email: string;
  password: string;
}

export interface IGetAuthUser {
  access_token: string;
  refresh_token: string;
  user_id: number;
  roles: UserRolesEnum[];
  company_id: number;
}

export interface IRequestPasswordReset {
  email: string;
}

export interface ISetNewPassword {
  password: string;
  token: string;
  email: string;
}
