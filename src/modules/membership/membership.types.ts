import { IPostPagination } from "@stores";

/**
 * Moved here from the removed offeringPrice module — membership owns the
 * program dimension now.
 */
export enum ProgramEnum {
  SWIMMING = "swimming",
  WATERPOLO = "waterpolo",
}

export interface IPostMembership {
  company_id: number | null;
  name: string;
  program: ProgramEnum;
  months_count: number | null;
  price_month: number | null;
  installments_count: number | null;
  is_active: boolean;
}

export interface IGetMembership extends IPostMembership {
  id: number;
  company_id: number;
  months_count: number;
  price_month: number;
  installments_count: number;
  /** Server-computed (price_month × months_count) — never sent on write. */
  price_total: number;
}

export interface FMembership {
  company_id?: number | null;
  program?: ProgramEnum | null;
  name__ilike?: string | null;
  months_count?: number | null;
  is_active?: boolean | null;
}

export type FMembershipList = FMembership & IPostPagination;
