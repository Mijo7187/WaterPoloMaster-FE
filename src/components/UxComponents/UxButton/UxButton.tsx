import React from "react";

import { Button as ANTButton, ButtonProps } from "antd";

import "./UxButton.scss";

export interface IUxButtonProps extends ButtonProps {
  testId: string;
}

export const UxButton: React.FC<IUxButtonProps> = ({ testId, ...rest }) => {
  return <ANTButton {...rest} data-testid={testId} />;
};
