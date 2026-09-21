import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable, UxTag } from "@components/UxComponents";
import { seasonStore } from "@modules/season/season.store";
import { IGetSeason } from "@modules/season/season.types";
import { RoutePathsEnum } from "@router/router.types";

const formatDate = (value?: string | null) =>
  value ? dayjs(value).format("DD-MM-YYYY") : "";

export const SeasonTable: FC = observer(() => {
  const navigate = useNavigate();

  const columns: ColumnsType<IGetSeason> = [
    {
      title: "Naziv",
      width: 200,
      minWidth: 200,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Period",
      width: 220,
      minWidth: 220,
      key: "period",
      render: (_: unknown, record: IGetSeason) =>
        `${formatDate(record.start_date)} – ${formatDate(record.end_date)}`,
    },
    {
      title: "Tekuća",
      width: 120,
      minWidth: 120,
      dataIndex: "is_current",
      key: "is_current",
      render: (value: boolean) =>
        value ? (
          <UxTag testId="season-current" color="green">
            Tekuća
          </UxTag>
        ) : null,
    },
    {
      title: "",
      key: "operation",
      fixed: "right" as const,
      width: 50,
      minWidth: 50,
      align: "center" as const,
      render: (_: unknown, record: IGetSeason) => (
        <UxButton
          icon={<EditOutlined />}
          testId={`edit-season-${record.id}`}
          onClick={() => {
            void seasonStore.getSeasonById(record.id);
            void navigate(`/${RoutePathsEnum.SEASON_PROFILE}/${record.id}`);
          }}
        />
      ),
    },
  ];

  return (
    <UxTable
      testId="season-list"
      columns={columns}
      dataSource={seasonStore.getterSeasonsList}
      loading={seasonStore.isLoading}
    />
  );
});
