import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import {
  MEMBERSHIP_FILTERS_INITIAL_STATE,
  PROGRAM_OPTIONS,
} from "@modules/membership/membership.constants";
import { membershipStore } from "@modules/membership/membership.store";
import {
  FilterConfig,
  FilterGroupsEnum,
  FilterTypeEnum,
  IFiltersComponentProps,
  PaginationEnum,
} from "@stores";
import {
  FILTER_IS_ACTIVE,
  FILTER_NAME,
} from "@stores/filters/filtersOptions.constants";

export const MembershipFilters: FC<IFiltersComponentProps> = observer(
  ({ handleFiltersChange, hiddenFields }) => {
    const [form] = useForm();

    const optionsFilters: FilterConfig[] = [
      { ...FILTER_NAME, testId: "membership-name", colSpan: 6 },
      {
        type: FilterTypeEnum.SELECT,
        formName: "program",
        label: "Program",
        placeholder: "Svi programi",
        options: PROGRAM_OPTIONS,
        testId: "membership-program",
        colSpan: 6,
      },
      {
        type: FilterTypeEnum.INPUT_NUMBER,
        formName: "months_count",
        label: "Trajanje (meseci)",
        min: 1,
        testId: "membership-months-count",
        colSpan: 6,
      },
      { ...FILTER_IS_ACTIVE, testId: "membership-is-active", colSpan: 6 },
    ];

    return (
      <UrlFilters
        testId="membership"
        form={form}
        initialValues={MEMBERSHIP_FILTERS_INITIAL_STATE}
        filterOptions={optionsFilters}
        hiddenFields={hiddenFields}
        filterName={FilterGroupsEnum.MEMBERSHIP}
        paginationName={PaginationEnum.MEMBERSHIP_PAGINATION}
        handleFiltersChange={
          handleFiltersChange ??
          (() => {
            void membershipStore.getMembershipsList();
          })
        }
      />
    );
  },
);
