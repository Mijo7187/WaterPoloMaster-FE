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

interface IUsersSeasonTabProps {
  seasonId: number;
}

/**
 * A season's members are its contracts — enrolment is a MEMBERSHIP contract now
 * that quarter_users is gone, so this lists contracts rather than a join table.
 *
 * `season_id` matches on **date overlap**, not on the offering a contract is
 * priced against: open-ended (end_date null) and multi-year contracts show up
 * here too. A row is therefore not necessarily "a contract of this season", and
 * the same contract can appear under several seasons.
 */
export const UsersSeasonTab: FC<IUsersSeasonTabProps> = observer(
  ({ seasonId }) => {
    const fetchContracts = () => {
      if (!seasonId) return;
      void contractStore.getContractsListBySeasonId(seasonId);
    };

    useEffect(() => {
      fetchContracts();
    }, [seasonId]);

    return (
      <div>
        <UxSmallHeader
          title="Članovi u sezoni"
          rightContent={
            <UxButton
              testId="add-season-contract"
              onClick={() => {
                modalStore.openModal(ModalTypeEnum.CONTRACT_MODAL);
              }}
            >
              + Dodaj ugovor
            </UxButton>
          }
        />
        <UxFilterTableWrapper
          filters={
            <ContractFilters
              handleFiltersChange={fetchContracts}
              hiddenFields={["season_id"]}
            />
          }
          table={<ContractTable />}
          pagination={
            <UrlPagination
              testId="season-users-pagination"
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
