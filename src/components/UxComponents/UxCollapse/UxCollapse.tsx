import { Collapse as ANTCollapse, CollapseProps } from "antd";
import { FC } from "react";

interface IUxCollapseProps extends CollapseProps {
  name: string;
}

export const UxCollapse: FC<IUxCollapseProps> = ({ ...props }) => {
  return <ANTCollapse data-testid={`${props.name}-collapse`} {...props} />;
};
