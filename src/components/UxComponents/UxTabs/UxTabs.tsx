import { FC } from "react";

import { Tabs as ANTTabs, TabsProps } from "antd";

export interface IUxTabsProps extends TabsProps {
  testId: string;
}

export const UxTabs: FC<IUxTabsProps> = ({ testId, ...props }) => {
  return <ANTTabs {...props} data-testid={`tabs-${testId}`} />;
};
