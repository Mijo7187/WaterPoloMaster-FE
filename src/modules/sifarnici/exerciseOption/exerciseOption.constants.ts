import {
  FExerciseOption,
  IPostExerciseOption,
  TrainingSegmentEnum,
} from "./exerciseOption.types";

export const EXERCISE_OPTION_INITIAL_STATE: IPostExerciseOption = {
  segment_type: TrainingSegmentEnum.SWIMMING,
  code: null,
  name: "",
  is_active: true,
};

export const EXERCISE_OPTION_FILTERS_INITIAL_STATE: FExerciseOption = {
  code__ilike: "",
  name__ilike: "",
  segment_type: null,
  is_active: null,
};

export const TRAINING_SEGMENT_LABEL_MAP: Record<TrainingSegmentEnum, string> = {
  [TrainingSegmentEnum.SWIMMING]: "Plivanje",
  [TrainingSegmentEnum.SPARRING]: "Sparing",
  [TrainingSegmentEnum.GYM]: "Teretana",
  [TrainingSegmentEnum.WORK_WITH_BALL]: "Rad sa loptom",
};

// Exercise-only options for the ExerciseOption codebook — sparring has no exercise options.
export const TRAINING_SEGMENT_OPTIONS = Object.values(TrainingSegmentEnum)
  .filter((segment) => segment !== TrainingSegmentEnum.SPARRING)
  .map((segment) => ({
    label: TRAINING_SEGMENT_LABEL_MAP[segment],
    value: segment,
  }));
