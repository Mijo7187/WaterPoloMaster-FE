import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { PaymentForm } from "@components/PagesComponents/Payment/PaymentForm/PaymentForm";
import { UxButton } from "@components/UxComponents";
import { UxBaseModal } from "@components/UxComponents/UxBaseModal/UxBaseModal";
import { PAYMENT_INITIAL_STATE } from "@modules/payment/payment.constants";
import { paymentStore } from "@modules/payment/payment.store";
import { IPostPayment } from "@modules/payment/payment.types";
import { ModalTypeEnum } from "@stores";

export const AddPaymentModal = observer(() => {
  const [paymentForm] = useForm();

  const onFinish = (payload: IPostPayment) => {
    void paymentStore.createPayment(payload);
  };

  return (
    <UxBaseModal
      name={ModalTypeEnum.PAYMENT_MODAL}
      title="Dodaj plaćanje"
      onCancel={() => {
        paymentStore.handleChange("payment", PAYMENT_INITIAL_STATE);
        paymentForm.resetFields();
      }}
    >
      <PaymentForm form={paymentForm} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            paymentForm.submit();
          }}
          testId="submit-payment"
        >
          Sačuvaj
        </UxButton>
      </Flex>
    </UxBaseModal>
  );
});
