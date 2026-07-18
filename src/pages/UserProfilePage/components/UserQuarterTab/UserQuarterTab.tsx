import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { quarterStore } from "@modules/quarter";
import { QuarterTable } from "@pages/QuarterListPage/components/QuarterTable/QuarterTable";

interface IUserQuarterTabProps {
  userId: number;
}

export const UserQuarterTab: FC<IUserQuarterTabProps> = observer(
  ({ userId }) => {
    const fetchQuarters = () => {
      void quarterStore.getQuartersListByUserId(userId);
    };

    useEffect(() => {
      fetchQuarters();
    }, [userId]);

    return (
      <UxCard testId={"user-quarter"}>
        <QuarterTable />
      </UxCard>
    );
  },
);
