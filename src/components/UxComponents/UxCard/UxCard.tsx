import { FC } from "react";

import { Card as ANTCard, CardProps } from "antd";

interface IUxCardProps extends CardProps {
  testId: string;
}

export const UxCard: FC<IUxCardProps> = ({ testId, ...props }) => {
  return <ANTCard data-testid={testId} {...props} />;
};
