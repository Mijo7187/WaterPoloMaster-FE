import dayjs from "dayjs";
import { IGetContractInstallment } from "@modules/contractInstallment/contractInstallment.types";
import { PROGRAM_LABELS } from "@modules/membership/membership.constants";
import { IGetMembership } from "@modules/membership/membership.types";
import { IGetTournament } from "@modules/tournament/tournament.types";
import { IGetTraining } from "@modules/training/training.types";
import { PAGINATION_INITIAL_STATE } from "@stores";

import {
  SifarniciApiMapConfig,
  SifarniciMapConfig,
  SifarniciTypeEnum,
  SifarniciValueConfig,
} from "./sifarnici.types";

const formatDate = (value?: string | null) =>
  value ? dayjs(value).format("DD-MM-YYYY") : "";

export const SIFARNIK_INITIAL_VALUE: SifarniciValueConfig = {
  items: [],
  pagination: PAGINATION_INITIAL_STATE,
};

export const SIFARNICI_API_URL_MAP: SifarniciApiMapConfig = {
  [SifarniciTypeEnum.COMPANY]: "/company",
  [SifarniciTypeEnum.CITY]: "/city",
  [SifarniciTypeEnum.COUNTRY]: "/country",
  [SifarniciTypeEnum.EXERCISE_OPTION]: "/exercise-option",
  [SifarniciTypeEnum.USER]: "/users",
  [SifarniciTypeEnum.SEASON]: "/season",
  [SifarniciTypeEnum.SELECTION]: "/selection",
  [SifarniciTypeEnum.MEMBERSHIP]: "/membership",
  [SifarniciTypeEnum.CONTRACT_INSTALLMENT]: "/contract-installment",
  [SifarniciTypeEnum.TOURNAMENT]: "/tournament",
  [SifarniciTypeEnum.TRAINING]: "/training",
};

export const SIFARNICI_MAP_CONFIG: SifarniciMapConfig = {
  [SifarniciTypeEnum.COMPANY]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.CITY]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.COUNTRY]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.EXERCISE_OPTION]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.USER]: {
    labelAccessor: ["first_name", "last_name"],
  },
  [SifarniciTypeEnum.SEASON]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.SELECTION]: {
    labelAccessor: ["name"],
  },
  [SifarniciTypeEnum.MEMBERSHIP]: {
    // The bare name says nothing about what the plan costs or how long it runs,
    // and that is exactly what is being picked when signing a contract.
    labelAccessor: (item) => {
      const membership = item as IGetMembership;
      return `${membership.name} · ${PROGRAM_LABELS[membership.program]} · ${membership.months_count} mes.`;
    },
  },
  [SifarniciTypeEnum.CONTRACT_INSTALLMENT]: {
    labelAccessor: (item) => {
      const installment = item as IGetContractInstallment;
      return `${formatDate(installment.due_date)} – ${installment.amount ?? ""}`;
    },
  },
  [SifarniciTypeEnum.TOURNAMENT]: {
    labelAccessor: (item) => {
      const tournament = item as IGetTournament;
      return `${formatDate(tournament.from_date)} – ${formatDate(tournament.to_date)}`;
    },
  },
  [SifarniciTypeEnum.TRAINING]: {
    labelAccessor: (item) => {
      const training = item as IGetTraining;
      return `${formatDate(training.training_date)} ${training.start_time}`;
    },
  },
};
