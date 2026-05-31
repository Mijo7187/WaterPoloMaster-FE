import { FPaymentType, IPostPaymentType, PaymentDirectionEnum } from "./paymentType.types";

export const PAYMENT_TYPE_INITIAL_STATE: IPostPaymentType = {
  name: "",
  payment_direction: PaymentDirectionEnum.C_C,
  active: true,
};

export const PAYMENT_TYPE_FILTERS_INITIAL_STATE: FPaymentType = {
  name__ilike: "",
  active: null,
};
