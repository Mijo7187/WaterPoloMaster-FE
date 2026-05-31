import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormDatePicker,
  UxFormInputNumber,
  UxFormSelect,
  UxFormSwitch,
} from "@components/UxFormComponents";
import { UxFormScrollSelect } from "@components/UxFormComponents/UxFormScrollSelect/UxFormScrollSelect";
import { CompanyTypeEnum } from "@modules/company/company.types";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { TRAINING_INITIAL_STATE } from "@modules/trainings/trainings.constants";
import {
  IGetTraining,
  TrainingStatusEnum,
} from "@modules/trainings/trainings.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

const TRAINING_STATUS_OPTIONS = Object.values(TrainingStatusEnum).map(
  (status) => ({
    label: status,
    value: status,
  }),
);

interface ITrainingFormProps {
  form: FormInstance<IGetTraining>;
  readOnly?: boolean;
  onFinish: (payload: IGetTraining) => void;
}

export const TrainingForm: FC<ITrainingFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={TRAINING_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <UxFormScrollSelect
              storeKey={`pool`}
              name="pool_id"
              objName={"pool"}
              sifarnikName={SifarniciTypeEnum.CITY}
              label={"Bazen"}
              filtersForGet={{ company_type: CompanyTypeEnum.POOL }}
              rules={[REQUIRED_FIELD_RULE(true)]}
              testId={"pool"}
            />
          </Col>

          <Col span={12}>
            <UxFormDatePicker
              name="start_training_date_time"
              label="Početak treninga"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              testId="training-start-date"
              showTime
            />
          </Col>

          <Col span={12}>
            <UxFormDatePicker
              name="end_training_date_time"
              label="Kraj treninga"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              testId="training-end-date"
              showTime
            />
          </Col>

          <Col span={12}>
            <UxFormInputNumber
              name="price"
              label="Cena"
              readOnly={readOnly}
              testId="training-price"
            />
          </Col>

          <Col span={12}>
            <UxFormSelect
              name="status"
              label="Status"
              rules={[REQUIRED_FIELD_RULE(true)]}
              testId="training-status"
              options={TRAINING_STATUS_OPTIONS}
              disabled={readOnly}
            />
          </Col>

          <Col span={12}>
            <UxFormSwitch
              formName="payed"
              label="Plaćeno"
              testId="training-payed"
              disabled={readOnly}
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
