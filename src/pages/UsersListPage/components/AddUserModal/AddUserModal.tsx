import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UserForm } from "@components/PagesComponents/User/UserForm/UserForm";
import { UxBaseModal, UxButton } from "@components/UxComponents";
import { IPostUser, USER_INITIAL_STATE, usersStore } from "@modules/users";
import { ModalTypeEnum } from "@stores";

const AddUserForm = observer(() => {
  const [userForm] = useForm();

  const onFinish = (user: IPostUser) => {
    void usersStore.createUser(user);
  };
  return (
    <>
      <UserForm form={userForm} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            userForm.submit();
          }}
          testId={"submit-user"}
        >
          Submit
        </UxButton>
      </Flex>
    </>
  );
});

export const AddUserModal = observer(() => {
  return (
    <UxBaseModal
      name={ModalTypeEnum.USER_MODAL}
      title={"Dodaj korisnika"}
      onCancel={() => {
        usersStore.handleChange("user", USER_INITIAL_STATE);
      }}
    >
      <AddUserForm />
    </UxBaseModal>
  );
});
