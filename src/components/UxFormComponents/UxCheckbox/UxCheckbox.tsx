import React from "react";

import { Checkbox as ANTCheckbox, CheckboxProps, ColProps, Form } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { Rule } from "antd/es/form";

import styles from "./UxCheckbox.module.scss";

// #region Checkbox
export interface IUxCheckboxProps extends CheckboxProps {
  testId: string;
}

export const UxCheckbox: React.FC<IUxCheckboxProps> = ({
  testId,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <ANTCheckbox {...props} data-testid={`${testId}-checkbox`} />
    </div>
  );
};

export interface IUxFormCheckboxProps extends IUxCheckboxProps {
  label?: string | React.ReactNode;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  rules?: Rule[];
  labelAlign?: "left" | "right";
  colon?: boolean;
  hidden?: boolean;
  formName: string | (string | number)[] | string[];
}

export const UxFormCheckbox: React.FC<IUxFormCheckboxProps> = ({
  formName,
  label,
  labelCol,
  wrapperCol,
  rules,
  colon,
  hidden,
  ...rest
}) => {
  return (
    <Form.Item
      label={label}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      name={formName}
      valuePropName="checked"
      rules={rules}
      colon={colon}
      hidden={hidden}
    >
      <UxCheckbox {...rest} />
    </Form.Item>
  );
};
// #endregion Checkbox

// #region Group
export interface IUxCheckboxGroupProps extends CheckboxGroupProps {
  testId: string;
}

export const UxCheckboxGroup: React.FC<IUxCheckboxGroupProps> = ({
  testId,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <ANTCheckbox.Group {...props} data-testid={`${testId}-checkbox`} />
    </div>
  );
};

export interface IUxFormCheckboxGroupProps extends IUxCheckboxGroupProps {
  label?: string | React.ReactNode;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  rules?: Rule[];
  labelAlign?: "left" | "right";
  colon?: boolean;
  hidden?: boolean;
  formName: string | (string | number)[] | string[];
}

export const UxFormCheckboxGroup: React.FC<IUxFormCheckboxGroupProps> = ({
  label,
  labelCol,
  wrapperCol,
  rules,
  colon,
  hidden,
  formName,
  ...rest
}) => {
  return (
    <Form.Item
      label={label}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      name={formName}
      rules={rules}
      colon={colon}
      hidden={hidden}
    >
      <UxCheckboxGroup {...rest} />
    </Form.Item>
  );
};
// #endregion Group
