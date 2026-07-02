import { FC, useEffect } from "react";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { DeleteOutlined } from "@ant-design/icons";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxPopconfirm,
  UxSmallHeader,
  UxTable,
} from "@components/UxComponents";
import { trainingStore } from "@modules/training/training.store";
import {
  IGetTraining,
  IGetTrainingUsersList,
} from "@modules/training/training.types";
import { drawerStore, DrawerTypeEnum, PaginationEnum } from "@stores";

import { TrainingUsersDrawer } from "./TrainingUsersDrawer/TrainingUsersDrawer";

interface IUsersTrainingTabProps {
  training: IGetTraining;
}

export const UsersTrainingTab: FC<IUsersTrainingTabProps> = observer(
  ({ training }) => {
    useEffect(() => {
      void trainingStore.getTrainingUsersList();
    }, [training.id]);

    const columns: ColumnsType<IGetTrainingUsersList> = [
      {
        title: "Ime",
        dataIndex: ["user", "first_name"],
        key: "first_name",
      },
      {
        title: "Prezime",
        dataIndex: ["user", "last_name"],
        key: "last_name",
      },
      {
        title: "",
        key: "action",
        fixed: "right" as const,
        width: 50,
        align: "center" as const,
        render: (_: unknown, record: IGetTrainingUsersList) => (
          <UxPopconfirm
            title="Ukloni igrača"
            description="Da li ste sigurni?"
            onConfirm={() => {
              void trainingStore.removeUserFromTraining(record.id, training.id);
            }}
            testId={"remove-player"}
          >
            <UxButton
              icon={<DeleteOutlined />}
              danger
              testId={`remove-user-${record.id}`}
            />
          </UxPopconfirm>
        ),
      },
    ];

    return (
      <div>
        <UxSmallHeader
          title="Igrači"
          rightContent={
            <UxButton
              testId="add-training-user"
              onClick={() => {
                drawerStore.openDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
              }}
            >
              + Dodaj igrača
            </UxButton>
          }
        />
        <UxTable
          testId="training-users-list"
          columns={columns}
          dataSource={trainingStore.getterTrainingUsersList}
          loading={trainingStore.isLoading}
        />
        <UrlPagination
          testId="training-users-pagination"
          paginationName={PaginationEnum.USER_PAGINATION}
          handlePaginationChange={() => {
            void trainingStore.getTrainingUsersList();
          }}
        />
        <TrainingUsersDrawer training={training} />
      </div>
    );
  },
);
