import { FC } from "react";

import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable } from "@components/UxComponents";
import { IGetContractInstallment } from "@modules/contractInstallment/contractInstallment.types";
import {
  PAYABLE_TYPE_LABELS,
  PAYMENT_TYPE_LABELS,
} from "@modules/payment/payment.constants";
import { paymentStore } from "@modules/payment/payment.store";
import {
  IGetPayment,
  PayableTypeEnum,
  PaymentTypeEnum,
} from "@modules/payment/payment.types";
import { IGetTournament } from "@modules/tournament/tournament.types";
import { IGetTraining } from "@modules/training/training.types";
import { drawerStore, DrawerTypeEnum } from "@stores";

const formatDate = (value?: string | null) =>
  value ? dayjs(value).format("DD-MM-YYYY") : "";

/**
 * One render for every payable kind — the backend embeds the resolved object,
 * so the type tag alone tells us how to read it.
 */
const renderPayable = (record: IGetPayment) => {
  if (!record.payable_type || !record.payable) return "";

  const label = PAYABLE_TYPE_LABELS[record.payable_type];

  switch (record.payable_type) {
    case PayableTypeEnum.CONTRACT_INSTALLMENT: {
      const installment = record.payable as IGetContractInstallment;
      return `${label} · dospeva ${formatDate(installment.due_date)}`;
    }
    case PayableTypeEnum.TOURNAMENT: {
      const tournament = record.payable as IGetTournament;
      return `${label} · ${formatDate(tournament.from_date)} – ${formatDate(tournament.to_date)}`;
    }
    case PayableTypeEnum.TRAINING: {
      const training = record.payable as IGetTraining;
      return `${label} · ${formatDate(training.training_date)}`;
    }
    default:
      return label;
  }
};

export const PaymentTable: FC = observer(() => {
  const columns: ColumnsType<IGetPayment> = [
    {
      title: "Pošiljalac",
      dataIndex: ["sender_wallet", "name"],
      key: "sender_wallet",
      width: 200,
      minWidth: 200,
    },
    {
      title: "Primalac",
      dataIndex: ["receiver_wallet", "name"],
      key: "receiver_wallet",
      width: 200,
      minWidth: 200,
    },
    {
      title: "Tip plaćanja",
      width: 150,
      minWidth: 150,
      dataIndex: "payment_type",
      key: "payment_type",
      render: (value: PaymentTypeEnum) => PAYMENT_TYPE_LABELS[value],
    },
    {
      title: "Osnov",
      width: 220,
      minWidth: 220,
      key: "payable",
      render: (_: unknown, record: IGetPayment) => renderPayable(record),
    },
    {
      title: "Iznos",
      width: 120,
      minWidth: 120,
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      width: 130,
      minWidth: 130,
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Datum",
      width: 160,
      minWidth: 160,
      dataIndex: "created_at",
      key: "created_at",
      render(value: string) {
        return dayjs(value).format("DD-MM-YYYY");
      },
    },
    {
      title: "",
      key: "operation",
      fixed: "right" as const,
      width: 50,
      minWidth: 50,
      align: "center" as const,
      render: (_: unknown, record: IGetPayment) => (
        <UxButton
          icon={<EditOutlined />}
          testId={`edit-payment-${record.id}`}
          onClick={() => {
            drawerStore.openDrawer(DrawerTypeEnum.PAYMENT_DRAWER);
            void paymentStore.getPaymentById(record.id);
          }}
        />
      ),
    },
  ];

  return (
    <UxTable
      testId="payment-list"
      columns={columns}
      dataSource={paymentStore.getterPaymentList}
    />
  );
});
