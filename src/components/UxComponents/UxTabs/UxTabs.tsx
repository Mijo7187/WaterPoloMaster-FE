import { Tabs as ANTTabs, TabsProps } from "antd";
import { FC } from "react";

export interface IUxTabsProps extends TabsProps {
  testId: string;
}

export const UxTabs: FC<IUxTabsProps> = ({ testId, ...props }) => {
  return <ANTTabs {...props} data-testid={`tabs-${testId}`} />;
};
