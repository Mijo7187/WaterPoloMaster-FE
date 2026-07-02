import { FC } from "react";

import { Card as ANTCard, CardProps } from "antd";
import clsx from "clsx";

import styles from "./UxCard.module.scss";

interface IUxCardProps extends CardProps {
  testId: string;
}

export const UxCard: FC<IUxCardProps> = ({ testId, className, ...props }) => {
  const classCard = clsx(styles.cardWrapper, className);
  return <ANTCard data-testid={testId} {...props} className={classCard} />;
};
