import { FC } from "react";

import { Tabs as ANTTabs, TabsProps } from "antd";

import styles from "./UxTabs.module.scss";
export interface IUxTabsProps extends TabsProps {
  testId: string;
}

export const UxTabs: FC<IUxTabsProps> = ({ testId, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <ANTTabs {...props} data-testid={`tabs-${testId}`} />
    </div>
  );
};
