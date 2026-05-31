import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormDatePicker,
  // UxFormDatePicker,
  UxFormInput,
  UxFormSelect,
} from "@components/UxFormComponents";
import { UserRolesEnum } from "@modules/auth/auth.types";
import { USER_INITIAL_STATE } from "@modules/users/users.constants";
import { IGetUser } from "@modules/users/users.types";
import { EMAIL_FIELD_RULE, REQUIRED_FIELD_RULE } from "@utils/formRules";

const ROLE_OPTIONS = Object.values(UserRolesEnum).map((role) => ({
  label: role.replace(/_/g, " "),
  value: role,
}));

interface IUserFormProps {
  form: FormInstance<IGetUser>;
  readOnly?: boolean;
  onFinish: (payload: IGetUser) => void;
}

export const UserForm: FC<IUserFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={USER_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <UxFormInput
              testId="user-first-name"
              formName="first_name"
              label="Ime"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <UxFormInput
              readOnly={readOnly}
              testId="user-last-name"
              formName="last_name"
              label="Prezime"
              rules={[REQUIRED_FIELD_RULE(true)]}
            />
          </Col>

          <Col span={24}>
            <UxFormInput
              readOnly={readOnly}
              testId="user-email"
              formName="email"
              label="Email"
              rules={[REQUIRED_FIELD_RULE(true), EMAIL_FIELD_RULE]}
            />
          </Col>

          <Col span={6}>
            <UxFormDatePicker
              readOnly={readOnly}
              testId="user-date-of-birth"
              format="YYYY-MM-DD"
              type="date"
              rules={[REQUIRED_FIELD_RULE(true)]}
              label="Datum rođenja"
              formName="date_of_birth"
            />
          </Col>

          <Col span={14}>
            <UxFormSelect
              //   readOnly={readOnly}
              testId="user-roles"
              formName="roles"
              label="Uloge"
              mode="multiple"
              options={ROLE_OPTIONS}
              rules={[REQUIRED_FIELD_RULE(true)]}
            />
          </Col>

          {/* <Col span={3} style={{ alignItems: "center" }}>
            <UxIsActive testId={"user-is-active"} />
          </Col> */}

          <Col span={6}>
            <UxFormInput
              readOnly={readOnly}
              testId="user-phone"
              formName="phone_number"
              label="Telefon"
            />
          </Col>

          <Col span={14}>
            <UxFormInput
              readOnly={readOnly}
              testId="user-address"
              formName="address"
              label="Adresa"
            />
          </Col>

          <Col span={4}>
            <UxFormInput
              readOnly={readOnly}
              testId="user-address-number"
              formName="address_number"
              label="Broj adrese"
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
