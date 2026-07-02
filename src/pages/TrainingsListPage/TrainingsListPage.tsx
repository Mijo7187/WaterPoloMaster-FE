import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxButton, UxPageHeader } from "@components/UxComponents";
import { trainingStore } from "@modules/training/training.store";
import { modalStore, ModalTypeEnum } from "@stores";

import { AddTrainingModal } from "./components/AddTrainingModal/AddTrainingModal";
import { TrainingTable } from "./components/TrainingTable/TrainingTable";

export const TrainingsListPage: FC = observer(() => {
  useEffect(() => {
    void trainingStore.getTrainingsList();
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
      <TrainingTable />
      <AddTrainingModal />
    </div>
  );
});
