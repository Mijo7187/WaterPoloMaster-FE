import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { paymentStore } from "@modules/payment/payment.store";
import { IGetUser, usersStore } from "@modules/users";
import { PaymentTable } from "@pages/PaymentsListPage/components/PaymentTable/PaymentTable";

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
    <UxCard testId={"user-payment"}>
      <PaymentTable />
    </UxCard>
  );
});
