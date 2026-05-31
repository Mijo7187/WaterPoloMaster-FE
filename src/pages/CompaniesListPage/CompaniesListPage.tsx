import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxButton, UxPageHeader } from "@components/UxComponents";
import { companyStore } from "@modules/company/company.store";
import { modalStore, ModalTypeEnum } from "@stores";

import { AddCompanyModal } from "./components/AddCompanyModal/AddCompanyModal";
import { CompanyFilters } from "./components/CompanyFilters/CompanyFilters";
import { CompanyTable } from "./components/CompanyTable/CompanyTable";

export const CompaniesListPage: FC = observer(() => {
  const onAddCompanyClick = () => {
    modalStore.openModal(ModalTypeEnum.COMPANY_MODAL);
  };

  useEffect(() => {
    void companyStore.getCompanies();
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
      <CompanyFilters />
      <CompanyTable />
      <AddCompanyModal />
    </div>
  );
});
