import { FC } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxPageHeader } from "@components/UxComponents";
import { usersStore } from "@modules/users";
import { TabsTypeEnum } from "@stores";

import { UserInfoTab } from "./components/UserInfoTab/UserInfoTab";
import { UserPaymentTab } from "./components/UserPaymentTab/UserPaymentTab";
import { UserQuarterTab } from "./components/UserQuarterTab/UserQuarterTab";
import { UserTournamentTab } from "./components/UserTournamentTab/UserTournamentTab";
import { UserTrainingTab } from "./components/UserTrainingTab/UserTrainingTab";

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
    {
      key: "payment",
      label: "Plaćanja",
      children: <UserPaymentTab userId={id} />,
    },
    {
      key: "training",
      label: "Trening",
      children: <UserTrainingTab userId={id} />,
    },
    {
      key: "quarter",
      label: "Kvartal",
      children: <UserQuarterTab userId={id} />,
    },
    {
      key: "tournament",
      label: "Turnir",
      children: <UserTournamentTab userId={id} />,
    },
  ];

  const userName = [user.first_name, user.last_name].filter(Boolean).join(" ");

  return (
    <div>
      <UxPageHeader title={userName} />
      <UrlTabs
        items={items}
        defaultValue={"info"}
        testId={TabsTypeEnum.USERS}
      />
    </div>
  );
});
