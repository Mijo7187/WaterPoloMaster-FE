import React from "react";

import { ColProps, Form, Select as ANTSelect, SelectProps } from "antd";
import { Rule } from "antd/es/form";

import styles from "./UxSelect.module.scss";

// #region SELECT
export interface IUxSelectProps extends SelectProps {
  testId: string;
}

export const UxSelect: React.FC<IUxSelectProps> = ({ testId, ...props }) => {
  return (
    <div className={styles.container}>
      <ANTSelect {...props} data-testid={testId} />
    </div>
  );
};
// #endregion SELECT

// #region FORM
export interface IUxFormSelectProps extends IUxSelectProps {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  formName: string | (string | number)[] | string[];
  rules?: Rule[];
  colon?: boolean;
  labelAlign?: "left" | "right";
  label?: string;
}

export const UxFormSelect: React.FC<IUxFormSelectProps> = ({
  labelCol,
  wrapperCol,
  formName,
  rules,
  colon,
  labelAlign,
  label,

  ...rest
}) => {
  return (
    <Form.Item
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      name={formName}
      rules={rules}
      colon={colon}
      labelAlign={labelAlign}
      label={label}
      // className={styles.selectForm}
    >
      <UxSelect {...rest} />
    </Form.Item>
  );
};
// #endregion FORM
