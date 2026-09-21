import { FMembership, IPostMembership, ProgramEnum } from "./membership.types";

export const MEMBERSHIP_ENDPOINTS = {
  MEMBERSHIP: "/membership/",
};

export const MEMBERSHIP_INITIAL_STATE: IPostMembership = {
  company_id: null,
  name: "",
  program: ProgramEnum.SWIMMING,
  months_count: null,
  price_month: null,
  installments_count: 1,
  is_active: true,
};

export const MEMBERSHIP_FILTERS_INITIAL_STATE: FMembership = {
  program: null,
  name__ilike: null,
  months_count: null,
  is_active: null,
};

export const PROGRAM_LABELS: Record<ProgramEnum, string> = {
  [ProgramEnum.SWIMMING]: "Plivanje",
  [ProgramEnum.WATERPOLO]: "Vaterpolo",
};

export const PROGRAM_OPTIONS = Object.values(ProgramEnum).map((value) => ({
  label: PROGRAM_LABELS[value],
  value,
}));
