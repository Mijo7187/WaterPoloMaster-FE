import { FC } from "react";

import { Form, FormProps } from "antd";

interface IUxFormProps extends FormProps {
  testId: string;
  children: React.ReactNode;
}

export const UxForm: FC<IUxFormProps> = ({
  testId,
  children,
  layout = "vertical",
  ...rest
}) => {
  return (
    <Form data-test={`form-${testId}`} layout={layout} {...rest}>
      {children}
    </Form>
  );
};
