import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormInput,
  UxFormInputNumber,
  UxFormSelect,
  UxFormSwitch,
} from "@components/UxFormComponents";
import {
  MEMBERSHIP_INITIAL_STATE,
  PROGRAM_OPTIONS,
} from "@modules/membership/membership.constants";
import { IGetMembership } from "@modules/membership/membership.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface IMembershipFormProps {
  form: FormInstance<IGetMembership>;
  readOnly?: boolean;
  onFinish: (payload: IGetMembership) => void;
}

export const MembershipForm: FC<IMembershipFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    const monthsCount = Form.useWatch("months_count", form);
    const priceMonth = Form.useWatch("price_month", form);

    // `price_total` is computed server-side; this only previews it while typing.
    const priceTotalPreview =
      monthsCount && priceMonth
        ? (monthsCount * priceMonth).toLocaleString("sr-RS")
        : "—";

    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={MEMBERSHIP_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <UxFormInput
              formName="name"
              label="Naziv"
              testId="membership-name"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>

          <Col span={12}>
            <UxFormSelect
              formName="program"
              label="Program"
              testId="membership-program"
              options={PROGRAM_OPTIONS}
              rules={[REQUIRED_FIELD_RULE(true)]}
              disabled={readOnly}
            />
          </Col>

          <Col span={8}>
            <UxFormInputNumber
              formName="months_count"
              label="Trajanje (meseci)"
              testId="membership-months-count"
              min={1}
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>

          <Col span={8}>
            <UxFormInputNumber
              formName="price_month"
              label="Cena po mesecu"
              testId="membership-price-month"
              min={0}
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>

          <Col span={8}>
            <UxFormInputNumber
              formName="installments_count"
              label="Broj rata"
              testId="membership-installments-count"
              min={1}
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>

          <Col span={12}>
            <Form.Item label="Ukupna cena">{priceTotalPreview}</Form.Item>
          </Col>

          <Col span={12}>
            <UxFormSwitch
              formName="is_active"
              label="Aktivna"
              testId="membership-is-active"
              disabled={readOnly}
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
