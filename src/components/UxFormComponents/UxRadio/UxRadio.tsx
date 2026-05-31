import { FC } from "react";

import {
  ColProps,
  Form,
  Radio as ANTRadio,
  RadioGroupProps,
  RadioProps,
} from "antd";
import { Rule } from "antd/es/form";

import styles from "./UxRadio.module.scss";

// #region Radio
export interface IUxRadioProps extends RadioProps {
  testId: string;
}

export const UxRadio: FC<IUxRadioProps> = ({ testId, ...rest }) => {
  return (
    <div className={styles.container}>
      <ANTRadio data-testid={`${testId}-radio`} {...rest} />
    </div>
  );
};

// #region Group
export interface IUxRadioGroupProps extends RadioGroupProps {
  testId: string;
}

export const UxRadioGroup: FC<IUxRadioGroupProps> = ({ testId, ...rest }) => {
  return (
    <div className={styles.container}>
      <ANTRadio.Group data-testid={`${testId}-radio-group`} {...rest} />
    </div>
  );
};

interface IUxFormRadioProsp extends IUxRadioProps {
  formClassName?: string;
  label?: string;
  labelCol?: ColProps;
  formName: string | (string | number)[] | string[];
  wrapperCol?: ColProps;
  rules?: Rule[];
  labelAlign?: "left" | "right";
  colon?: boolean;
}

export const UxFormRadio: FC<IUxFormRadioProsp> = ({
  labelCol,
  formName,
  formClassName,
  label,
  wrapperCol,
  rules,
  labelAlign,
  colon,
  ...props
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
      className={formClassName}
    >
      <UxRadio {...props} />
    </Form.Item>
  );
};
