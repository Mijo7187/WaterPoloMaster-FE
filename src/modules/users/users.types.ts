import { Dayjs } from "dayjs";
import { UserRolesEnum } from "@modules/auth/auth.types";

export interface IPostUser {
  email: string;
  roles: UserRolesEnum[];
  is_active: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  address?: string;
  address_number?: string;
  date_of_birth: string | Dayjs;
}

export interface IGetUser extends IPostUser {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface FUser {
  is_active: boolean;
  first_name__ilike: string;
  last_name__ilike: string;
  company_id: string;
}
