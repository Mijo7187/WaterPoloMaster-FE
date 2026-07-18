import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament";
import { TournamentTable } from "@pages/TournamentListPage/components/TournamentTable/TournamentTable";

interface IQuarterTournamentTabProps {
  quarterId: number;
}

export const QuarterTournamentTab: FC<IQuarterTournamentTabProps> = observer(
  ({ quarterId }) => {
    useEffect(() => {
      if (!quarterId) return;
      void tournamentStore.getTournamentsListByQuarterId(quarterId);
    }, [quarterId]);

    return (
      <UxCard testId={"quarter-tournament"}>
        <TournamentTable />
      </UxCard>
    );
  },
);
