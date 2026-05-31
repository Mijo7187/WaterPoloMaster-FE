import { FC } from "react";

import { observer } from "mobx-react-lite";
import { IUxPaginationProps, UxPagination } from "@components/UxComponents";
import { PaginationEnum, paginationStore } from "@stores";

import { usePaginationUrl } from "./usePaginationUrl";

interface IAppPaginationProps extends IUxPaginationProps {
  handlePaginationChange: () => void;
  paginationName: PaginationEnum;
}

export const AppPagination: FC<IAppPaginationProps> = observer(
  ({ paginationName, handlePaginationChange, ...rest }) => {
    usePaginationUrl(paginationName);

    const pagination = paginationStore.get(paginationName);

    const changePagination = (page: number, pageSize: number) => {
      paginationStore.set(paginationName, { page, size: pageSize });
      handlePaginationChange();
    };

    return (
      <div id={paginationName}>
        <UxPagination
          {...rest}
          current={pagination?.page}
          pageSize={pagination?.size}
          total={pagination?.total}
          onChange={changePagination}
          showSizeChanger={true}
          showTotal={(_, range) => {
            return `${range[0]}-${range[1]} from ${pagination?.total ?? "0"}`;
          }}
        />
      </div>
    );
  },
);
