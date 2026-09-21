import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament";
import { TournamentFilters } from "@pages/TournamentListPage/components/TournamentFilters/TournamentFilters";
import { TournamentTable } from "@pages/TournamentListPage/components/TournamentTable/TournamentTable";
import { PaginationEnum } from "@stores";

interface IUserTournamentTabProps {
  userId: number;
}

export const UserTournamentTab: FC<IUserTournamentTabProps> = observer(
  ({ userId }) => {
    const fetchTournaments = () => {
      void tournamentStore.getTournamentsListByUserId(userId);
    };

    useEffect(() => {
      fetchTournaments();
    }, [userId]);

    return (
      <UxFilterTableWrapper
        filters={<TournamentFilters handleFiltersChange={fetchTournaments} />}
        table={<TournamentTable />}
        pagination={
          <UrlPagination
            testId="user-tournament-pagination"
            paginationName={PaginationEnum.TOURNAMENT_PAGINATION}
            handlePaginationChange={fetchTournaments}
          />
        }
      />
    );
  },
);
