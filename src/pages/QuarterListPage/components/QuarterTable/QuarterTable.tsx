import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable } from "@components/UxComponents";
import { quarterStore } from "@modules/quarter/quarter.store";
import { IGetQuarter } from "@modules/quarter/quarter.types";
import { RoutePathsEnum } from "@router/router.types";

export const QuarterTable: FC = observer(() => {
  const navigate = useNavigate();

  const columns: ColumnsType<IGetQuarter> = [
    {
      title: "Kvartal",
      width: 100,
      minWidth: 100,
      dataIndex: "quarter_type",
      key: "quarter_type",
    },
    {
      title: "Godina",
      width: 100,
      minWidth: 100,
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Cena vaterpolo",
      width: 130,
      minWidth: 130,
      dataIndex: "waterpolo_price",
      key: "waterpolo_price",
    },
    {
      title: "Cena plivanje",
      width: 130,
      minWidth: 130,
      dataIndex: "swimming_price",
      key: "swimming_price",
    },
    {
      title: "Vaterpolo igrača",
      width: 140,
      minWidth: 140,
      dataIndex: "number_of_waterpolo_users",
      key: "number_of_waterpolo_users",
    },
    {
      title: "Plivača",
      width: 100,
      minWidth: 100,
      dataIndex: "number_of_swimming_users",
      key: "number_of_swimming_users",
    },
    {
      title: "",
      key: "operation",
      fixed: "right" as const,
      width: 50,
      minWidth: 50,
      align: "center" as const,
      render: (_: unknown, record: IGetQuarter) => (
        <UxButton
          icon={<EditOutlined />}
          testId={`edit-quarter-${record.id}`}
          onClick={() => {
            void quarterStore.getQuarterById(record.id);
            void navigate(`/${RoutePathsEnum.QUARTER_PROFILE}/${record.id}`);
          }}
        />
      ),
    },
  ];

  return (
    <UxTable
      testId="quarter-list"
      columns={columns}
      dataSource={quarterStore.getterQuartersList}
    />
  );
});
