import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormDatePicker,
  UxFormInputNumber,
  UxFormScrollSelect,
  UxFormTextArea,
} from "@components/UxFormComponents";
import { CompanyTypeEnum } from "@modules/company/company.types";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { TOURNAMENT_INITIAL_STATE } from "@modules/tournament/tournament.constants";
import { IGetTournament } from "@modules/tournament/tournament.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface ITournamentFormProps {
  form: FormInstance<IGetTournament>;
  readOnly?: boolean;
  onFinish: (payload: IGetTournament) => void;
}

export const TournamentForm: FC<ITournamentFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={TOURNAMENT_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={24}>
            <UxFormScrollSelect
              storeKey={"pool"}
              formName="pool_id"
              objName={"pool"}
              sifarnikName={SifarniciTypeEnum.COMPANY}
              label={"Bazen"}
              filtersForGet={{ company_type: CompanyTypeEnum.POOL }}
              rules={[REQUIRED_FIELD_RULE(true)]}
              testId={"pool"}
            />
          </Col>

          <Col span={12}>
            <UxFormDatePicker
              formName="from_date"
              label="Od"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              testId="tournament-from-date"
              format="DD-MM-YYYY"
            />
          </Col>

          <Col span={12}>
            <UxFormDatePicker
              formName="to_date"
              label="Do"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              testId="tournament-to-date"
              format="DD-MM-YYYY"
            />
          </Col>

          <Col span={12}>
            <UxFormInputNumber
              formName="price"
              label="Cena"
              readOnly={readOnly}
              testId="tournament-price"
              rules={[REQUIRED_FIELD_RULE(true)]}
            />
          </Col>

          <Col span={24}>
            <UxFormTextArea
              formName="description"
              label="Opis"
              readOnly={readOnly}
              testId="tournament-description"
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
