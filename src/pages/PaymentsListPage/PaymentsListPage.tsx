import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxPageHeader,
} from "@components/UxComponents";
import { paymentStore } from "@modules/payment/payment.store";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { AddPaymentModal } from "./components/AddPaymentModal/AddPaymentModal";
import { PaymentDrawer } from "./components/PaymentDrawer/PaymentDrawer";
import { PaymentFilters } from "./components/PaymentFilters/PaymentFilters";
import { PaymentTable } from "./components/PaymentTable/PaymentTable";

export const PaymentsListPage: FC = observer(() => {
  const fetchPayments = () => {
    void paymentStore.getPaymentList();
  };

  useEffect(() => {
    fetchPayments();
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

      <UxFilterTableWrapper
        filters={<PaymentFilters />}
        table={<PaymentTable />}
        pagination={
          <UrlPagination
            testId={PaginationEnum.PAYMENT_PAGINATION}
            paginationName={PaginationEnum.PAYMENT_PAGINATION}
            handlePaginationChange={fetchPayments}
          />
        }
      />

      <AddPaymentModal />
      <PaymentDrawer />
    </div>
  );
});
