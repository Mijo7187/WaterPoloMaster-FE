import { IPostPayment, PaymentStatusEnum } from "./payment.types";

export const PAYMENT_ENDPOINTS = {
  PAYMENT: "/payment/",
};

export const PAYMENT_INITIAL_STATE: IPostPayment = {
  sender_wallet_id: "",
  receiver_wallet_id: "",
  payment_type_id: 0,
  amount: 0,
  status: PaymentStatusEnum.PENDING,
  description: "",
};

export const PAYMENT_STATUS_OPTIONS = Object.values(PaymentStatusEnum).map(
  (value) => ({ label: value, value }),
);
