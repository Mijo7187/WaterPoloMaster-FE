export enum TrainingSegmentEnum {
  SWIMMING = "SWIMMING",
  SPARRING = "SPARRING",
  GYM = "GYM",
  WORK_WITH_BALL = "WORK_WITH_BALL",
}

export interface IPostExerciseOption {
  segment_type: TrainingSegmentEnum;
  code?: null | string;
  name: string;
  is_active: boolean;
}

export interface IGetExerciseOption extends IPostExerciseOption {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface FExerciseOption {
  code__ilike?: string;
  name__ilike?: string;
  segment_type?: TrainingSegmentEnum | null;
  is_active?: boolean | null;
}
