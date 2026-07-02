import React from "react";

import { Popconfirm as PopconfirmPop, PopconfirmProps } from "antd";

import "./UxPopconfirm.module.scss";

interface IUxPopconfirm extends PopconfirmProps {
  testId: string;
}

export const UxPopconfirm: React.FC<IUxPopconfirm> = ({ testId, ...props }) => {
  return <PopconfirmPop {...props} data-testid={`${testId}-popconfirm`} />;
};
