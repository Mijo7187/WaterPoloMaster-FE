import React from "react";

import {
  ColProps,
  InputNumber as ANTInputNumber,
  InputNumberProps,
} from "antd";
import Form, { Rule } from "antd/es/form";

import styles from "./UxInputNumber.module.scss";

export interface IUxInputNumberProps extends InputNumberProps {
  testId: string;
}

export const UxInputNumber: React.FC<IUxInputNumberProps> = ({
  testId,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <ANTInputNumber {...props} data-testid={testId} autoComplete="off" />
    </div>
  );
};

export interface IUxFormInputNumberProps extends IUxInputNumberProps {
  formName: string | (string | number)[] | string[];
  rules?: Rule[];
  label?: string | React.ReactNode;
  colon?: boolean;
  labelAlign?: "left" | "right";
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const UxFormInputNumber: React.FC<IUxFormInputNumberProps> = ({
  formName,
  rules,
  label,
  colon,
  labelCol,
  wrapperCol,
  labelAlign,
  ...rest
}) => {
  return (
    <Form.Item
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      name={formName}
      rules={rules}
      label={label}
      colon={colon}
      labelAlign={labelAlign}
    >
      <UxInputNumber {...rest} />
    </Form.Item>
  );
};
