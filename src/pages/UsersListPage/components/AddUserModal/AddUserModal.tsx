import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UserForm } from "@components/PagesComponents/User/UserForm/UserForm";
import { UxBaseModal, UxButton } from "@components/UxComponents";
import { authStore } from "@modules/auth/auth.store";
import { companyStore, IGetCompany } from "@modules/company";
import { IPostUser, USER_INITIAL_STATE, usersStore } from "@modules/users";
import { RoutePathsEnum } from "@router/router.types";
import { ModalTypeEnum } from "@stores";

const AddUserForm = observer(() => {
  const [userForm] = useForm();
  const pathName = window.location.pathname;

  const onFinish = (user: IPostUser) => {
    void usersStore.createUser({
      ...user,
      company_id: pathName.includes(RoutePathsEnum.COMPANY_PROFILE)
        ? (companyStore.getterCompany as IGetCompany).id
        : authStore.authUser.company_id,
    });
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
      width={"70%"}
    >
      <AddUserForm />
    </UxBaseModal>
  );
});
