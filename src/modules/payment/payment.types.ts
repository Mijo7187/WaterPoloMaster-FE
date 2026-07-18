import { IGetCompany } from "@modules/company/company.types";
import { IGetUser } from "@modules/users/users.types";

export enum PaymentStatusEnum {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

// Mirrors the backend PaymentTypeCode enum — the former `payment_type` šifarnik
// table was removed and replaced by this fixed, code-owned set. Each type is
// hardwired to specific sender/receiver semantics and a business-context id.
export enum PaymentTypeEnum {
  USER_QUARTERLY_FEE = "user_quarterly_fee",
  USER_TOURNAMENT_FEE = "user_tournament_fee",
  CLUB_TOURNAMENT_POOL = "club_tournament_pool",
  CLUB_SALARY_USER = "club_salary_user",
  CLUB_TRAINING_POOL = "club_training_pool",
}

export type IGetWallet = IGetCompany | IGetUser;

export interface IPostPayment {
  status: PaymentStatusEnum;
  description?: string;
}

export interface IGetPayment extends IPostPayment {
  id: string;
  created_at: string;
  sender_wallet: IGetWallet;
  receiver_wallet: IGetWallet;
  amount: number;
  sender_wallet_id: string;
  receiver_wallet_id: string;
  payment_type: PaymentTypeEnum;
  quarter_id?: number;
  tournament_id?: number;
  training_id?: number;
  wallet_id?: string;
}

export interface FPayment {
  status?: PaymentStatusEnum;
}
