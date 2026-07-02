import { IGetCompany } from "@modules/company/company.types";
import { IGetPaymentType } from "@modules/sifarnici/paymentType/paymentType.types";
import { IGetUser } from "@modules/users/users.types";

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export type IGetWallet = IGetCompany | IGetUser;

export interface IPostPayment {
  sender_wallet_id: string;
  receiver_wallet_id: string;
  payment_type_id: number;
  amount: number;
  status: PaymentStatusEnum;
  description?: string;
}

export interface IGetPayment extends IPostPayment {
  id: string;
  created_at: string;
  sender_wallet: IGetWallet;
  receiver_wallet: IGetWallet;
  payment_type: IGetPaymentType;
}

export interface FPayment {
  status?: PaymentStatusEnum;
}
