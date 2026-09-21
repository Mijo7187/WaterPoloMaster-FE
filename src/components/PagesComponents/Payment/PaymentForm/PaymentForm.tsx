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
  PAYABLE_TYPE_OPTIONS,
  PAYABLE_TYPE_SIFARNIK_MAP,
  PAYMENT_INITIAL_STATE,
  PAYMENT_STATUS_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
} from "@modules/payment/payment.constants";
import { IGetPayment, IPostPayment } from "@modules/payment/payment.types";
import { sifarniciStore } from "@modules/sifarnici";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface IPaymentFormProps {
  form: FormInstance<IGetPayment>;
  readOnly?: boolean;
  onFinish: (payload: IPostPayment) => void;
}

const PAYABLE_STORE_KEY = "payment_payable";

export const PaymentForm: FC<IPaymentFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    const payableType = Form.useWatch("payable_type", form);

    // The payable id only means anything alongside its type, so switching the
    // type clears the id and drops the previously loaded options.
    const onPayableTypeChange = () => {
      form.setFieldValue("payable_id", null);
      sifarniciStore.resetSifarnikByKey(PAYABLE_STORE_KEY);
    };

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
              formName={["sender_wallet", "name"]}
              label="ID novčanika pošiljaoca"
              rules={[REQUIRED_FIELD_RULE(true)]}
              disabled={readOnly}
            />
          </Col>

          <Col span={24}>
            <UxFormInput
              testId="receiver-wallet-id"
              formName={["receiver_wallet", "name"]}
              label="ID novčanika primaoca"
              rules={[REQUIRED_FIELD_RULE(true)]}
              disabled={readOnly}
            />
          </Col>

          <Col span={24}>
            <UxFormSelect
              formName="payment_type"
              label="Tip plaćanja"
              testId="payment-type"
              options={PAYMENT_TYPE_OPTIONS}
              rules={[REQUIRED_FIELD_RULE(true)]}
              disabled={readOnly}
            />
          </Col>

          <Col span={12}>
            <UxFormSelect
              formName="payable_type"
              label="Osnov"
              testId="payment-payable-type"
              options={PAYABLE_TYPE_OPTIONS}
              allowClear
              disabled={readOnly}
              onChange={onPayableTypeChange}
            />
          </Col>

          {payableType ? (
            <Col span={12}>
              <UxFormScrollSelect
                storeKey={`${PAYABLE_STORE_KEY}_${payableType}`}
                formName="payable_id"
                objName="payable"
                sifarnikName={PAYABLE_TYPE_SIFARNIK_MAP[payableType]}
                label="Stavka"
                testId="payment-payable-id"
                rules={[REQUIRED_FIELD_RULE(true)]}
                readOnly={readOnly}
              />
            </Col>
          ) : null}

          <Col span={12}>
            <UxFormInputNumber
              formName="amount"
              label="Iznos"
              testId="payment-amount"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              disabled={readOnly}
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
