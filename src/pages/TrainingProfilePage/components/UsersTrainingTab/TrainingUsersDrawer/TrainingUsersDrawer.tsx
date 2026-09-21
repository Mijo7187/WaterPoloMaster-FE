import { FC, useEffect, useState } from "react";

import { Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import {
  UxBaseDrawer,
  UxFilterTableWrapper,
  UxTable,
} from "@components/UxComponents";
import { authStore } from "@modules/auth/auth.store";
import { trainingStore } from "@modules/training/training.store";
import { IGetTraining } from "@modules/training/training.types";
import type { IGetUser } from "@modules/users/users.types";
import {
  drawerStore,
  DrawerTypeEnum,
  FilterConfig,
  FilterGroupsEnum,
} from "@stores";
import { FILTER_FIRST_NAME } from "@stores/filters/filtersOptions.constants";
import { removeFromList } from "@utils/removeFromList";

interface ITrainingUsersDrawerProps {
  training: IGetTraining;
}

const DRAWER_FILTERS: FilterConfig[] = [
  { ...FILTER_FIRST_NAME, testId: "training-drawer-first-name", colSpan: 24 },
];

export const TrainingUsersDrawer: FC<ITrainingUsersDrawerProps> = observer(
  ({ training }) => {
    const [form] = useForm();
    const [usersList, setUserList] = useState<IGetUser[]>([]);
    const fetchUsers = async () => {
      const response = await trainingStore.getUsersNotInTraining(
        training.id,
        authStore.getAuthUser.company_id,
      );

      // if (response) {
      setUserList(response.items);
      // }
    };

    useEffect(() => {
      void fetchUsers();
    }, [training.id]);

    const onClose = () => {
      drawerStore.clearDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    };

    const addUserToTraining = async (user: IGetUser) => {
      const response = await trainingStore.addUserToTraining({
        training_id: training.id,
        user_id: user.id,
      });

      if (response) {
        setUserList(removeFromList(usersList, user.id));
      }
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
              void addUserToTraining(record);
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
        <UxFilterTableWrapper
          filters={
            <UrlFilters
              testId="training-users-drawer"
              form={form}
              filterOptions={DRAWER_FILTERS}
              filterName={FilterGroupsEnum.USERS}
              handleFiltersChange={() => {
                void fetchUsers();
              }}
            />
          }
          table={
            <UxTable
              testId="users-not-in-training"
              columns={columns}
              dataSource={usersList}
              loading={trainingStore.isLoading}
            />
          }
        />
      </UxBaseDrawer>
    );
  },
);
