import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { IUxPaginationProps, UxPagination } from "@components/UxComponents";
import { PaginationEnum, paginationStore } from "@stores/index";

// import { usePaginationUrl } from "./usePaginationUrl";

interface IUrlPaginationProps extends IUxPaginationProps {
  handlePaginationChange: () => void;
  paginationName: PaginationEnum;
}

export const UrlPagination: FC<IUrlPaginationProps> = observer(
  ({ paginationName, handlePaginationChange, ...rest }) => {
    // usePaginationUrl(paginationName);

    // Reset on unmount — list pages and profile tabs share a pagination key,
    // so a page left on e.g. page 3 must not leak into the next table.
    useEffect(() => {
      return () => {
        paginationStore.remove(paginationName);
      };
    }, [paginationName]);

    const pagination = paginationStore.get(paginationName);

    const changePagination = (page: number, pageSize: number) => {
      paginationStore.set(paginationName, { page, size: pageSize });
      handlePaginationChange();
    };

    return (
      <div id={paginationName}>
        <UxPagination
          {...rest}
          current={pagination.page}
          pageSize={pagination.size}
          total={pagination.total}
          style={{ padding: "10px" }}
          align="center"
          onChange={changePagination}
          showSizeChanger={false}
        />
      </div>
    );
  },
);
