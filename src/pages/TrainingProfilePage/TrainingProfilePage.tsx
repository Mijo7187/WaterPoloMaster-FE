import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxButton, UxPageHeader } from "@components/UxComponents";
import { IGetTraining, trainingStore } from "@modules/training";
import {
  drawerStore,
  DrawerTypeEnum,
  modalStore,
  ModalTypeEnum,
} from "@stores";

import { GeneralTrainingTab } from "./components/GeneralTrainingTab/GeneralTrainingTab";
import { SegmentTrainingTab } from "./components/SegmentTrainingTab/SegmentTrainingTab";
import { UsersTrainingTab } from "./components/UsersTrainingTab/UsersTrainingTab";

export const TrainingProfilePage: FC = observer(() => {
  const { trainingId } = useParams();
  const id = Number(trainingId);
  const [activeTab, setActiveTab] = useState<"info" | "users" | "segmente">(
    "segmente",
  );

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
      key: "users",
      label: "Igrači",
      children: <UsersTrainingTab training={training} />,
    },
    {
      key: "segmente",
      label: "Detalji",
      children: <SegmentTrainingTab training={training} />,
    },
  ];

  const findButton = () => {
    switch (activeTab) {
      case "segmente":
        return (
          <UxButton
            onClick={() => {
              modalStore.openModal(ModalTypeEnum.ADD_SEGMENTE_MODAL);
            }}
            testId="add-segment"
          >
            + Dodaj segment
          </UxButton>
        );
      case "users":
        return (
          <UxButton
            testId="add-training-user"
            onClick={() => {
              drawerStore.openDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
            }}
          >
            + Dodaj igrača
          </UxButton>
        );

      default:
        return <></>;
    }
  };

  return (
    <div>
      <UxPageHeader
        title={`Trening / ${dayjs(training.training_date).format("DD-MM-YYYY")}`}
      />
      <UrlTabs
        testId="training-profile-tabs"
        items={tabItems}
        defaultActiveKey={activeTab}
        onChange={(activeKey) => {
          setActiveTab(activeKey as "info" | "users" | "segmente");
        }}
        tabBarExtraContent={findButton()}
      />
    </div>
  );
});
