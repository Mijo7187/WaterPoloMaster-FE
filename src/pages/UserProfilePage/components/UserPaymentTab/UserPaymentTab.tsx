import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { paymentStore } from "@modules/payment/payment.store";
import { IGetUser, usersStore } from "@modules/users";
import { PaymentFilters } from "@pages/PaymentsListPage/components/PaymentFilters/PaymentFilters";
import { PaymentTable } from "@pages/PaymentsListPage/components/PaymentTable/PaymentTable";
import { PaginationEnum } from "@stores";

interface IUserPaymentTabProps {
  userId: number;
}

export const UserPaymentTab: FC<IUserPaymentTabProps> = observer(() => {
  const walletId = (usersStore.getterUser as IGetUser).w_id;

  const fetchPayment = () => {
    if (!walletId) return;
    void paymentStore.getPaymentListByWallet(walletId);
  };

  useEffect(() => {
    fetchPayment();
  }, [walletId]);

  return (
    <UxFilterTableWrapper
      filters={<PaymentFilters handleFiltersChange={fetchPayment} />}
      table={<PaymentTable />}
      pagination={
        <UrlPagination
          testId="user-payment-pagination"
          paginationName={PaginationEnum.PAYMENT_PAGINATION}
          handlePaginationChange={fetchPayment}
        />
      }
    />
  );
});
