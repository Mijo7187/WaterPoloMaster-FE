import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament";
import { TournamentFilters } from "@pages/TournamentListPage/components/TournamentFilters/TournamentFilters";
import { TournamentTable } from "@pages/TournamentListPage/components/TournamentTable/TournamentTable";
import { PaginationEnum } from "@stores";

interface ICompanyTournamentTabProps {
  companyId: number;
}

export const CompanyTournamentTab: FC<ICompanyTournamentTabProps> = observer(
  ({ companyId }) => {
    const fetchTournaments = () => {
      void tournamentStore.getTournamentsListByCompanyId(companyId);
    };

    useEffect(() => {
      fetchTournaments();
    }, [companyId]);

    return (
      <UxFilterTableWrapper
        filters={<TournamentFilters handleFiltersChange={fetchTournaments} />}
        table={<TournamentTable />}
        pagination={
          <UrlPagination
            testId="company-tournament-pagination"
            paginationName={PaginationEnum.TOURNAMENT_PAGINATION}
            handlePaginationChange={fetchTournaments}
          />
        }
      />
    );
  },
);
