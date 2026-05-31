export interface IPostCountry {
  name: string;
  is_active: boolean;
}

export interface IGetCountry extends IPostCountry {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface FCountry {
  name__ilike?: string;
  is_active?: boolean | null;
}
