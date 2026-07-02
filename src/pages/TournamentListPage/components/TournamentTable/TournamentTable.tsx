import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable } from "@components/UxComponents";
import { tournamentStore } from "@modules/tournament/tournament.store";
import { IGetTournament } from "@modules/tournament/tournament.types";
import { RoutePathsEnum } from "@router/router.types";

export const TournamentTable: FC = observer(() => {
  const navigate = useNavigate();

  const columns: ColumnsType<IGetTournament> = [
    {
      title: "Klub",
      width: 150,
      minWidth: 150,
      dataIndex: ["company", "name"],
      key: "company_id",
    },
    {
      title: "Bazen",
      width: 150,
      minWidth: 150,
      dataIndex: ["pool", "name"],
      key: "pool_id",
    },
    {
      title: "Od",
      width: 130,
      minWidth: 130,
      dataIndex: "from_date",
      key: "from_date",
    },
    {
      title: "Do",
      width: 130,
      minWidth: 130,
      dataIndex: "to_date",
      key: "to_date",
    },
    {
      title: "Cena",
      width: 100,
      minWidth: 100,
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Broj korisnika",
      width: 120,
      minWidth: 120,
      dataIndex: "number_of_users",
      key: "number_of_users",
    },
    {
      title: "",
      key: "operation",
      fixed: "right" as const,
      width: 50,
      minWidth: 50,
      align: "center" as const,
      render: (_: unknown, record: IGetTournament) => (
        <UxButton
          icon={<EditOutlined />}
          testId={`edit-tournament-${record.id}`}
          onClick={() => {
            void tournamentStore.getTournamentById(record.id);
            void navigate(
              `/${RoutePathsEnum.TOURNAMENT_PROFILE}/${record.id}`,
            );
          }}
        />
      ),
    },
  ];

  return (
    <UxTable
      testId="tournament-list"
      columns={columns}
      dataSource={tournamentStore.getterTournamentsList}
    />
  );
});
