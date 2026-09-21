import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxButton, UxPageHeader, UxPopconfirm } from "@components/UxComponents";
import { CONTRACT_TYPE_LABELS } from "@modules/contract/contract.constants";
import { contractStore } from "@modules/contract/contract.store";
import {
  ContractStatusEnum,
  IGetContract,
} from "@modules/contract/contract.types";

import { GeneralContractTab } from "./components/GeneralContractTab/GeneralContractTab";
import { InstallmentsContractTab } from "./components/InstallmentsContractTab/InstallmentsContractTab";

export const ContractProfilePage: FC = observer(() => {
  const { contractId } = useParams();
  const id = Number(contractId);

  const contract = contractStore.getterContract as IGetContract;

  useEffect(() => {
    if (!id) return;
    void contractStore.getContractById(id);
  }, [id]);

  const tabItems = [
    {
      key: "info",
      label: "Informacije",
      children: <GeneralContractTab contract={contract} />,
    },
    {
      key: "installments",
      label: "Rate",
      children: <InstallmentsContractTab contractId={id} />,
    },
  ];
  console.log("contract", contract);
  // Before the fetch resolves the store holds the initial state, which has no user.
  const storeContract = contractStore.getterContract;
  const userName =
    "user" in storeContract
      ? `${storeContract.user.first_name} ${storeContract.user.last_name}`
      : "";

  return (
    <div>
      <UxPageHeader
        title={`Ugovor / ${CONTRACT_TYPE_LABELS[contract.contract_type]} ${userName}`}
        rightContent={
          contract.status === ContractStatusEnum.DRAFT ? (
            <UxPopconfirm
              title="Aktiviraj ugovor"
              description="Generisaće se rate. Da li ste sigurni?"
              onConfirm={() => {
                void contractStore.activateContract(id);
              }}
              testId="activate-contract"
            >
              <UxButton type="primary" testId="activate-contract-btn">
                Aktiviraj ugovor
              </UxButton>
            </UxPopconfirm>
          ) : null
        }
      />
      <UrlTabs testId="contract-profile-tabs" items={tabItems} />
    </div>
  );
});
