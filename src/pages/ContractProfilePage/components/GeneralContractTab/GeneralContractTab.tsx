import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { ContractForm } from "@components/PagesComponents/Contract/ContractForm/ContractForm";
import { UxButton, UxCard } from "@components/UxComponents";
import { UxDynamicScrollDiv } from "@components/UxComponents/UxDynamicScrollDiv/UxDynamicScrollDiv";
import { contractStore } from "@modules/contract/contract.store";
import { IGetContract } from "@modules/contract/contract.types";
import { IGetContractInstallment } from "@modules/contractInstallment/contractInstallment.types";

interface IGeneralContractTabProps {
  contract: IGetContract;
}

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

export const GeneralContractTab: FC<IGeneralContractTabProps> = observer(
  ({ contract }) => {
    const [form] = useForm<IGetContract>();

    // The store narrows this to the four updatable fields before it hits the API.
    const onFinish = (values: IGetContract) => {
      void contractStore.updateContract(contract.id, values);
    };

    useEffect(() => {
      if (!contract.id) return;
      form.setFieldsValue({
        ...contract,
        start_date: toFormDate(contract.start_date),
        end_date: toFormDate(contract.end_date),
        signed_at: toFormDate(contract.signed_at),
        installments_list: toFormInstallments(contract.installments),
      });
    }, [contract]);

    return (
      <>
        <UxCard className="p-20" testId={"contract"}>
          <UxDynamicScrollDiv
            wrapperId={"contract-form"}
            idsToSubtract={[""]}
            extraMinus={380}
          >
            <ContractForm form={form} isEdit onFinish={onFinish} />
          </UxDynamicScrollDiv>
        </UxCard>
        <Flex justify="end" className="mt-10">
          <UxButton
            type="primary"
            onClick={() => {
              form.submit();
            }}
            testId="submit-edit-contract"
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </>
    );
  },
);
