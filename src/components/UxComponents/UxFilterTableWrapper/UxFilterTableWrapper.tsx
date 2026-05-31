import { FC } from "react";

import { Flex } from "antd";
import { observer } from "mobx-react-lite";

import styles from "./UxFilterTableWrapper.module.scss";

interface IUxFilterTableWrapperProps {
  filters: React.ReactNode;
  table: React.ReactNode;
  pagination: React.ReactNode;
}

export const UxFilterTableWrapper: FC<IUxFilterTableWrapperProps> = observer(
  ({ filters, table, pagination }) => {
    return (
      <Flex className={styles.wrapper}>
        <div className={styles.filters}>{filters && filters}</div>
        {table}
        <div className={styles.pagination}>{pagination && pagination}</div>
      </Flex>
    );
  },
);
