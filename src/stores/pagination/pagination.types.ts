export interface IPostPagination {
  page: number;
  size: number;
  // order_by?: string;
}

export interface IGetPagination extends IPostPagination {
  total: number;
  pages: number;
}

export enum PaginationEnum {
  USER_PAGINATION = "user_p",
  COMPANY_PAGINATION = "company_p",
  SIFARNICI_PAGINATION = "sifarnici_p",
  TRAINING_PAGINATION = "training_p",
  PAYMENT_PAGINATION = "payment_p",
  TOURNAMENT_PAGINATION = "tournament_p",
  CONTRACT_PAGINATION = "contract_p",
  CONTRACT_INSTALLMENT_PAGINATION = "contract_installment_p",
  SEASON_PAGINATION = "season_p",
  MEMBERSHIP_PAGINATION = "membership_p",
  // INVENTORY_PAGINATION = "inventory_p",
  // PRODUCT_PAGINATION = "product_p",
}
