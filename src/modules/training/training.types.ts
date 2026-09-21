import { IGetCompany } from "@modules/company";
import {
  IGetExerciseOption,
  TrainingSegmentEnum,
} from "@modules/sifarnici/exerciseOption/exerciseOption.types";
import { IGetUser } from "@modules/users";
import { FiltersWithPagination } from "@stores";

export enum TrainingStatusEnum {
  INCOMING = "INCOMING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
}

export enum EventTypeEnum {
  GOAL = "GOAL",
  ASSIST = "ASSIST",
  SAVE = "SAVE",
  EXCLUSION = "EXCLUSION",
  PENALTY = "PENALTY",
}

// Which team a sparring event/participant counts for.
export enum SparringSideEnum {
  HOME = "HOME",
  AWAY = "AWAY",
}
// #region General
export interface IPostTraining {
  pool_id: number | null;
  company_id: number | null;
  season_id: number | null;
  training_date: string;
  start_time: string;
  end_time: string;
  price: number | null;
  status: TrainingStatusEnum;
}

export interface IGetTraining extends IPostTraining {
  id: number;
  number_of_players?: number;
  created_at: string;
  updated_at: string;
}

export type FTrainingList = FiltersWithPagination<{
  pool_id?: number | null;
  company_id?: number | null;
  season_id?: number | null;
  training_date__ilike?: string;
  start_time?: string;
  end_time?: string;
  price?: number | null;
  status?: TrainingStatusEnum;
}>;

// #endregion General
// #region Exercise

export interface IGetExerciseSegment extends IPostExerciseSegment {
  id: number;
  exercise_option?: IGetExerciseOption;
}

export interface IPostExerciseSegment {
  exercise_option_id: number;
  position?: number | null;
  group_index?: number | null;
  meters?: number | null;
  sets?: number | null;
  reps?: number | null;
  weight_kg?: number | null;
  duration_seconds?: number | null;
}

export interface IPostBaseExerciseSegment extends ISegmentCreateBase {
  segment_type:
    | TrainingSegmentEnum.SWIMMING
    | TrainingSegmentEnum.GYM
    | TrainingSegmentEnum.WORK_WITH_BALL;
  exercises?: (IGetExerciseSegment | IPostExerciseSegment)[];
}
// #region Exercise
// #region Sparring

export interface IPostSparringEvent {
  user_id?: number | null; // null = opponent action
  side?: SparringSideEnum | null;
  event_type: EventTypeEnum;
  minute?: number | null;
  note?: string | null;
}

export interface IGetSparringEvent extends IPostSparringEvent {
  id: number;
}

export interface IPostSparringParticipant {
  user_id: number;
  side: SparringSideEnum;
}

export interface IGetSparringParticipant extends IPostSparringParticipant {
  id: number;
}

export interface IPostSparringSegment {
  home_company_id?: number | null;
  away_company_id?: number | null;
  notes?: string | null;
  participants?: IGetSparringParticipant[];
  events?: IGetSparringEvent[];
}

export interface IGetSparringSegment extends IPostSparringSegment {
  home_company?: IGetCompany;
  away_company?: IGetCompany;
  id: number;
}

export interface IPostBaseSparringSegment extends ISegmentCreateBase {
  segment_type: TrainingSegmentEnum.SPARRING;
  sparring?: IGetSparringSegment;
}

// #endregion Sparring
interface ISegmentCreateBase {
  training_id: number;
  duration_minutes?: number | null;
  notes?: string | null;
}

export interface IPostSegmentModalForm {
  segment_type: TrainingSegmentEnum;
  home_company_id?: number | null;
  away_company_id?: number | null;
  between_us?: boolean;
}

export type IPostTrainingSegment =
  | IPostBaseExerciseSegment
  | IPostBaseSparringSegment;

export type IGetTrainingSegmente = IPostTrainingSegment & {
  id: number;
};

export type IGetBaseExerciseSegment = IPostBaseExerciseSegment & {
  id: number;
};

// Live sparring scoreboard view models (client-side UI state).

export interface IPlayerOption {
  label: string;
  value: number;
}

// A logged event held in local scoreboard state. `clientId` keys the React list
// and lets us remove a single event; it is dropped when building the API payload.
export interface ISparringEventRow extends IPostSparringEvent {
  clientId: string;
  side: SparringSideEnum;
}

// An unfinished row in the event modal — the action is picked last.
export interface IEventDraftRow {
  clientId: string;
  user_id: number | null;
  event_type?: EventTypeEnum;
}

// #endregion Segments

// #region User

export interface IPostTrainingUsersList {
  training_id: number;
  user_id: number;
}

export interface IGetTrainingUsersList extends IPostTrainingUsersList {
  id: number;
  training: IGetTraining;
  user: IGetUser;
  created_at: string;
}

export interface FTrainingUsersList {
  training_id?: number;
  user_id?: number;
  page?: number;
  size?: number;
}

export interface FUsersNotInTraining {
  training_id: number;
  company_id: number;
  first_name__ilike?: string;
}
// #endregion User
