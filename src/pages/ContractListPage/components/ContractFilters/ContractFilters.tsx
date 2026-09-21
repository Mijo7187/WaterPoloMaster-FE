import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import { authStore } from "@modules/auth/auth.store";
import {
  CONTRACT_FILTERS_INITIAL_STATE,
  CONTRACT_STATUS_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
} from "@modules/contract/contract.constants";
import { contractStore } from "@modules/contract/contract.store";
import {
  FilterConfig,
  FilterGroupsEnum,
  FilterTypeEnum,
  IFiltersComponentProps,
  PaginationEnum,
} from "@stores";
import { FILTER_SEASON } from "@stores/filters/filtersOptions.constants";

export const ContractFilters: FC<IFiltersComponentProps> = observer(
  ({ handleFiltersChange, hiddenFields }) => {
    const [form] = useForm();

    const optionsFilters: FilterConfig[] = [
      {
        ...FILTER_SEASON,
        storeKey: "contract_filter_season",
        testId: "contract-season",
        filtersForGet: { company_id: authStore.getAuthUser.company_id },
        colSpan: 6,
      },
      {
        type: FilterTypeEnum.SELECT,
        formName: "status",
        label: "Status",
        placeholder: "Svi statusi",
        options: CONTRACT_STATUS_OPTIONS,
        testId: "contract-status",
        colSpan: 6,
      },
      {
        type: FilterTypeEnum.SELECT,
        formName: "contract_type",
        label: "Tip ugovora",
        placeholder: "Svi tipovi",
        options: CONTRACT_TYPE_OPTIONS,
        testId: "contract-type",
        colSpan: 6,
      },
    ];

    return (
      <UrlFilters
        testId="contract"
        form={form}
        initialValues={CONTRACT_FILTERS_INITIAL_STATE}
        filterOptions={optionsFilters}
        hiddenFields={hiddenFields}
        filterName={FilterGroupsEnum.CONTRACT}
        paginationName={PaginationEnum.CONTRACT_PAGINATION}
        handleFiltersChange={
          handleFiltersChange ??
          (() => {
            void contractStore.getContractsList();
          })
        }
      />
    );
  },
);
