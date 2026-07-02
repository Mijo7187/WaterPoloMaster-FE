import React from "react";

import { Button as ANTButton, ButtonProps } from "antd";

import styles from "./UxButton.module.scss";
// import clsx from "clsx";

export interface IUxButtonProps extends ButtonProps {
  testId: string;
}

export const UxButton: React.FC<IUxButtonProps> = ({ testId, ...rest }) => {
  return (
    <div className={styles.btnWrapper}>
      <ANTButton {...rest} data-testid={`${testId}-btn`} />
    </div>
  );
};
