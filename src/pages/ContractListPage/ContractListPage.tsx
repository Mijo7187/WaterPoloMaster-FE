import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxPageHeader,
} from "@components/UxComponents";
import { CONTRACT_INITIAL_STATE } from "@modules/contract/contract.constants";
import { contractStore } from "@modules/contract/contract.store";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { AddContractModal } from "./components/AddContractModal/AddContractModal";
import { ContractFilters } from "./components/ContractFilters/ContractFilters";
import { ContractTable } from "./components/ContractTable/ContractTable";

export const ContractListPage: FC = observer(() => {
  const fetchContracts = () => {
    void contractStore.getContractsList();
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista ugovora"
        rightContent={
          <UxButton
            testId="add-contract"
            onClick={() => {
              contractStore.handleChange("contract", CONTRACT_INITIAL_STATE);
              modalStore.openModal(ModalTypeEnum.CONTRACT_MODAL);
            }}
          >
            + Dodaj ugovor
          </UxButton>
        }
      />

      <UxFilterTableWrapper
        filters={<ContractFilters />}
        table={<ContractTable />}
        pagination={
          <UrlPagination
            testId={PaginationEnum.CONTRACT_PAGINATION}
            paginationName={PaginationEnum.CONTRACT_PAGINATION}
            handlePaginationChange={fetchContracts}
          />
        }
      />

      <AddContractModal />
    </div>
  );
});
