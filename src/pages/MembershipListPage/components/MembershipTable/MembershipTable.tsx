import { FC } from "react";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable, UxTag } from "@components/UxComponents";
import { PROGRAM_LABELS } from "@modules/membership/membership.constants";
import { membershipStore } from "@modules/membership/membership.store";
import {
  IGetMembership,
  ProgramEnum,
} from "@modules/membership/membership.types";
import { modalStore, ModalTypeEnum } from "@stores";

export const MembershipTable: FC = observer(() => {
  const columns: ColumnsType<IGetMembership> = [
    {
      title: "Naziv",
      width: 220,
      minWidth: 220,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Program",
      width: 130,
      minWidth: 130,
      dataIndex: "program",
      key: "program",
      render: (value: ProgramEnum) => PROGRAM_LABELS[value],
    },
    {
      title: "Trajanje",
      width: 120,
      minWidth: 120,
      dataIndex: "months_count",
      key: "months_count",
      render: (value: number) => `${value} mes.`,
    },
    {
      title: "Cena / mesec",
      width: 140,
      minWidth: 140,
      dataIndex: "price_month",
      key: "price_month",
    },
    {
      title: "Ukupno",
      width: 140,
      minWidth: 140,
      dataIndex: "price_total",
      key: "price_total",
    },
    {
      title: "Broj rata",
      width: 110,
      minWidth: 110,
      dataIndex: "installments_count",
      key: "installments_count",
    },
    {
      title: "Status",
      width: 120,
      minWidth: 120,
      dataIndex: "is_active",
      key: "is_active",
      render: (value: boolean) => (
        <UxTag
          testId={`membership-active-${String(value)}`}
          color={value ? "green" : "default"}
        >
          {value ? "Aktivna" : "Neaktivna"}
        </UxTag>
      ),
    },
    {
      title: "",
      key: "operation",
      fixed: "right" as const,
      width: 50,
      minWidth: 50,

      align: "center" as const,
      render: (_: unknown, record: IGetMembership) => (
        <UxButton
          icon={<EditOutlined />}
          testId={`edit-membership-${record.id}`}
          onClick={() => {
            // There is no membership profile page — editing happens in the
            // same modal the list uses to create one.
            membershipStore.handleChange("membership", record);
            modalStore.openModal(ModalTypeEnum.MEMBERSHIP_MODAL);
          }}
        />
      ),
    },
  ];

  return (
    <UxTable
      testId="membership-list"
      columns={columns}
      dataSource={membershipStore.getterMembershipsList}
      loading={membershipStore.isLoading}
      overrideHeight="30"
    />
  );
});
