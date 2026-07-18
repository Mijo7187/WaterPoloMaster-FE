import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { trainingStore } from "@modules/training";
import { TrainingTable } from "@pages/TrainingsListPage/components/TrainingTable/TrainingTable";

interface IUserTrainingListTabProps {
  userId: number;
}

export const UserTrainingTab: FC<IUserTrainingListTabProps> = observer(
  ({ userId }) => {
    const fetchPayment = () => {
      void trainingStore.getTrainingsListByUserId(userId);
    };

    useEffect(() => {
      fetchPayment();
    }, [userId]);

    return (
      <UxCard testId={"user-payment"}>
        <TrainingTable />
      </UxCard>
    );
  },
);
