import { FC, useEffect } from "react";

import { Col, Flex, Row } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UxBaseModal, UxButton } from "@components/UxComponents";
import { UxFormScrollSelect, UxFormSelect } from "@components/UxFormComponents";
import { UxForm } from "@components/UxFormComponents/UxForm/UxForm";
import { CompanyTypeEnum } from "@modules/company/company.types";
import { TrainingSegmentEnum } from "@modules/sifarnici/exerciseOption/exerciseOption.types";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import {
  IPostSegmentModalForm,
  IPostTrainingSegment,
  SEGMENT_MODAL_INITIAL_STATE,
  SEGMENT_TYPE_OPTIONS,
  trainingStore,
} from "@modules/training";
import { ModalTypeEnum } from "@stores";
import {
  DIFFERENT_FROM_FIELD_RULE,
  REQUIRED_FIELD_RULE,
} from "@utils/formRules";

interface IAddSegmentModalProps {
  trainingId: number;
}

const AddSegmentForm: FC<IAddSegmentModalProps> = observer(({ trainingId }) => {
  const [form] = useForm<IPostSegmentModalForm>();
  const segmentType = useWatch<TrainingSegmentEnum>("segment_type", form);
  const homeCompanyId = useWatch<number | undefined>("home_company_id", form);
  const awayCompanyId = useWatch<number | undefined>("away_company_id", form);

  // Kad se promeni jedan klub, ponovo validiraj drugi da se ukloni/prikaže greška.
  useEffect(() => {
    const fieldsToValidate = (
      ["home_company_id", "away_company_id"] as const
    ).filter(
      (name) => form.getFieldValue(name) != null,
    );
    if (fieldsToValidate.length) {
      void form.validateFields(fieldsToValidate);
    }
  }, [homeCompanyId, awayCompanyId, form]);

  const onSubmit = (values: IPostSegmentModalForm) => {
    const payload: IPostTrainingSegment =
      values.segment_type === TrainingSegmentEnum.SPARRING
        ? {
            segment_type: values.segment_type,
            training_id: trainingId,
            sparring: {
              home_company_id: values.home_company_id ?? null,
              away_company_id: values.away_company_id ?? null,
            },
          }
        : {
            segment_type: values.segment_type,
            training_id: trainingId,
            exercises: [],
          };
    void trainingStore.createSegment(payload);
  };

  return (
    <UxForm
      testId={"add-segment"}
      form={form}
      onFinish={onSubmit}
      initialValues={SEGMENT_MODAL_INITIAL_STATE}
    >
      <UxFormSelect
        label="Tip segmenta"
        options={SEGMENT_TYPE_OPTIONS}
        style={{ minWidth: 180 }}
        testId="segment-type-picker"
        formName={"segment_type"}
        rules={[REQUIRED_FIELD_RULE(true)]}
      />

      {segmentType === TrainingSegmentEnum.SPARRING && (
        <>
          <Row gutter={16} className="mb-10">
            <Col span={24}>
              <UxFormScrollSelect
                storeKey={"home_company"}
                formName="home_company_id"
                objName="home_company"
                sifarnikName={SifarniciTypeEnum.COMPANY}
                filtersForGet={{ company_type: CompanyTypeEnum.CLUB }}
                label="Domaćin"
                rules={[
                  REQUIRED_FIELD_RULE(true),
                  DIFFERENT_FROM_FIELD_RULE(
                    "away_company_id",
                    "Domaćin i gost ne mogu biti isti klub",
                  ),
                ]}
                allowClear
                testId={`home-company`}
              />
            </Col>
            <Col span={24}>
              <UxFormScrollSelect
                storeKey={"away_company"}
                formName="away_company_id"
                objName="away_company"
                sifarnikName={SifarniciTypeEnum.COMPANY}
                filtersForGet={{ company_type: CompanyTypeEnum.CLUB }}
                label="Gost"
                rules={[
                  DIFFERENT_FROM_FIELD_RULE(
                    "home_company_id",
                    "Domaćin i gost ne mogu biti isti klub",
                  ),
                ]}
                allowClear
                testId={`away-company`}
              />
            </Col>
          </Row>
        </>
      )}
      <Flex justify="end" className="mt-10">
        <UxButton type="primary" htmlType="submit" testId={"submit-company"}>
          Submit
        </UxButton>
      </Flex>
    </UxForm>
  );
});

export const AddSegmentModal: FC<IAddSegmentModalProps> = observer(
  ({ trainingId }) => {
    return (
      <UxBaseModal name={ModalTypeEnum.ADD_SEGMENTE_MODAL}>
        <AddSegmentForm trainingId={trainingId} />
      </UxBaseModal>
    );
  },
);
