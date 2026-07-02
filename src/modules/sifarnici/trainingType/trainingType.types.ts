export interface IPostTrainingType {
  name: string;
  company_id: number;
  is_active: boolean;
}

export interface IGetTrainingType extends IPostTrainingType {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface FTrainingType {
  name__ilike?: string;
  is_active?: boolean | null;
}
