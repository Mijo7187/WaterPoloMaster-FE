import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament";
import { TournamentTable } from "@pages/TournamentListPage/components/TournamentTable/TournamentTable";

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
      <UxCard testId={"user-tournament"}>
        <TournamentTable />
      </UxCard>
    );
  },
);
