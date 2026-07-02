import { FC } from "react";

import { Flex, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UxButton } from "@components/UxComponents";
import { UxBaseModal } from "@components/UxComponents/UxBaseModal/UxBaseModal";
import { UxFormScrollSelect, UxFormSelect } from "@components/UxFormComponents";
import { authStore } from "@modules/auth/auth.store";
import { TYPE_OF_TRAINING_OPTIONS } from "@modules/quarter/quarter.constants";
import { quarterStore } from "@modules/quarter/quarter.store";
import {
  FUsersNotInQuarter,
  IGetQuarter,
  IPostQuarterUsersList,
  TypeOfTrainingEnum,
} from "@modules/quarter/quarter.types";
import { sifarniciStore } from "@modules/sifarnici/sifarnici.store";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { IGetUser } from "@modules/users";
import { ModalTypeEnum } from "@stores";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface IQuarterAddUserModalProps {
  quarter: IGetQuarter;
}

const USER_STORE_KEY = "quarter_user";

export const QuarterAddUserModal: FC<IQuarterAddUserModalProps> = observer(
  ({ quarter }) => {
    const [form] = useForm<IPostQuarterUsersList>();

    const onFinish = (values: IPostQuarterUsersList) => {
      void quarterStore.addUserToQuarter({
        quarter_id: quarter.id,
        user_id: values.user_id,
        type_of_training: values.type_of_training,
      });
    };

    const onCancel = () => {
      form.resetFields();
      sifarniciStore.resetSifarnikByKey(USER_STORE_KEY);
    };

    return (
      <UxBaseModal
        name={ModalTypeEnum.QUARTER_ADD_USER_MODAL}
        title="Dodaj korisnika"
        onCancel={onCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ type_of_training: TypeOfTrainingEnum.WATERPOLO }}
          layout="vertical"
        >
          <UxFormSelect
            formName="type_of_training"
            label="Tip treninga"
            testId="quarter-user-type-of-training"
            options={TYPE_OF_TRAINING_OPTIONS}
            rules={[REQUIRED_FIELD_RULE(true)]}
          />
          <UxFormScrollSelect<IGetUser, FUsersNotInQuarter>
            storeKey={USER_STORE_KEY}
            formName="user_id"
            objName="user"
            testId="quarter-user"
            label="Korisnik"
            sifarnikName={SifarniciTypeEnum.USER_NOT_IN_QUARTER}
            filtersForGet={{
              company_id: authStore.getAuthUser.company_id,
              quarter_id: quarter.id,
            }}
            rules={[REQUIRED_FIELD_RULE(true)]}
          />
        </Form>
        <Flex justify="end" className="mt-10">
          <UxButton
            type="primary"
            onClick={() => {
              form.submit();
            }}
            testId="submit-quarter-user"
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </UxBaseModal>
    );
  },
);
