import React from "react";

import { ColProps, Form, Input as ANTInput } from "antd";
import { Rule } from "antd/es/form";
import { TextAreaProps } from "antd/es/input";

import styles from "./UxTextArea.module.scss";

export interface IUxTextAreaProps extends TextAreaProps {
  testId: string;
}

export const UxTextArea: React.FC<IUxTextAreaProps> = ({
  testId,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <ANTInput.TextArea
        {...props}
        data-testid={`${testId}-text-area`}
        autoComplete="off"
      />
    </div>
  );
};

export interface IUxFormTextAreaProps extends IUxTextAreaProps {
  formName: string | (string | number)[] | string[];
  rules?: Rule[];
  label?: string | React.ReactNode;
  colon?: boolean;
  labelAlign?: "left" | "right";
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const UxFormTextArea: React.FC<IUxFormTextAreaProps> = ({
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
      <UxTextArea {...rest} />
    </Form.Item>
  );
};
