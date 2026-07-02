import { FC, useEffect } from "react";

import { Switch } from "antd";
import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { UxBaseDrawer, UxTable } from "@components/UxComponents";
import { authStore } from "@modules/auth/auth.store";
import { trainingStore } from "@modules/training/training.store";
import { IGetTraining } from "@modules/training/training.types";
import type { IGetUser } from "@modules/users/users.types";
import { drawerStore, DrawerTypeEnum } from "@stores";

interface ITrainingUsersDrawerProps {
  training: IGetTraining;
}

export const TrainingUsersDrawer: FC<ITrainingUsersDrawerProps> = observer(
  ({ training }) => {
    useEffect(() => {
      void trainingStore.getUsersNotInTraining(
        training.id,
        authStore.getAuthUser.company_id,
      );
    }, [training.id]);

    const onClose = () => {
      drawerStore.clearDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    };

    const columns: ColumnsType<IGetUser> = [
      {
        title: "",
        key: "switch",
        width: 60,
        render: (_: unknown, record: IGetUser) => (
          <Switch
            checked={false}
            onChange={() => {
              void trainingStore.addUserToTraining({
                training_id: training.id,
                user_id: record.id,
              });
            }}
          />
        ),
      },
      {
        title: "Ime",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Prezime",
        dataIndex: "last_name",
        key: "last_name",
      },
    ];

    return (
      <UxBaseDrawer
        name={DrawerTypeEnum.TRAINING_USERS_DRAWER}
        title="Dodaj igrača"
        onCancel={onClose}
        testId={DrawerTypeEnum.TRAINING_USERS_DRAWER}
      >
        <UxTable
          testId="users-not-in-training"
          columns={columns}
          dataSource={trainingStore.getterUsersNotInTrainingList}
          loading={trainingStore.isLoading}
        />
      </UxBaseDrawer>
    );
  },
);
