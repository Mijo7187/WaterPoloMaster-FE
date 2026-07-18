import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { PaymentForm } from "@components/PagesComponents/Payment/PaymentForm/PaymentForm";
import { UxButton } from "@components/UxComponents";
import { UxBaseDrawer } from "@components/UxComponents/UxBaseDrawer/UxBaseDrawer";
import { PAYMENT_INITIAL_STATE } from "@modules/payment/payment.constants";
import { paymentStore } from "@modules/payment/payment.store";
import { IGetPayment, IPostPayment } from "@modules/payment/payment.types";
import { drawerStore, DrawerTypeEnum } from "@stores";

export const PaymentDrawer: FC = observer(() => {
  const [paymentForm] = useForm<IGetPayment>();
  const payment = paymentStore.getterPayment as IGetPayment;

  const onClose = () => {
    drawerStore.clearDrawer(DrawerTypeEnum.PAYMENT_DRAWER);
    paymentStore.handleChange("payment", PAYMENT_INITIAL_STATE);
    paymentForm.resetFields();
  };

  const onFinish = (values: IPostPayment) => {
    void paymentStore.updatePayment(payment.id, {
      status: values.status,
    });
  };

  useEffect(() => {
    if (!payment.id) return;
    paymentForm.setFieldsValue({ ...payment });
  }, [payment]);

  return (
    <UxBaseDrawer
      name={DrawerTypeEnum.PAYMENT_DRAWER}
      title={`Plaćanje / ${payment.id ? payment.id.slice(0, 8) : ""}`}
      onCancel={onClose}
      testId={DrawerTypeEnum.PAYMENT_DRAWER}
      size="50%"
    >
      <div className="p-20">
        <PaymentForm form={paymentForm} onFinish={onFinish} />
        <Flex justify="end" className="mt-10">
          <UxButton
            type="primary"
            onClick={() => {
              paymentForm.submit();
            }}
            testId="submit-edit-payment"
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </div>
    </UxBaseDrawer>
  );
});
