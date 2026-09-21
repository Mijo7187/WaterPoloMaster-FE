import { TRAINING_SEGMENT_LABEL_MAP } from "@modules/sifarnici/exerciseOption/exerciseOption.constants";
import { TrainingSegmentEnum } from "@modules/sifarnici/exerciseOption/exerciseOption.types";

import {
  EventTypeEnum,
  IPostSegmentModalForm,
  IPostSparringSegment,
  IPostTraining,
  SparringSideEnum,
  TrainingStatusEnum,
} from "./training.types";

export const TRAINING_INITIAL_STATE: IPostTraining = {
  pool_id: null,
  company_id: null,
  season_id: null,
  training_date: "",
  start_time: "",
  end_time: "",
  price: null,
  status: TrainingStatusEnum.INCOMING,
};

export const TRAINING_STATUS_LABELS: Record<TrainingStatusEnum, string> = {
  [TrainingStatusEnum.INCOMING]: "Predstojeći",
  [TrainingStatusEnum.IN_PROGRESS]: "U toku",
  [TrainingStatusEnum.FINISHED]: "Završen",
  [TrainingStatusEnum.CANCELLED]: "Otkazan",
};

export const TRAINING_STATUS_OPTIONS = Object.values(TrainingStatusEnum).map(
  (value) => ({ label: TRAINING_STATUS_LABELS[value], value }),
);

// #region Segments

// Full segment-type set (incl. SPARRING) for the SegmentTrainingTab picker.
export const SEGMENT_TYPE_OPTIONS = Object.values(TrainingSegmentEnum).map(
  (segment) => ({
    label: TRAINING_SEGMENT_LABEL_MAP[segment],
    value: segment,
  }),
);

export type SegmentMetricKey =
  | "meters"
  | "sets"
  | "reps"
  | "weight_kg"
  | "duration_seconds";

// Which metric inputs each exercise row shows, per segment type.
export const SEGMENT_METRIC_FIELDS: Record<
  TrainingSegmentEnum,
  SegmentMetricKey[]
> = {
  [TrainingSegmentEnum.SWIMMING]: [
    "meters",
    "sets",
    "reps",
    "duration_seconds",
  ],
  [TrainingSegmentEnum.GYM]: ["sets", "reps", "weight_kg", "duration_seconds"],
  [TrainingSegmentEnum.WORK_WITH_BALL]: [
    "meters",
    "sets",
    "reps",
    "duration_seconds",
  ],
  // Sparring has no exercise rows — kept for an exhaustive Record.
  [TrainingSegmentEnum.SPARRING]: [],
};

export const SEGMENT_METRIC_LABEL_MAP: Record<SegmentMetricKey, string> = {
  meters: "Metri",
  sets: "Serije",
  reps: "Ponavljanja",
  weight_kg: "Težina (kg)",
  duration_seconds: "Trajanje (s)",
};

export const EXERCISE_ROW_INITIAL = {
  exercise_option_id: null,
  meters: null,
  sets: null,
  reps: null,
  weight_kg: null,
  duration_seconds: null,
};

export const SPARRING_INITIAL_STATE: IPostSparringSegment = {
  home_company_id: null,
  away_company_id: null,
  notes: null,
  participants: [],
  events: [],
};

export const SEGMENT_MODAL_INITIAL_STATE: IPostSegmentModalForm = {
  segment_type: TrainingSegmentEnum.SWIMMING,
  between_us: true,
  away_company_id: null,
  home_company_id: null,
};

export const SPARRING_SIDE_LABEL_MAP: Record<SparringSideEnum, string> = {
  [SparringSideEnum.HOME]: "Domaćin",
  [SparringSideEnum.AWAY]: "Gost",
};

export const SPARRING_SIDE_OPTIONS = Object.values(SparringSideEnum).map(
  (side) => ({
    label: SPARRING_SIDE_LABEL_MAP[side],
    value: side,
  }),
);

export const EVENT_TYPE_LABEL_MAP: Record<EventTypeEnum, string> = {
  [EventTypeEnum.GOAL]: "Gol",
  [EventTypeEnum.ASSIST]: "Asistencija",
  [EventTypeEnum.SAVE]: "Odbrana",
  [EventTypeEnum.EXCLUSION]: "Isključenje",
  [EventTypeEnum.PENALTY]: "Penal",
};

export const EVENT_TYPE_OPTIONS = Object.values(EventTypeEnum).map((type) => ({
  label: EVENT_TYPE_LABEL_MAP[type],
  value: type,
}));

// #endregion Segments
