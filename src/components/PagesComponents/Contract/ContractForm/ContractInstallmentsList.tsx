import { FC } from "react";

import { Col, Form, Row, Typography } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import { UxButton } from "@components/UxComponents";
import {
  UxFormDatePicker,
  UxFormInputNumber,
} from "@components/UxFormComponents";
import { CONTRACT_INSTALLMENT_ITEM_INITIAL_STATE } from "@modules/contract/contract.constants";
import { IContractInstallmentItem } from "@modules/contract/contract.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface IContractInstallmentsListProps {
  readOnly?: boolean;
}

/** A term needs at least one row, and each row's period has to run forwards. */
const validateInstallments = async (
  _: unknown,
  rows?: IContractInstallmentItem[],
) => {
  if (!rows?.length) {
    return Promise.reject(new Error("Potrebna je bar jedna rata"));
  }
  const hasBackwardsPeriod = rows.some(
    (row) =>
      row.period_start &&
      row.period_end &&
      dayjs(row.period_end).isBefore(dayjs(row.period_start), "day"),
  );
  if (hasBackwardsPeriod) {
    return Promise.reject(
      new Error("Kraj perioda ne može biti pre početka perioda"),
    );
  }
};

export const ContractInstallmentsList: FC<IContractInstallmentsListProps> = ({
  readOnly,
}) => {
  const form = Form.useFormInstance();

  /** A new row picks up where the previous one ended. */
  const addRow = (add: (value: IContractInstallmentItem) => void) => {
    const rows = (form.getFieldValue("installments_list") ??
      []) as IContractInstallmentItem[];
    const lastEnd = rows[rows.length - 1]?.period_end;
    const nextStart = lastEnd
      ? (dayjs(lastEnd).add(1, "day") as unknown as string)
      : CONTRACT_INSTALLMENT_ITEM_INITIAL_STATE.period_start;
    add({
      ...CONTRACT_INSTALLMENT_ITEM_INITIAL_STATE,
      period_start: nextStart,
      due_date: nextStart,
    });
  };

  return (
    <Form.List
      name="installments_list"
      rules={readOnly ? undefined : [{ validator: validateInstallments }]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          <Typography.Title level={5}>Rate</Typography.Title>
          {readOnly && !fields.length ? (
            <Typography.Text type="secondary">
              Rate još nisu generisane za ovaj ugovor.
            </Typography.Text>
          ) : null}
          {fields.map((field, index) => (
            <Row key={field.key} gutter={12} align="bottom">
              <Col span={6}>
                <UxFormDatePicker
                  formName={[field.name, "period_start"]}
                  label="Početak perioda"
                  testId={`installment-period-start-${index}`}
                  rules={[REQUIRED_FIELD_RULE(true)]}
                  disabled={readOnly}
                  format="DD-MM-YYYY"
                />
              </Col>
              <Col span={6}>
                <UxFormDatePicker
                  formName={[field.name, "period_end"]}
                  label="Kraj perioda"
                  testId={`installment-period-end-${index}`}
                  rules={[REQUIRED_FIELD_RULE(true)]}
                  disabled={readOnly}
                  format="DD-MM-YYYY"
                />
              </Col>
              <Col span={5}>
                <UxFormDatePicker
                  formName={[field.name, "due_date"]}
                  label="Dospeva"
                  testId={`installment-due-date-${index}`}
                  rules={[REQUIRED_FIELD_RULE(true)]}
                  disabled={readOnly}
                  format="DD-MM-YYYY"
                />
              </Col>
              <Col span={5}>
                <UxFormInputNumber
                  formName={[field.name, "amount"]}
                  label="Iznos"
                  testId={`installment-amount-${index}`}
                  rules={[REQUIRED_FIELD_RULE(true)]}
                  disabled={readOnly}
                  min={0}
                />
              </Col>
              {!readOnly && fields.length > 1 ? (
                <Col span={2}>
                  <Form.Item>
                    <UxButton
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => {
                        remove(field.name);
                      }}
                      testId={`remove-installment-${index}`}
                    />
                  </Form.Item>
                </Col>
              ) : null}
            </Row>
          ))}
          <Form.ErrorList errors={errors} />
          {!readOnly ? (
            <UxButton
              onClick={() => {
                addRow(add);
              }}
              testId="add-installment"
            >
              + Dodaj ratu
            </UxButton>
          ) : null}
        </>
      )}
    </Form.List>
  );
};
