import { IGetCompany } from "@modules/company/company.types";
import { IGetContractInstallment } from "@modules/contractInstallment/contractInstallment.types";
import { IGetTournament } from "@modules/tournament/tournament.types";
import { IGetTraining } from "@modules/training/training.types";
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
  USER_MEMBERSHIP_FEE = "user_membership_fee",
  CLUB_SALARY_USER = "club_salary_user",
  // USER_TOURNAMENT_FEE = "user_tournament_fee",
  // CLUB_TOURNAMENT_POOL = "club_tournament_pool",
  // CLUB_TRAINING_POOL = "club_training_pool",
}

// What a payment is *for*. The backend resolves `payable_id` against this and
// embeds the object as `payable`.
export enum PayableTypeEnum {
  CONTRACT_INSTALLMENT = "contract_installment",
  TOURNAMENT = "tournament",
  TRAINING = "training",
}

export type IGetWallet = IGetCompany | IGetUser;

export type IGetPayable =
  | IGetContractInstallment
  | IGetTournament
  | IGetTraining;

export interface IPostPayment {
  sender_wallet_id: string;
  receiver_wallet_id: string;
  payment_type: PaymentTypeEnum;
  amount: number | null;
  status?: PaymentStatusEnum;
  description?: string;
  // Sent together or not at all — the backend rejects a lone half and also
  // validates which payable_type each payment_type demands.
  payable_type?: PayableTypeEnum | null;
  payable_id?: number | null;
}

export interface IGetPayment extends IPostPayment {
  id: string;
  created_at: string;
  sender_wallet: IGetWallet;
  receiver_wallet: IGetWallet;
  amount: number;
  status: PaymentStatusEnum;
  payable?: IGetPayable;
  wallet_id?: string;
}

/** The edit drawer only ever moves a payment's status. */
export type IPutPayment = Partial<IPostPayment>;

export interface FPayment {
  status?: PaymentStatusEnum;
  payable_type?: PayableTypeEnum | null;
  payable_id?: number | null;
}
