import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormDatePicker,
  UxFormInputNumber,
  UxFormScrollSelect,
  UxFormSelect,
} from "@components/UxFormComponents";
import { authStore } from "@modules/auth/auth.store";
import { CompanyTypeEnum } from "@modules/company/company.types";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { TRAINING_INITIAL_STATE } from "@modules/training/training.constants";
import {
  IGetTraining,
  TrainingStatusEnum,
} from "@modules/training/training.types";
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
          <Col span={24}>
            <UxFormScrollSelect
              storeKey={`pool`}
              formName="pool_id"
              objName={"pool"}
              sifarnikName={SifarniciTypeEnum.COMPANY}
              label={"Bazen"}
              filtersForGet={{ company_type: CompanyTypeEnum.POOL }}
              rules={[REQUIRED_FIELD_RULE(true)]}
              testId={"pool"}
            />
          </Col>

          <Col span={24}>
            <UxFormScrollSelect
              storeKey={"training_season"}
              formName="season_id"
              objName={"season"}
              sifarnikName={SifarniciTypeEnum.SEASON}
              label={"Sezona"}
              filtersForGet={{
                company_id: authStore.getAuthUser.company_id,
              }}
              rules={[REQUIRED_FIELD_RULE(true)]}
              testId={"training-season"}
            />
          </Col>

          <Col span={12}>
            <UxFormDatePicker
              formName="training_date"
              label="Datum treninga"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              testId="training-date"
              format="DD-MM-YYYY"
            />
          </Col>

          <Col span={6}>
            <UxFormDatePicker
              formName="start_time"
              label="Početak"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              testId="training-start-time"
              picker="time"
              format={"HH:mm"}
            />
          </Col>

          <Col span={6}>
            <UxFormDatePicker
              formName="end_time"
              label="Kraj"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              testId="training-end-time"
              picker="time"
              format={"HH:mm"}
            />
          </Col>

          <Col span={12}>
            <UxFormInputNumber
              formName="price"
              label="Cena"
              readOnly={readOnly}
              testId="training-price"
              rules={[REQUIRED_FIELD_RULE(true)]}
            />
          </Col>

          <Col span={12}>
            <UxFormSelect
              formName="status"
              label="Status"
              rules={[REQUIRED_FIELD_RULE(true)]}
              testId="training-status"
              options={TRAINING_STATUS_OPTIONS}
              disabled={readOnly}
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
