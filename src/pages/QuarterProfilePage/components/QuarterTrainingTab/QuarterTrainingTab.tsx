import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { trainingStore } from "@modules/training";
import { TrainingTable } from "@pages/TrainingsListPage/components/TrainingTable/TrainingTable";

interface IQuarterTrainingTabProps {
  quarterId: number;
}

export const QuarterTrainingTab: FC<IQuarterTrainingTabProps> = observer(
  ({ quarterId }) => {
    useEffect(() => {
      if (!quarterId) return;
      void trainingStore.getTrainingsListByQuarterId(quarterId);
    }, [quarterId]);

    return (
      <UxCard testId={"quarter-training"}>
        <TrainingTable />
      </UxCard>
    );
  },
);
