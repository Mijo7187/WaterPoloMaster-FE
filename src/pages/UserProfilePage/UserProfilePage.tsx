import { FC } from "react";
import { useParams } from "react-router-dom";

import { Row } from "antd";
import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxPageHeader } from "@components/UxComponents";
import { usersStore } from "@modules/users";
import { TabsTypeEnum } from "@stores";

import { UserInfoTab } from "./components/UserInfoTab/UserInfoTab";

// import { usersStore } from "@modules/users/users.store";

export const UserProfilePage: FC = observer(() => {
  const { userId: idString } = useParams();
  const id = Number(idString);

  const user = usersStore.getterUser;

  const items = [
    {
      key: "info",
      label: "Informacije",
      children: <UserInfoTab userId={id} />,
    },
    // {
    //   key: "target",
    //   label: "Target",
    //   children: <UserInfoTab userId={id} />,
    // },
  ];

  const userName = [user.first_name, user.last_name].filter(Boolean).join(" ");

  return (
    <Row>
      <UxPageHeader title={userName} />
      <UrlTabs
        items={items}
        defaultValue={"info"}
        testId={TabsTypeEnum.USERS}
      />
    </Row>
  );
});
