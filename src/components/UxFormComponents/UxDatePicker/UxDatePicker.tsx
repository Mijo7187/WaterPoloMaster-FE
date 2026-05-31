import { FC } from "react";

import { ColProps, DatePicker as ANTDatePicker, DatePickerProps } from "antd";
import Form, { Rule } from "antd/es/form";
import { observer } from "mobx-react-lite";

import styles from "./UxDatePicker.module.scss";

export interface IUxDatePickerProps extends DatePickerProps {
  testId: string;
}

export const UxDatePicker: FC<IUxDatePickerProps> = ({ testId, ...props }) => {
  return (
    <div className={styles.container}>
      <ANTDatePicker {...props} data-testid={testId} autoComplete="off" />
    </div>
  );
};

export interface IUxFormDatePickerProps extends IUxDatePickerProps {
  label: string;
  labelAlign?: "left" | "right";
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  rules?: Rule[];
  colon?: boolean;
  formName: string | (string | number)[] | string[];
}

export const UxFormDatePicker: FC<IUxFormDatePickerProps> = observer(
  ({ label, labelCol, wrapperCol, rules, formName, colon, ...rest }) => {
    return (
      <Form.Item
        label={label}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        rules={rules}
        name={formName}
        colon={colon}
      >
        <UxDatePicker {...rest} />
      </Form.Item>
    );
  },
);
