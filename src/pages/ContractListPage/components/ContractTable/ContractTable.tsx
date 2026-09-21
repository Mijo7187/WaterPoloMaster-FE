import { FC } from "react";

import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import {
  UxButton,
  UxPopconfirm,
  UxTable,
  UxTag,
} from "@components/UxComponents";
import {
  CONTRACT_STATUS_COLORS,
  CONTRACT_STATUS_LABELS,
  CONTRACT_TYPE_LABELS,
} from "@modules/contract/contract.constants";
import { contractStore } from "@modules/contract/contract.store";
import {
  ContractStatusEnum,
  ContractTypeEnum,
  IGetContract,
} from "@modules/contract/contract.types";
import { modalStore, ModalTypeEnum } from "@stores";

const formatDate = (value?: string | null) =>
  value ? dayjs(value).format("DD-MM-YYYY") : "";

export const ContractTable: FC = observer(() => {
  const columns: ColumnsType<IGetContract> = [
    {
      title: "Korisnik",
      width: 200,
      minWidth: 200,
      key: "user_id",
      render: (_: unknown, record: IGetContract) =>
        `${record.user.first_name} ${record.user.last_name}`.trim(),
    },

    {
      title: "Tip",
      width: 130,
      minWidth: 130,
      dataIndex: "contract_type",
      key: "contract_type",
      render: (value: ContractTypeEnum) => (
        <UxTag testId={`contract-type-${value}`}>
          {CONTRACT_TYPE_LABELS[value]}
        </UxTag>
      ),
    },
    {
      title: "Program",
      width: 200,
      minWidth: 200,
      render: (_value, record: IGetContract) => {
        return record.contract_type === ContractTypeEnum.MEMBERSHIP &&
          record.membership
          ? `${record.membership.name} · ${record.membership.months_count} mes.`
          : "Ugovor";
      },
    },
    {
      title: "Status",
      width: 130,
      minWidth: 130,
      dataIndex: "status",
      key: "status",
      render: (value: ContractStatusEnum) => (
        <UxTag
          testId={`contract-status-${value}`}
          color={CONTRACT_STATUS_COLORS[value]}
        >
          {CONTRACT_STATUS_LABELS[value]}
        </UxTag>
      ),
    },
    {
      title: "Period",
      width: 200,
      minWidth: 200,
      key: "period",
      render: (_: unknown, record: IGetContract) =>
        `${formatDate(record.start_date)} – ${formatDate(record.end_date)}`,
    },
    {
      title: "Iznos",
      width: 120,
      minWidth: 120,
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "",
      key: "operation",
      fixed: "right" as const,
      width: 100,
      minWidth: 100,
      align: "center" as const,
      render: (_: unknown, record: IGetContract) => (
        <>
          {record.status === ContractStatusEnum.DRAFT ? (
            <UxPopconfirm
              title="Aktiviraj ugovor"
              description="Generisaće se rate. Da li ste sigurni?"
              onConfirm={() => {
                void contractStore.activateContract(record.id);
              }}
              testId={`activate-contract-${record.id}`}
            >
              <UxButton
                icon={<CheckCircleOutlined />}
                testId={`activate-contract-btn-${record.id}`}
              />
            </UxPopconfirm>
          ) : null}
          <UxButton
            icon={<EditOutlined />}
            testId={`edit-contract-${record.id}`}
            onClick={() => {
              void contractStore.getContractById(record.id).then(() => {
                modalStore.openModal(ModalTypeEnum.CONTRACT_MODAL);
              });
            }}
          />
        </>
      ),
    },
  ];

  return (
    <UxTable
      testId="contract-list"
      columns={columns}
      dataSource={contractStore.getterContractsList}
      loading={contractStore.isLoading}
    />
  );
});
