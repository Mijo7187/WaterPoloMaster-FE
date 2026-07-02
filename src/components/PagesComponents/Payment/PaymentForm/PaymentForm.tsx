import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormInput,
  UxFormInputNumber,
  UxFormScrollSelect,
  UxFormSelect,
  UxFormTextArea,
} from "@components/UxFormComponents";
import {
  PAYMENT_INITIAL_STATE,
  PAYMENT_STATUS_OPTIONS,
} from "@modules/payment/payment.constants";
import { IGetPayment, IPostPayment } from "@modules/payment/payment.types";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface IPaymentFormProps {
  form: FormInstance<IGetPayment>;
  readOnly?: boolean;
  onFinish: (payload: IPostPayment) => void;
}

export const PaymentForm: FC<IPaymentFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={PAYMENT_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={24}>
            <UxFormInput
              testId="sender-wallet-id"
              formName="sender_wallet_id"
              label="ID novčanika pošiljaoca"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>

          <Col span={24}>
            <UxFormInput
              testId="receiver-wallet-id"
              formName="receiver_wallet_id"
              label="ID novčanika primaoca"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>

          <Col span={24}>
            <UxFormScrollSelect
              formName="payment_type_id"
              objName="payment_type"
              storeKey={SifarniciTypeEnum.PAYMENT_TYPE}
              sifarnikName={SifarniciTypeEnum.PAYMENT_TYPE}
              testId={SifarniciTypeEnum.PAYMENT_TYPE}
              label="Tip plaćanja"
              rules={[REQUIRED_FIELD_RULE(true)]}
            />
          </Col>

          <Col span={12}>
            <UxFormInputNumber
              formName="amount"
              label="Iznos"
              testId="payment-amount"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>

          <Col span={12}>
            <UxFormSelect
              formName="status"
              label="Status"
              testId="payment-status"
              options={PAYMENT_STATUS_OPTIONS}
              rules={[REQUIRED_FIELD_RULE(true)]}
              disabled={readOnly}
            />
          </Col>

          <Col span={24}>
            <UxFormTextArea
              formName="description"
              label="Opis"
              testId="payment-description"
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
