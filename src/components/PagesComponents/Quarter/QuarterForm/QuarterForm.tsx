import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormInputNumber,
  UxFormSelect,
  UxFormTextArea,
} from "@components/UxFormComponents";
import {
  QUARTER_INITIAL_STATE,
  QUARTER_TYPE_OPTIONS,
} from "@modules/quarter/quarter.constants";
import { IGetQuarter } from "@modules/quarter/quarter.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface IQuarterFormProps {
  form: FormInstance<IGetQuarter>;
  readOnly?: boolean;
  onFinish: (payload: IGetQuarter) => void;
}

export const QuarterForm: FC<IQuarterFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={QUARTER_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <UxFormSelect
              formName="quarter_type"
              label="Kvartal"
              rules={[REQUIRED_FIELD_RULE(true)]}
              testId="quarter-type"
              options={QUARTER_TYPE_OPTIONS}
              disabled={readOnly}
            />
          </Col>

          <Col span={12}>
            <UxFormInputNumber
              formName="year"
              label="Godina"
              readOnly={readOnly}
              testId="quarter-year"
              rules={[REQUIRED_FIELD_RULE(true)]}
            />
          </Col>

          <Col span={12}>
            <UxFormInputNumber
              formName="waterpolo_price"
              label="Cena vaterpolo"
              readOnly={readOnly}
              testId="quarter-waterpolo-price"
              rules={[REQUIRED_FIELD_RULE(true)]}
            />
          </Col>

          <Col span={12}>
            <UxFormInputNumber
              formName="swimming_price"
              label="Cena plivanje"
              readOnly={readOnly}
              testId="quarter-swimming-price"
              rules={[REQUIRED_FIELD_RULE(true)]}
            />
          </Col>

          <Col span={24}>
            <UxFormTextArea
              formName="description"
              label="Opis"
              readOnly={readOnly}
              testId="quarter-description"
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
