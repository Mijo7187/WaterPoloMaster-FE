import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable } from "@components/UxComponents";
import { trainingStore } from "@modules/training/training.store";
import { IGetTraining } from "@modules/training/training.types";
import { RoutePathsEnum } from "@router/router.types";

export const TrainingTable: FC = observer(() => {
  const navigate = useNavigate();

  const columns: ColumnsType<IGetTraining> = [
    {
      title: "Bazen",
      width: 150,
      minWidth: 150,
      dataIndex: ["pool", "name"],
      key: "pool_id",
    },
    {
      title: "Datum",
      width: 130,
      minWidth: 130,
      dataIndex: "training_date",
      key: "training_date",
    },
    {
      title: "Početak",
      width: 100,
      minWidth: 100,
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Kraj",
      width: 100,
      minWidth: 100,
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Status",
      width: 150,
      minWidth: 150,
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Cena",
      width: 100,
      minWidth: 100,
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Broj igrača",
      width: 100,
      minWidth: 100,
      dataIndex: "number_of_players",
      key: "number_of_players",
    },
    {
      title: "",
      key: "operation",
      fixed: "right" as const,
      width: 50,
      minWidth: 50,
      align: "center" as const,
      render: (_: unknown, record: IGetTraining) => (
        <UxButton
          icon={<EditOutlined />}
          testId={`edit-training-${record.id}`}
          onClick={() => {
            void trainingStore.getTrainingById(record.id);
            void navigate(`/${RoutePathsEnum.TRAINING_PROFILE}/${record.id}`);
          }}
        />
      ),
    },
  ];

  return (
    <UxTable
      testId="training-list"
      columns={columns}
      dataSource={trainingStore.getterTrainingsList}
    />
  );
});
