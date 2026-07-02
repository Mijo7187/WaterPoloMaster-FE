export interface IPostSwimmingDiscipline {
  name: string;
  company_id: number;
  is_active: boolean;
}

export interface IGetSwimmingDiscipline extends IPostSwimmingDiscipline {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface FSwimmingDiscipline {
  name__ilike?: string;
  is_active?: boolean | null;
}
