import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament";
import { TournamentTable } from "@pages/TournamentListPage/components/TournamentTable/TournamentTable";

interface ICompanyTournamentTabProps {
  companyId: number;
}

export const CompanyTournamentTab: FC<ICompanyTournamentTabProps> = observer(
  ({ companyId }) => {
    useEffect(() => {
      void tournamentStore.getTournamentsListByCompanyId(companyId);
    }, [companyId]);

    return (
      <UxCard testId={"company-tournament"}>
        <TournamentTable />
      </UxCard>
    );
  },
);
