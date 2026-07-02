import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxPageHeader } from "@components/UxComponents";
import { IGetQuarter, quarterStore } from "@modules/quarter";

import { GeneralQuarterTab } from "./components/GeneralQuarterTab/GeneralQuarterTab";
import { UsersQuarterTab } from "./components/UsersQuarterTab/UsersQuarterTab";

export const QuarterProfilePage: FC = observer(() => {
  const { quarterId } = useParams();
  const id = Number(quarterId);

  const quarter = quarterStore.getterQuarter as IGetQuarter;

  useEffect(() => {
    if (!id) return;
    void quarterStore.getQuarterById(id);
  }, [id]);

  const tabItems = [
    {
      key: "info",
      label: "Informacije",
      children: <GeneralQuarterTab quarter={quarter} />,
    },
    {
      key: "users",
      label: "Korisnici",
      children: <UsersQuarterTab quarter={quarter} />,
    },
  ];

  return (
    <div>
      <UxPageHeader title={`${quarter.quarter_type} ${quarter.year ?? ""}`} />
      <UrlTabs testId="quarter-profile-tabs" items={tabItems} />
    </div>
  );
});
