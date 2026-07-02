import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxButton, UxPageHeader } from "@components/UxComponents";
import { paymentStore } from "@modules/payment/payment.store";
import { modalStore, ModalTypeEnum } from "@stores";

import { AddPaymentModal } from "./components/AddPaymentModal/AddPaymentModal";
import { PaymentDrawer } from "./components/PaymentDrawer/PaymentDrawer";
import { PaymentTable } from "./components/PaymentTable/PaymentTable";

export const PaymentsListPage: FC = observer(() => {
  useEffect(() => {
    void paymentStore.getPaymentList();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista plaćanja"
        rightContent={
          <UxButton
            testId="add-payment"
            onClick={() => {
              modalStore.openModal(ModalTypeEnum.PAYMENT_MODAL);
            }}
          >
            + Dodaj plaćanje
          </UxButton>
        }
      />
      <PaymentTable />
      <AddPaymentModal />
      <PaymentDrawer />
    </div>
  );
});
