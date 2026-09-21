import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormDatePicker,
  UxFormInput,
  UxFormSwitch,
} from "@components/UxFormComponents";
import { SEASON_INITIAL_STATE } from "@modules/season/season.constants";
import { IGetSeason } from "@modules/season/season.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface ISeasonFormProps {
  form: FormInstance<IGetSeason>;
  readOnly?: boolean;
  onFinish: (payload: IGetSeason) => void;
}

export const SeasonForm: FC<ISeasonFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={SEASON_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={24}>
            <UxFormInput
              formName="name"
              label="Naziv"
              testId="season-name"
              rules={[REQUIRED_FIELD_RULE(true)]}
              disabled={readOnly}
            />
          </Col>

          <Col span={12}>
            <UxFormDatePicker
              formName="start_date"
              label="Početak"
              testId="season-start-date"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              format="DD-MM-YYYY"
            />
          </Col>

          <Col span={12}>
            <UxFormDatePicker
              formName="end_date"
              label="Kraj"
              testId="season-end-date"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              format="DD-MM-YYYY"
            />
          </Col>

          <Col span={12}>
            <UxFormSwitch
              formName="is_current"
              label="Tekuća sezona"
              testId="season-is-current"
              disabled={readOnly}
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
