import { IGetPagination } from "./pagination.types";

export const PAGINATION_INITIAL_STATE: IGetPagination = {
  total: 0,
  pages: 0,
  page: 1,
  size: 50,
};
