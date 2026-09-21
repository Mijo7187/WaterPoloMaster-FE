import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import { COMPANY_FILTERS_INITIAL_STATE } from "@modules/company/company.constants";
import { companyStore } from "@modules/company/company.store";
import {
  FilterConfig,
  FilterGroupsEnum,
  IFiltersComponentProps,
  PaginationEnum,
} from "@stores";
import { FILTER_NAME } from "@stores/filters/filtersOptions.constants";

export const CompanyFilters: FC<IFiltersComponentProps> = observer(
  ({ handleFiltersChange, hiddenFields }) => {
    const [form] = useForm();

    const optionsFilters: FilterConfig[] = [
      { ...FILTER_NAME, testId: "company-name", colSpan: 8 },
    ];

    return (
      <UrlFilters
        testId="company"
        form={form}
        initialValues={COMPANY_FILTERS_INITIAL_STATE}
        filterOptions={optionsFilters}
        hiddenFields={hiddenFields}
        filterName={FilterGroupsEnum.COMPANY}
        paginationName={PaginationEnum.COMPANY_PAGINATION}
        handleFiltersChange={
          handleFiltersChange ??
          (() => {
            void companyStore.getCompanies();
          })
        }
      />
    );
  },
);
