import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { trainingStore } from "@modules/training/training.store";
import { TrainingFilters } from "@pages/TrainingsListPage/components/TrainingFilters/TrainingFilters";
import { TrainingTable } from "@pages/TrainingsListPage/components/TrainingTable/TrainingTable";
import { PaginationEnum } from "@stores";

interface ITrainingSeasonTabProps {
  seasonId: number;
}

export const TrainingSeasonTab: FC<ITrainingSeasonTabProps> = observer(
  ({ seasonId }) => {
    const fetchTrainings = () => {
      if (!seasonId) return;
      void trainingStore.getTrainingsListBySeasonId(seasonId);
    };

    useEffect(() => {
      fetchTrainings();
    }, [seasonId]);

    return (
      <UxFilterTableWrapper
        filters={
          <TrainingFilters
            handleFiltersChange={fetchTrainings}
            hiddenFields={["season_id"]}
          />
        }
        table={<TrainingTable />}
        pagination={
          <UrlPagination
            testId="season-training-pagination"
            paginationName={PaginationEnum.TRAINING_PAGINATION}
            handlePaginationChange={fetchTrainings}
          />
        }
      />
    );
  },
);
