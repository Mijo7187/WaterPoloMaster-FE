import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxPageHeader } from "@components/UxComponents";
import { seasonStore } from "@modules/season/season.store";
import { IGetSeason } from "@modules/season/season.types";

import { GeneralSeasonTab } from "./components/GeneralSeasonTab/GeneralSeasonTab";
import { TournamentSeasonTab } from "./components/TournamentSeasonTab/TournamentSeasonTab";
import { TrainingSeasonTab } from "./components/TrainingSeasonTab/TrainingSeasonTab";
import { UsersSeasonTab } from "./components/UsersSeasonTab/UsersSeasonTab";

export const SeasonProfilePage: FC = observer(() => {
  const { seasonId } = useParams();
  const id = Number(seasonId);

  const season = seasonStore.getterSeason as IGetSeason;

  useEffect(() => {
    if (!id) return;
    void seasonStore.getSeasonById(id);
  }, [id]);

  const tabItems = [
    {
      key: "info",
      label: "Informacije",
      children: <GeneralSeasonTab season={season} />,
    },
    {
      key: "users",
      label: "Korisnici",
      children: <UsersSeasonTab seasonId={id} />,
    },
    {
      key: "training",
      label: "Trening",
      children: <TrainingSeasonTab seasonId={id} />,
    },
    {
      key: "tournament",
      label: "Turnir",
      children: <TournamentSeasonTab seasonId={id} />,
    },
  ];

  return (
    <div>
      <UxPageHeader title={`Sezona / ${season.name}`} />
      <UrlTabs testId="season-profile-tabs" items={tabItems} />
    </div>
  );
});
