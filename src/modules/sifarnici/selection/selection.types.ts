export interface IPostSelection {
  company_id: number | null;
  name: string;
  age_min?: number | null;
  age_max?: number | null;
}

export interface IGetSelection extends IPostSelection {
  id: number;
}

export interface FSelection {
  name__ilike?: string;
  company_id?: number | null;
}
