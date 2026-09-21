import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxPageHeader,
} from "@components/UxComponents";
import { companyStore } from "@modules/company/company.store";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { AddCompanyModal } from "./components/AddCompanyModal/AddCompanyModal";
import { CompanyFilters } from "./components/CompanyFilters/CompanyFilters";
import { CompanyTable } from "./components/CompanyTable/CompanyTable";

export const CompaniesListPage: FC = observer(() => {
  const onAddCompanyClick = () => {
    modalStore.openModal(ModalTypeEnum.COMPANY_MODAL);
  };

  const fetchCompanies = () => {
    void companyStore.getCompanies();
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista kompanija"
        rightContent={
          <UxButton testId={"add-company"} onClick={onAddCompanyClick}>
            + dodaj kompaniju
          </UxButton>
        }
      />

      <UxFilterTableWrapper
        filters={<CompanyFilters />}
        table={<CompanyTable />}
        pagination={
          <UrlPagination
            testId={PaginationEnum.COMPANY_PAGINATION}
            paginationName={PaginationEnum.COMPANY_PAGINATION}
            handlePaginationChange={fetchCompanies}
          />
        }
      />

      <AddCompanyModal />
    </div>
  );
});
