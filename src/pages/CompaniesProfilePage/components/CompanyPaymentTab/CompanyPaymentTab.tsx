import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { companyStore, IGetCompany } from "@modules/company";
import { paymentStore } from "@modules/payment/payment.store";
import { PaymentFilters } from "@pages/PaymentsListPage/components/PaymentFilters/PaymentFilters";
import { PaymentTable } from "@pages/PaymentsListPage/components/PaymentTable/PaymentTable";
import { PaginationEnum } from "@stores";

interface ICompanyPaymentTabProps {
  companyId: number;
}

export const CompanyPaymentTab: FC<ICompanyPaymentTabProps> = observer(() => {
  const walletId = (companyStore.getterCompany as IGetCompany).w_id;

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
          testId="company-payment-pagination"
          paginationName={PaginationEnum.PAYMENT_PAGINATION}
          handlePaginationChange={fetchPayment}
        />
      }
    />
  );
});
