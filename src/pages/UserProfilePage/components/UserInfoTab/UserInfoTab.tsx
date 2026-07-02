import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UserForm } from "@components/PagesComponents/User/UserForm/UserForm";
import { UxButton } from "@components/UxComponents";
import { UxCard } from "@components/UxComponents/UxCard/UxCard";
import { usersStore } from "@modules/users/users.store";
import { IPostUser } from "@modules/users/users.types";

import styles from "./UserInfoTab.module.scss";

interface IUserInfoTabProps {
  userId: number;
}

export const UserInfoTab: FC<IUserInfoTabProps> = observer(({ userId }) => {
  const [userForm] = useForm();

  const onFinish = (values: IPostUser) => {
    void usersStore.updateUser(userId, values);
    // console.log("UserInfo form values:", values);
  };

  useEffect(() => {
    if (userId) {
      void usersStore.getUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    userForm.setFieldsValue(usersStore.getterUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersStore.getterUser]);

  return (
    <>
      <UxCard className={styles.card} testId={"user-info-card"}>
        {/* <UxSmallHeader title={"Informacije"} /> */}
        <UserForm form={userForm} onFinish={onFinish} readOnly={false} />
      </UxCard>
      <Flex
        justify={"end"}
        className="pt-10 "
        align={"middle"}
        id="user-buttons"
      >
        <UxButton
          testId="location-tab-form"
          onClick={() => {
            userForm.submit();
          }}
          // icon={<SvgIcon iconType="save" size="small" />}
        >
          Sačuvaj
          {/* {t(formValidationTR.SAVE)} */}
        </UxButton>
      </Flex>
    </>
  );
});
