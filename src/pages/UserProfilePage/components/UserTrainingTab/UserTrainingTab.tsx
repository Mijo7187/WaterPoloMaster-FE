import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { trainingStore } from "@modules/training";
import { TrainingFilters } from "@pages/TrainingsListPage/components/TrainingFilters/TrainingFilters";
import { TrainingTable } from "@pages/TrainingsListPage/components/TrainingTable/TrainingTable";
import { PaginationEnum } from "@stores";

interface IUserTrainingListTabProps {
  userId: number;
}

export const UserTrainingTab: FC<IUserTrainingListTabProps> = observer(
  ({ userId }) => {
    const fetchTrainings = () => {
      void trainingStore.getTrainingsListByUserId(userId);
    };

    useEffect(() => {
      fetchTrainings();
    }, [userId]);

    return (
      <UxFilterTableWrapper
        filters={<TrainingFilters handleFiltersChange={fetchTrainings} />}
        table={<TrainingTable />}
        pagination={
          <UrlPagination
            testId="user-training-pagination"
            paginationName={PaginationEnum.TRAINING_PAGINATION}
            handlePaginationChange={fetchTrainings}
          />
        }
      />
    );
  },
);
