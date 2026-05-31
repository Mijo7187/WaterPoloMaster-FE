import { FC } from "react";

import { Pagination as ANTPagination, PaginationProps } from "antd";

export interface IUxPaginationProps extends PaginationProps {
  testId: string;
}

export const UxPagination: FC<IUxPaginationProps> = ({ testId, ...props }) => {
  return <ANTPagination {...props} data-testid={`pagination-${testId}`} />;
};
