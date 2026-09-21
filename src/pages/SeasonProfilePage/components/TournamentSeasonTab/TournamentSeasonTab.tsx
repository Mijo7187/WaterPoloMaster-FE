import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament/tournament.store";
import { TournamentTable } from "@pages/TournamentListPage/components/TournamentTable/TournamentTable";
import { PaginationEnum } from "@stores";

interface ITournamentSeasonTabProps {
  seasonId: number;
}

// No filters here: the only tournament filter is the season, which this tab
// already fixes.
export const TournamentSeasonTab: FC<ITournamentSeasonTabProps> = observer(
  ({ seasonId }) => {
    const fetchTournaments = () => {
      if (!seasonId) return;
      void tournamentStore.getTournamentsListBySeasonId(seasonId);
    };

    useEffect(() => {
      fetchTournaments();
    }, [seasonId]);

    return (
      <UxFilterTableWrapper
        table={<TournamentTable />}
        pagination={
          <UrlPagination
            testId="season-tournament-pagination"
            paginationName={PaginationEnum.TOURNAMENT_PAGINATION}
            handlePaginationChange={fetchTournaments}
          />
        }
      />
    );
  },
);
