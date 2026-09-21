import { IGetContractInstallment } from "@modules/contractInstallment/contractInstallment.types";
import {
  IGetMembership,
  ProgramEnum,
} from "@modules/membership/membership.types";
import { IGetUser } from "@modules/users/users.types";
import { IPostPagination } from "@stores";

export enum ContractTypeEnum {
  MEMBERSHIP = "membership",
  STAFF = "staff",
}

export enum ContractStatusEnum {
  DRAFT = "draft",
  ACTIVE = "active",
  ENDED = "ended",
  CANCELLED = "cancelled",
}

/**
 * One row of a MEMBERSHIP term's schedule, sent on create. The backend turns
 * each entry into a contract_installment row.
 */
export interface IContractInstallmentItem {
  period_start: string;
  period_end: string;
  due_date: string;
  amount: number | null;
}

export interface IPostContract {
  company_id: number | null;
  user_id: number | null;
  contract_type: ContractTypeEnum;
  /**
   * MEMBERSHIP only — the catalog plan the contract was sold off. A STAFF
   * salary is never sold from the catalog, so it carries no membership.
   */
  membership_id?: number | null;
  start_date: string;
  end_date?: string | null;
  /** MEMBERSHIP: sum of installments_list. STAFF: the monthly salary. */
  amount?: number | null;
  /**
   * MEMBERSHIP only — the term's schedule. Must sum to `amount`. STAFF
   * installments come from the monthly salary job, never from here.
   */
  installments_list?: IContractInstallmentItem[];
  status?: ContractStatusEnum;
  signed_at?: string | null;
}

export interface IGetContract extends IPostContract {
  id: number;
  amount: number | null;
  /**
   * Read-only — `contract` has no program column. It reaches the read model
   * through the membership relationship.
   */
  program: ProgramEnum | null;
  status: ContractStatusEnum;
  user: IGetUser;
  /** Nested read model — rehydrates the membership select label on edit. */
  membership?: IGetMembership | null;
  installments?: IGetContractInstallment[];
}

/**
 * The only fields PUT /contract/{id} accepts. `contract_type` is deliberately
 * absent — it fixes the payment direction, so changing it means
 * cancel-and-re-sign.
 */
export interface IPutContract {
  end_date?: string | null;
  amount?: number | null;
  status?: ContractStatusEnum;
  signed_at?: string | null;
}

export interface FContract {
  season_id?: number | null;
  status?: ContractStatusEnum | null;
  contract_type?: ContractTypeEnum | null;
  user_id?: number | null;
  company_id?: number | null;
}

export type FContractList = FContract & IPostPagination;
