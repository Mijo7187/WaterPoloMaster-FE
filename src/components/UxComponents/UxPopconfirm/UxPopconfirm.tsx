import React from "react";

import { Popconfirm as PopconfirmPop, PopconfirmProps } from "antd";

import "./UxPopconfirm.module.scss";

interface IUxPopconfirm extends PopconfirmProps {
  name: string;
}

export const UxPopconfirm: React.FC<IUxPopconfirm> = (props) => {
  return <PopconfirmPop {...props} data-testid={`${props.name}-popconfirm`} />;
};
