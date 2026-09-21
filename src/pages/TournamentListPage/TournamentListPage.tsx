import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxPageHeader,
} from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament/tournament.store";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { AddTournamentModal } from "./components/AddTournamentModal/AddTournamentModal";
import { TournamentFilters } from "./components/TournamentFilters/TournamentFilters";
import { TournamentTable } from "./components/TournamentTable/TournamentTable";

export const TournamentListPage: FC = observer(() => {
  const fetchTournaments = () => {
    void tournamentStore.getTournamentsList();
  };

  useEffect(() => {
    fetchTournaments();
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

      <UxFilterTableWrapper
        filters={<TournamentFilters />}
        table={<TournamentTable />}
        pagination={
          <UrlPagination
            testId={PaginationEnum.TOURNAMENT_PAGINATION}
            paginationName={PaginationEnum.TOURNAMENT_PAGINATION}
            handlePaginationChange={fetchTournaments}
          />
        }
      />

      <AddTournamentModal />
    </div>
  );
});
