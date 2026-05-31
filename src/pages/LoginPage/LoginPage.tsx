import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "antd";
import { observer } from "mobx-react-lite";
import { UxButton } from "@components/UxComponents";
import { UxFormInput } from "@components/UxFormComponents";
import { LOGIN_INITIAL_STATE } from "@modules/auth/auth.constants";
import { authStore } from "@modules/auth/auth.store";
import { IPostAuthUser } from "@modules/auth/auth.types";
import { RoutePathsEnum } from "@router/router.types";

export const LoginPage: FC = observer(() => {
  const navigate = useNavigate();
  const onFinish = async (values: IPostAuthUser) => {
    try {
      await authStore.postLogin(values);
      void navigate(RoutePathsEnum.HOME_PAGE);
    } catch {
      // handle error (e.g. show notification)
    }
  };

  return (
    <Form
      initialValues={LOGIN_INITIAL_STATE}
      onFinish={(values: IPostAuthUser) => {
        void onFinish(values);
      }}
    >
      <UxFormInput formName={"email"} testId={"email"} type={"email"} />
      <UxFormInput
        formName={"password"}
        testId={"password"}
        type={"password"}
      />
      <UxButton testId={"login-button"} htmlType="submit">
        Submit
      </UxButton>
    </Form>
  );
});
