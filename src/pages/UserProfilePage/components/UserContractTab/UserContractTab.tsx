import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxSmallHeader,
} from "@components/UxComponents";
import { contractStore } from "@modules/contract/contract.store";
import { AddContractModal } from "@pages/ContractListPage/components/AddContractModal/AddContractModal";
import { ContractFilters } from "@pages/ContractListPage/components/ContractFilters/ContractFilters";
import { ContractTable } from "@pages/ContractListPage/components/ContractTable/ContractTable";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

interface IUserContractTabProps {
  userId: number;
}

export const UserContractTab: FC<IUserContractTabProps> = observer(
  ({ userId }) => {
    const fetchContracts = () => {
      void contractStore.getContractsListByUserId(userId);
    };

    useEffect(() => {
      fetchContracts();
    }, [userId]);

    return (
      <div>
        {/* Enrolling a player now means signing a MEMBERSHIP contract, so this
            is where the old "add user to quarter" entry point leads. */}
        <UxSmallHeader
          title="Ugovori"
          rightContent={
            <UxButton
              testId="add-user-contract"
              onClick={() => {
                modalStore.openModal(ModalTypeEnum.CONTRACT_MODAL);
              }}
            >
              + Dodaj ugovor
            </UxButton>
          }
        />
        <UxFilterTableWrapper
          filters={<ContractFilters handleFiltersChange={fetchContracts} />}
          table={<ContractTable />}
          pagination={
            <UrlPagination
              testId="user-contract-pagination"
              paginationName={PaginationEnum.CONTRACT_PAGINATION}
              handlePaginationChange={fetchContracts}
            />
          }
        />
        <AddContractModal />
      </div>
    );
  },
);
