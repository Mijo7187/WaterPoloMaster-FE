import { FC } from "react";

import { Collapse as ANTCollapse, CollapseProps } from "antd";

interface IUxCollapseProps extends CollapseProps {
  name: string;
}

export const UxCollapse: FC<IUxCollapseProps> = ({ ...props }) => {
  return <ANTCollapse data-testid={`${props.name}-collapse`} {...props} />;
};
