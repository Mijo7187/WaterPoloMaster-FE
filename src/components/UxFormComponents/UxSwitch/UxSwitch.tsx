import React from "react";

import { ColProps, Form, Switch as ANTSwitch, SwitchProps } from "antd";
import { Rule } from "antd/es/form";
import clsx from "clsx";

import styles from "./UxSwitch.module.scss";

export interface IUxSwitchProps extends SwitchProps {
  testId: string;
}

export const UxSwitch: React.FC<IUxSwitchProps> = ({ testId, ...props }) => {
  return (
    <div className={styles.container}>
      <ANTSwitch {...props} data-test={`switch-${testId}`} />
    </div>
  );
};

export interface IUxFormSwitchProps extends IUxSwitchProps {
  formName: string | (string | number)[] | string[];
  label?: string | React.ReactNode;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  rules?: Rule[];
  labelAlign?: "left" | "right";
  colon?: boolean;
  hidden?: boolean;
  formClassName?: string;
}

export const UxFormSwitch: React.FC<IUxFormSwitchProps> = ({
  label,
  labelCol,
  wrapperCol,
  formName,
  rules,
  colon,
  hidden,
  formClassName,
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
      className={clsx(formClassName)}
    >
      <UxSwitch {...rest} />
    </Form.Item>
  );
};
