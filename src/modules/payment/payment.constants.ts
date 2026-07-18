import { IPostPayment, PaymentStatusEnum, PaymentTypeEnum } from "./payment.types";

export const PAYMENT_ENDPOINTS = {
  PAYMENT: "/payment/",
};

export const PAYMENT_INITIAL_STATE: IPostPayment = {
  sender_wallet_id: "",
  receiver_wallet_id: "",
  payment_type: PaymentTypeEnum.USER_QUARTERLY_FEE,
  amount: 0,
  status: PaymentStatusEnum.PENDING,
  description: "",
};

export const PAYMENT_STATUS_OPTIONS = Object.values(PaymentStatusEnum).map(
  (value) => ({ label: value, value }),
);

export const PAYMENT_TYPE_LABELS: Record<PaymentTypeEnum, string> = {
  [PaymentTypeEnum.USER_QUARTERLY_FEE]: "Članarina (kvartal)",
  [PaymentTypeEnum.USER_TOURNAMENT_FEE]: "Kotizacija za turnir",
  [PaymentTypeEnum.CLUB_TOURNAMENT_POOL]: "Klub – bazen za turnir",
  [PaymentTypeEnum.CLUB_SALARY_USER]: "Plata (klub → korisnik)",
  [PaymentTypeEnum.CLUB_TRAINING_POOL]: "Klub – bazen za trening",
};

export const PAYMENT_TYPE_OPTIONS = Object.values(PaymentTypeEnum).map(
  (value) => ({ label: PAYMENT_TYPE_LABELS[value], value }),
);
