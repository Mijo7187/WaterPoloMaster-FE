import { FC } from "react";

import { Menu as ANTMenu, MenuProps } from "antd";

interface IUxMenuProps extends MenuProps {
  testId: string;
}

export const UxMenu: FC<IUxMenuProps> = ({ testId, ...rest }) => {
  return <ANTMenu data-testid={testId} {...rest} />;
};
