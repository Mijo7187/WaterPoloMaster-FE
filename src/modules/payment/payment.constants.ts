import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";

import {
  IPostPayment,
  PayableTypeEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
} from "./payment.types";

export const PAYMENT_ENDPOINTS = {
  PAYMENT: "/payment/",
};

export const PAYMENT_INITIAL_STATE: IPostPayment = {
  sender_wallet_id: "",
  receiver_wallet_id: "",
  payment_type: PaymentTypeEnum.USER_MEMBERSHIP_FEE,
  amount: null,
  status: PaymentStatusEnum.PENDING,
  description: "",
  payable_type: null,
  payable_id: null,
};

export const PAYMENT_STATUS_OPTIONS = Object.values(PaymentStatusEnum).map(
  (value) => ({ label: value, value }),
);

export const PAYMENT_TYPE_LABELS: Record<PaymentTypeEnum, string> = {
  [PaymentTypeEnum.USER_MEMBERSHIP_FEE]: "Članarina",
  [PaymentTypeEnum.CLUB_SALARY_USER]: "Plata (klub → korisnik)",
  // [PaymentTypeEnum.USER_TOURNAMENT_FEE]: "Kotizacija za turnir",
  // [PaymentTypeEnum.CLUB_TOURNAMENT_POOL]: "Klub – bazen za turnir",
  // [PaymentTypeEnum.CLUB_TRAINING_POOL]: "Klub – bazen za trening",
};

export const PAYMENT_TYPE_OPTIONS = Object.values(PaymentTypeEnum).map(
  (value) => ({ label: PAYMENT_TYPE_LABELS[value], value }),
);

export const PAYABLE_TYPE_LABELS: Record<PayableTypeEnum, string> = {
  [PayableTypeEnum.CONTRACT_INSTALLMENT]: "Rata ugovora",
  [PayableTypeEnum.TOURNAMENT]: "Turnir",
  [PayableTypeEnum.TRAINING]: "Trening",
};

export const PAYABLE_TYPE_OPTIONS = Object.values(PayableTypeEnum).map(
  (value) => ({ label: PAYABLE_TYPE_LABELS[value], value }),
);

/** Which šifarnik feeds the `payable_id` picker for each payable type. */
export const PAYABLE_TYPE_SIFARNIK_MAP: Record<
  PayableTypeEnum,
  SifarniciTypeEnum
> = {
  [PayableTypeEnum.CONTRACT_INSTALLMENT]:
    SifarniciTypeEnum.CONTRACT_INSTALLMENT,
  [PayableTypeEnum.TOURNAMENT]: SifarniciTypeEnum.TOURNAMENT,
  [PayableTypeEnum.TRAINING]: SifarniciTypeEnum.TRAINING,
};
