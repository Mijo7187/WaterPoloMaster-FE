import { useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { ContractForm } from "@components/PagesComponents/Contract/ContractForm/ContractForm";
import { UxButton } from "@components/UxComponents";
import { UxBaseModal } from "@components/UxComponents/UxBaseModal/UxBaseModal";
import { CONTRACT_INITIAL_STATE } from "@modules/contract/contract.constants";
import { contractStore } from "@modules/contract/contract.store";
import { IGetContract } from "@modules/contract/contract.types";
import { IGetContractInstallment } from "@modules/contractInstallment/contractInstallment.types";
import { modalStore, ModalTypeEnum } from "@stores";

const toFormDate = (value?: string | null) =>
  value ? (dayjs(value) as unknown as string) : "";

/** The saved schedule, shown read-only in the form's installments list. */
const toFormInstallments = (installments?: IGetContractInstallment[]) =>
  (installments ?? []).map((installment) => ({
    period_start: toFormDate(installment.period_start),
    period_end: toFormDate(installment.period_end),
    due_date: toFormDate(installment.due_date),
    amount: installment.amount,
  }));

export const AddContractModal = observer(() => {
  const [contractForm] = useForm<IGetContract>();

  const contract = contractStore.getterContract;
  const editId = "id" in contract ? contract.id : null;
  const isOpen = modalStore.getterModalListNames.includes(
    ModalTypeEnum.CONTRACT_MODAL,
  );

  // Runs after the modal (and its Form) mounts, so the form instance is connected.
  useEffect(() => {
    if (!isOpen) return;
    if (!editId) {
      contractForm.resetFields();
      return;
    }
    contractForm.setFieldsValue({
      ...contract,
      start_date: toFormDate(contract.start_date),
      end_date: toFormDate(contract.end_date),
      signed_at: toFormDate(contract.signed_at),
      installments_list: toFormInstallments(
        "installments" in contract ? contract.installments : [],
      ),
    } as IGetContract);
  }, [isOpen, contract]);

  const onFinish = (values: IGetContract) => {
    if (editId) {
      void contractStore.updateContractFromList(editId, values);
      return;
    }
    void contractStore.createContract(values);
  };

  return (
    <UxBaseModal
      name={ModalTypeEnum.CONTRACT_MODAL}
      title={editId ? "Izmeni ugovor" : "Dodaj ugovor"}
      width={"70%"}
      onCancel={() => {
        contractStore.handleChange("contract", CONTRACT_INITIAL_STATE);
        contractForm.resetFields();
      }}
    >
      <ContractForm form={contractForm} isEdit={!!editId} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            contractForm.submit();
          }}
          testId="submit-contract"
        >
          Sačuvaj
        </UxButton>
      </Flex>
    </UxBaseModal>
  );
});
