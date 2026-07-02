import { FC } from "react";

import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable } from "@components/UxComponents";
import { paymentStore } from "@modules/payment/payment.store";
import { IGetPayment } from "@modules/payment/payment.types";
import { drawerStore, DrawerTypeEnum } from "@stores";

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
      dataIndex: ["payment_type", "name"],
      key: "payment_type_id",
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
