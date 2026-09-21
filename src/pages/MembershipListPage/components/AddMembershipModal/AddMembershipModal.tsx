import { useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { MembershipForm } from "@components/PagesComponents/Membership/MembershipForm/MembershipForm";
import { UxButton } from "@components/UxComponents";
import { UxBaseModal } from "@components/UxComponents/UxBaseModal/UxBaseModal";
import { MEMBERSHIP_INITIAL_STATE } from "@modules/membership/membership.constants";
import { membershipStore } from "@modules/membership/membership.store";
import { IGetMembership } from "@modules/membership/membership.types";
import { modalStore, ModalTypeEnum } from "@stores";

export const AddMembershipModal = observer(() => {
  const [membershipForm] = useForm<IGetMembership>();

  const membership = membershipStore.getterMembership;
  // The list writes the row into the store before opening the modal, so an id
  // here is what distinguishes an edit from a create.
  const editedId = (membership as IGetMembership).id;
  const isOpen = modalStore.getterModalListNames.includes(
    ModalTypeEnum.MEMBERSHIP_MODAL,
  );

  // The modal body only mounts once it is open, so the form can only be seeded
  // after that — not through `initialValues`.
  useEffect(() => {
    if (!isOpen) return;
    membershipForm.setFieldsValue(membership as IGetMembership);
  }, [isOpen, membership]);

  const onFinish = (values: IGetMembership) => {
    if (editedId) {
      void membershipStore.updateMembership(editedId, values);
      return;
    }
    void membershipStore.createMembership(values);
  };

  return (
    <UxBaseModal
      name={ModalTypeEnum.MEMBERSHIP_MODAL}
      title={editedId ? "Izmeni članarinu" : "Dodaj članarinu"}
      width={700}
      onCancel={() => {
        membershipStore.handleChange("membership", MEMBERSHIP_INITIAL_STATE);
        membershipForm.resetFields();
      }}
    >
      <MembershipForm form={membershipForm} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            membershipForm.submit();
          }}
          testId="submit-membership"
        >
          Sačuvaj
        </UxButton>
      </Flex>
    </UxBaseModal>
  );
});
