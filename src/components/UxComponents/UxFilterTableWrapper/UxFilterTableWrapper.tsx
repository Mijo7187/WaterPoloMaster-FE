import { FC, ReactNode } from "react";

import { Flex } from "antd";
import { observer } from "mobx-react-lite";

import styles from "./UxFilterTableWrapper.module.scss";

interface IUxFilterTableWrapperProps {
  table: ReactNode;
  filters?: ReactNode;
  pagination?: ReactNode;
}

export const UxFilterTableWrapper: FC<IUxFilterTableWrapperProps> = observer(
  ({ filters, table, pagination }) => {
    return (
      <Flex className={styles.wrapper}>
        {filters && <div className={styles.filters}>{filters}</div>}
        {table}
        {pagination && <div className={styles.pagination}>{pagination}</div>}
      </Flex>
    );
  },
);
