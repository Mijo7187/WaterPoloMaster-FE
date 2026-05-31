import { FC, useEffect } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UserForm } from "@components/PagesComponents/User/UserForm/UserForm";
import { UxCard } from "@components/UxComponents/UxCard/UxCard";
import { UxSmallHeader } from "@components/UxComponents/UxSmallHeader/UxSmallHeader";
import { usersStore } from "@modules/users/users.store";
import { IPostUser } from "@modules/users/users.types";

import styles from "./UserInfo.module.scss";

interface IUserInfoProps {
  userId: number | undefined;
}

export const UserInfo: FC<IUserInfoProps> = observer(({ userId }) => {
  const [userForm] = useForm();
  const onFinish = (values: IPostUser) => {
    console.log("UserInfo form values:", values);
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
    <UxCard className={styles.card} testId={"user-info-card"}>
      <UxSmallHeader title={"Informacije"} subtitle={"Podaci o korisniku"} />
      <UserForm form={userForm} onFinish={onFinish} readOnly={false} />
    </UxCard>
  );
});
