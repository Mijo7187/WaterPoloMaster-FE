import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { contractStore } from "@modules/contract/contract.store";
import { ContractFilters } from "@pages/ContractListPage/components/ContractFilters/ContractFilters";
import { ContractTable } from "@pages/ContractListPage/components/ContractTable/ContractTable";
import { PaginationEnum } from "@stores";

interface ICompanyContractTabProps {
  companyId: number;
}

export const CompanyContractTab: FC<ICompanyContractTabProps> = observer(
  ({ companyId }) => {
    const fetchContracts = () => {
      void contractStore.getContractsListByCompanyId(companyId);
    };

    useEffect(() => {
      fetchContracts();
    }, [companyId]);

    return (
      <UxFilterTableWrapper
        filters={<ContractFilters handleFiltersChange={fetchContracts} />}
        table={<ContractTable />}
        pagination={
          <UrlPagination
            testId="company-contract-pagination"
            paginationName={PaginationEnum.CONTRACT_PAGINATION}
            handlePaginationChange={fetchContracts}
          />
        }
      />
    );
  },
);
