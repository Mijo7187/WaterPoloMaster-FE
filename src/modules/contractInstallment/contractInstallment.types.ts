import { IPostPagination } from "@stores";

export interface IPostContractInstallment {
  contract_id: number | null;
  period_start: string;
  period_end: string;
  due_date: string;
  amount: number | null;
  waived: boolean;
}

export interface IGetContractInstallment extends IPostContractInstallment {
  id: number;
}

export interface FContractInstallmentList extends IPostPagination {
  contract_id?: number | null;
  waived?: boolean | null;
}
