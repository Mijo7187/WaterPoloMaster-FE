import { FC, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Form, Row } from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UxBaseModal, UxButton, UxCrudComp } from "@components/UxComponents";
import { sifarniciStore } from "@modules/sifarnici/sifarnici.store";
import {
  IPostSifarnikType,
  ISifarniciModalConfig,
  SifarniciTypeEnum,
} from "@modules/sifarnici/sifarnici.types";
import { SIFARNIK_MODAL_CONFIG_DATA } from "@pages/SifarniciPage/components/sifarniciPage.config";
import { ICrudOptionsConfig, modalStore, ModalTypeEnum } from "@stores";

interface ISifarniciFormProps {
  components: (form: FormInstance) => ICrudOptionsConfig[];
  formInitialState: IPostSifarnikType;
  sifarnikType: SifarniciTypeEnum;
  onCancel: () => void;
}

export const SifarniciForm: FC<ISifarniciFormProps> = observer(
  ({ components, formInitialState, sifarnikType, onCancel }) => {
    const [form] = useForm();
    const [searchParams] = useSearchParams();
    const sifarnik_id = searchParams.get("sifarnik_id");

    const componentsMemo = useMemo(() => {
      return components(form);
    }, [Form.useWatch([], form)]);

    useEffect(() => {
      form.setFieldsValue(sifarniciStore.sifarnik);
    }, [sifarniciStore.sifarnik]);

    useEffect(() => {
      if (sifarnik_id) {
        void sifarniciStore.fetchSifarnikById(
          sifarnikType,
          Number(sifarnik_id),
        );
      }
    }, [sifarnik_id]);

    const onFormFinish = async (values: IPostSifarnikType) => {
      const response = await (sifarnik_id
        ? sifarniciStore.updateSifarnik(
            sifarnikType,
            Number(sifarnik_id),
            values,
          )
        : sifarniciStore.postSifarnik(sifarnikType, values));
      if (response) {
        onCancel();
        void sifarniciStore.fetchSifarnikListTable(sifarnikType);
      }
    };

    return (
      <Form
        form={form}
        initialValues={formInitialState}
        name={`sifarnik-form`}
        onFinish={(_) => {
          const allValues = form.getFieldsValue(true) as IPostSifarnikType;
          void onFormFinish(allValues);
        }}
        labelAlign="left"
        layout="vertical"
      >
        <Row gutter={10}>
          {componentsMemo.map((item: ICrudOptionsConfig, index) => (
            <UxCrudComp item={item} key={index} />
          ))}
        </Row>

        <Row justify={"end"}>
          <UxButton
            testId="sifarnik-submit"
            htmlType="submit"
            name="change-button"
          >
            Sačuvaj
          </UxButton>
        </Row>
      </Form>
    );
  },
);

interface ISifarniciCrudModalProps {
  sifarnikType: SifarniciTypeEnum;
}

export const SifarniciCrudModal: FC<ISifarniciCrudModalProps> = observer(
  ({ sifarnikType }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { title, components, formInitialState, width } = useMemo(() => {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      return SIFARNIK_MODAL_CONFIG_DATA[sifarnikType] as ISifarniciModalConfig;
    }, [sifarnikType]);

    const onCancel = () => {
      sifarniciStore.handleChange("sifarnik", formInitialState);
      modalStore.clearModal(ModalTypeEnum.SIFARNIK_MODAL);
      searchParams.delete("sifarnik_id");
      setSearchParams(searchParams);
    };

    return (
      <UxBaseModal
        width={width ?? "fit-content"}
        name={ModalTypeEnum.SIFARNIK_MODAL}
        title={title}
        onCancel={onCancel}
      >
        <SifarniciForm
          components={components}
          formInitialState={formInitialState}
          sifarnikType={sifarnikType}
          onCancel={onCancel}
        />
      </UxBaseModal>
    );
  },
);
