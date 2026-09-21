import { FC, useEffect } from "react";

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
import { tournamentStore } from "@modules/tournament/tournament.store";
import { IGetTournament } from "@modules/tournament/tournament.types";
import type { IGetUser } from "@modules/users/users.types";
import {
  drawerStore,
  DrawerTypeEnum,
  FilterConfig,
  FilterGroupsEnum,
} from "@stores";
import { FILTER_FIRST_NAME } from "@stores/filters/filtersOptions.constants";

interface ITournamentUsersDrawerProps {
  tournament: IGetTournament;
}

const DRAWER_FILTERS: FilterConfig[] = [
  { ...FILTER_FIRST_NAME, testId: "tournament-drawer-first-name", colSpan: 24 },
];

export const TournamentUsersDrawer: FC<ITournamentUsersDrawerProps> = observer(
  ({ tournament }) => {
    const [form] = useForm();

    const fetchUsers = () => {
      void tournamentStore.getUsersNotInTournament(
        tournament.id,
        authStore.getAuthUser.company_id,
      );
    };

    useEffect(() => {
      fetchUsers();
    }, [tournament.id]);

    const onClose = () => {
      drawerStore.clearDrawer(DrawerTypeEnum.TOURNAMENT_USERS_DRAWER);
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
              void tournamentStore.addUserToTournament({
                tournament_id: tournament.id,
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
        name={DrawerTypeEnum.TOURNAMENT_USERS_DRAWER}
        title="Dodaj korisnika"
        onCancel={onClose}
        testId={DrawerTypeEnum.TOURNAMENT_USERS_DRAWER}
      >
        <UxFilterTableWrapper
          filters={
            <UrlFilters
              testId="tournament-users-drawer"
              form={form}
              filterOptions={DRAWER_FILTERS}
              filterName={FilterGroupsEnum.USERS}
              handleFiltersChange={fetchUsers}
            />
          }
          table={
            <UxTable
              testId="users-not-in-tournament"
              columns={columns}
              dataSource={tournamentStore.getterUsersNotInTournamentList}
              loading={tournamentStore.isLoading}
            />
          }
        />
      </UxBaseDrawer>
    );
  },
);
