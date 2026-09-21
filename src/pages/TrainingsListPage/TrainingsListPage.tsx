import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxPageHeader,
} from "@components/UxComponents";
import { trainingStore } from "@modules/training/training.store";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { AddTrainingModal } from "./components/AddTrainingModal/AddTrainingModal";
import { TrainingFilters } from "./components/TrainingFilters/TrainingFilters";
import { TrainingTable } from "./components/TrainingTable/TrainingTable";

export const TrainingsListPage: FC = observer(() => {
  const fetchTrainings = () => {
    void trainingStore.getTrainingsList();
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista treninga"
        rightContent={
          <UxButton
            testId="add-training"
            onClick={() => {
              modalStore.openModal(ModalTypeEnum.TRAINING_MODAL);
            }}
          >
            + Dodaj trening
          </UxButton>
        }
      />

      <UxFilterTableWrapper
        filters={<TrainingFilters />}
        table={<TrainingTable />}
        pagination={
          <UrlPagination
            testId={PaginationEnum.TRAINING_PAGINATION}
            paginationName={PaginationEnum.TRAINING_PAGINATION}
            handlePaginationChange={fetchTrainings}
          />
        }
      />

      <AddTrainingModal />
    </div>
  );
});
