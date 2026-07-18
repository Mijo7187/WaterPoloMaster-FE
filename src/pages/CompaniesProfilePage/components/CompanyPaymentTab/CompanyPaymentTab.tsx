import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { companyStore, IGetCompany } from "@modules/company";
import { paymentStore } from "@modules/payment/payment.store";
import { PaymentTable } from "@pages/PaymentsListPage/components/PaymentTable/PaymentTable";

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
    <UxCard testId={"company-payment"}>
      <PaymentTable />
    </UxCard>
  );
});
