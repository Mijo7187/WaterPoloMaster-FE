import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";


import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxPageHeader } from "@components/UxComponents";
import { IGetTraining, trainingStore } from "@modules/training";

import { GeneralTrainingTab } from "./components/GeneralTrainingTab/GeneralTrainingTab";
import { UsersTrainingTab } from "./components/UsersTrainingTab/UsersTrainingTab";

export const TrainingProfilePage: FC = observer(() => {
  const { trainingId } = useParams();
  const id = Number(trainingId);

  const training = trainingStore.getterTraining as IGetTraining;

  useEffect(() => {
    if (!id) return;
    void trainingStore.getTrainingById(id);
  }, [id]);

  const tabItems = [
    {
      key: "info",
      label: "Informacije",
      children: <GeneralTrainingTab training={training} />,
    },
    {
      key: "players",
      label: "Igrači",
      children: <UsersTrainingTab training={training} />,
    },
  ];

  return (
    <div>
      <UxPageHeader title={`Trening / ${training.training_date}`} />
      <UrlTabs testId="training-profile-tabs" items={tabItems} />
    </div>
  );
});
