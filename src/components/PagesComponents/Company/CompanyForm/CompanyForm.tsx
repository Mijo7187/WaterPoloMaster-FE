import { FC } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  UxFormInput,
  UxFormScrollSelect,
  UxFormSelect,
} from "@components/UxFormComponents";
import {
  COMPANY_INITIAL_STATE,
  COMPANY_TYPE_OPTIONS,
} from "@modules/company/company.constants";
import { IGetCompany } from "@modules/company/company.types";
import { sifarniciStore } from "@modules/sifarnici";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { EMAIL_FIELD_RULE, REQUIRED_FIELD_RULE } from "@utils/formRules";

interface ICompanyFormProps {
  form: FormInstance<IGetCompany>;
  readOnly?: boolean;
  onFinish: (payload: IGetCompany) => void;
}

export const CompanyForm: FC<ICompanyFormProps> = observer(
  ({ form, readOnly, onFinish }) => {
    const countryId = Form.useWatch<IGetCompany["country_id"]>(
      "country_id",
      form,
    );

    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={COMPANY_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={24}>
            <UxFormInput
              testId="company-name"
              formName="name"
              label="Naziv"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
            />
          </Col>

          <Col span={12}>
            <UxFormScrollSelect
              formName={"country_id"}
              objName={"country"}
              storeKey={SifarniciTypeEnum.COUNTRY}
              sifarnikName={SifarniciTypeEnum.COUNTRY}
              testId={SifarniciTypeEnum.COUNTRY}
              rules={[REQUIRED_FIELD_RULE(true)]}
              label="Država"
              onChange={() => {
                sifarniciStore.resetSifarnikByKey(SifarniciTypeEnum.CITY);
                form.setFieldValue("city_id", undefined);
              }}
            />
          </Col>

          <Col span={12}>
            <UxFormScrollSelect
              formName={"city_id"}
              objName={"city"}
              storeKey={SifarniciTypeEnum.CITY}
              sifarnikName={SifarniciTypeEnum.CITY}
              testId={SifarniciTypeEnum.CITY}
              rules={[REQUIRED_FIELD_RULE(true)]}
              label="Grad"
              filtersForGet={{ country_id: countryId }}
              disabled={!countryId}
            />
          </Col>
          <Col span={12}>
            <UxFormInput
              readOnly={readOnly}
              testId="company-address"
              formName="address"
              label="Adresa"
            />
          </Col>

          <Col span={12}>
            <UxFormInput
              readOnly={readOnly}
              testId="company-phone"
              formName="phone_number"
              label="Telefon"
            />
          </Col>

          <Col span={12}>
            <UxFormInput
              readOnly={readOnly}
              testId="company-email"
              formName="email"
              label="Email"
              rules={[EMAIL_FIELD_RULE]}
            />
          </Col>

          <Col span={12}>
            <UxFormSelect
              // readOnly={readOnly}
              testId="company-type"
              formName="company_type"
              label="Tip kompanije"
              rules={[REQUIRED_FIELD_RULE(true)]}
              options={COMPANY_TYPE_OPTIONS}
            />
          </Col>
        </Row>
      </Form>
    );
  },
);
