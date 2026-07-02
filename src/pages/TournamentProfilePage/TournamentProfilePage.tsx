import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxPageHeader } from "@components/UxComponents";
import { IGetTournament, tournamentStore } from "@modules/tournament";

import { GeneralTournamentTab } from "./components/GeneralTournamentTab/GeneralTournamentTab";
import { UsersTournamentTab } from "./components/UsersTournamentTab/UsersTournamentTab";

export const TournamentProfilePage: FC = observer(() => {
  const { tournamentId } = useParams();
  const id = Number(tournamentId);

  const tournament = tournamentStore.getterTournament as IGetTournament;

  useEffect(() => {
    if (!id) return;
    void tournamentStore.getTournamentById(id);
  }, [id]);

  const tabItems = [
    {
      key: "info",
      label: "Informacije",
      children: <GeneralTournamentTab tournament={tournament} />,
    },
    {
      key: "users",
      label: "Korisnici",
      children: <UsersTournamentTab tournament={tournament} />,
    },
  ];

  return (
    <div>
      <UxPageHeader title={`Turnir / ${tournament.from_date}`} />
      <UrlTabs testId="tournament-profile-tabs" items={tabItems} />
    </div>
  );
});
