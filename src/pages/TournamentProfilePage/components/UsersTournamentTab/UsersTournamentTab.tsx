import { FC, useEffect } from "react";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { DeleteOutlined } from "@ant-design/icons";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxPopconfirm,
  UxSmallHeader,
  UxTable,
} from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament/tournament.store";
import {
  IGetTournament,
  IGetTournamentUsersList,
} from "@modules/tournament/tournament.types";
import { drawerStore, DrawerTypeEnum, PaginationEnum } from "@stores";

import { TournamentUsersDrawer } from "./TournamentUsersDrawer/TournamentUsersDrawer";

interface IUsersTournamentTabProps {
  tournament: IGetTournament;
}

export const UsersTournamentTab: FC<IUsersTournamentTabProps> = observer(
  ({ tournament }) => {
    useEffect(() => {
      void tournamentStore.getTournamentUsersList();
    }, [tournament.id]);

    const columns: ColumnsType<IGetTournamentUsersList> = [
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
        render: (_: unknown, record: IGetTournamentUsersList) => (
          <UxPopconfirm
            title="Ukloni korisnika"
            description="Da li ste sigurni?"
            onConfirm={() => {
              void tournamentStore.removeUserFromTournament(
                record.id,
                tournament.id,
              );
            }}
            testId={"remove-user"}
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
          title="Korisnici"
          rightContent={
            <UxButton
              testId="add-tournament-user"
              onClick={() => {
                drawerStore.openDrawer(DrawerTypeEnum.TOURNAMENT_USERS_DRAWER);
              }}
            >
              + Dodaj korisnika
            </UxButton>
          }
        />
        <UxFilterTableWrapper
          table={
            <UxTable
              testId="tournament-users-list"
              columns={columns}
              dataSource={tournamentStore.getterTournamentUsersList}
              loading={tournamentStore.isLoading}
            />
          }
          pagination={
            <UrlPagination
              testId="tournament-users-pagination"
              paginationName={PaginationEnum.USER_PAGINATION}
              handlePaginationChange={() => {
                void tournamentStore.getTournamentUsersList();
              }}
            />
          }
        />
        <TournamentUsersDrawer tournament={tournament} />
      </div>
    );
  },
);
