import React from "react";

import { Tag as ANTTag, TagProps } from "antd";

export interface IUxTagProps extends TagProps {
  testId: string;
}

export const UxTag: React.FC<IUxTagProps> = ({ testId, ...props }) => {
  return <ANTTag {...props} data-testid={`${testId}-tag`} />;
};
