import { IGetCountry } from "../country/country.types";

export interface IPostCity {
  name: string;
  country_id: string;
}

export interface IGetCity extends IPostCity {
  id: number;
  created_at: string;
  updated_at: string;
  country: IGetCountry;
}

export interface FCity {
  name__ilike?: string;
  is_active?: boolean | null;
}
