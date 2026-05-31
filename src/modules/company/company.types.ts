import { IGetCity } from "@modules/sifarnici/city/city.types";
import { IGetCountry } from "@modules/sifarnici/country/country.types";

export enum CompanyTypeEnum {
  CLUB = "CLUB",
  POOL = "POOL",
  TOURNAMENT = "TOURNAMENT",
  SUPPLIER = "SUPPLIER",
}

export interface IPostCompany {
  name: string;
  city_id: string;
  country_id: string;
  phone_number: string;
  email: string;
  company_type: CompanyTypeEnum;
  address?: string;
}

export interface IGetCompany extends IPostCompany {
  id: number;
  created_at: string;
  updated_at: string;
  city: IGetCity;
  country: IGetCountry;
}

export interface FCompany {
  name__ilike?: string;
}

export type ICompanyFilters = FCompany;
