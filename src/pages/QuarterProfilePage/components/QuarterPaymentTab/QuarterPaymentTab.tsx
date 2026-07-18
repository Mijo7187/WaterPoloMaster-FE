import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { paymentStore } from "@modules/payment/payment.store";
import { PaymentTable } from "@pages/PaymentsListPage/components/PaymentTable/PaymentTable";

interface IQuarterPaymentTabProps {
  quarterId: number;
}

export const QuarterPaymentTab: FC<IQuarterPaymentTabProps> = observer(
  ({ quarterId }) => {
    useEffect(() => {
      if (!quarterId) return;
      void paymentStore.getPaymentListByQuarter(quarterId);
    }, [quarterId]);

    return (
      <UxCard testId={"quarter-payment"}>
        <PaymentTable />
      </UxCard>
    );
  },
);
