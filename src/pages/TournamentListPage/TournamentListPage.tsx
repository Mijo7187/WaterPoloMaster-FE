import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxButton, UxPageHeader } from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament/tournament.store";
import { modalStore, ModalTypeEnum } from "@stores";

import { AddTournamentModal } from "./components/AddTournamentModal/AddTournamentModal";
import { TournamentTable } from "./components/TournamentTable/TournamentTable";

export const TournamentListPage: FC = observer(() => {
  useEffect(() => {
    void tournamentStore.getTournamentsList();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista turnira"
        rightContent={
          <UxButton
            testId="add-tournament"
            onClick={() => {
              modalStore.openModal(ModalTypeEnum.TOURNAMENT_MODAL);
            }}
          >
            + Dodaj turnir
          </UxButton>
        }
      />
      <TournamentTable />
      <AddTournamentModal />
    </div>
  );
});
