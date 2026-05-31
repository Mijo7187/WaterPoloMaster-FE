import React from "react";

import { ColProps, Form, Input as ANTInput, InputProps } from "antd";
import { Rule } from "antd/es/form";

import styles from "./UxInput.module.scss";

// #region INPUT
export interface IUxInputProps extends Omit<InputProps, "name"> {
  testId: string;
}

export const UxInput: React.FC<IUxInputProps> = ({ testId, ...rest }) => {
  return (
    <div className={styles.appInput}>
      <ANTInput {...rest} data-testid={testId} autoComplete="off" />
    </div>
  );
};

// #region FORM
export interface IUxFormInputProps extends IUxInputProps {
  formName: string | (string | number)[] | string[];
  rules?: Rule[];
  label?: string | React.ReactNode;
  colon?: boolean;
  labelAlign?: "left" | "right";
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const UxFormInput: React.FC<IUxFormInputProps> = ({
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
      className={styles.formInput}
      rules={rules}
      label={label}
      colon={colon}
      labelAlign={labelAlign}
    >
      <UxInput {...rest} />
    </Form.Item>
  );
};
