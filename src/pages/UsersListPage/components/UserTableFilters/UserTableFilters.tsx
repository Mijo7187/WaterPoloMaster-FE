import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import { usersStore } from "@modules/users";
import {
  FilterConfig,
  FilterGroupsEnum,
  FilterTypeEnum,
  IFiltersComponentProps,
  PaginationEnum,
} from "@stores";
import {
  FILTER_COMPANY,
  FILTER_FIRST_NAME,
  FILTER_IS_ACTIVE,
} from "@stores/filters/filtersOptions.constants";

export const UserFilters: FC<IFiltersComponentProps> = observer(
  ({ handleFiltersChange, hiddenFields }) => {
    const [form] = useForm();

    const optionsFilters: FilterConfig[] = [
      { ...FILTER_FIRST_NAME, testId: "user-first-name", colSpan: 6 },
      {
        type: FilterTypeEnum.INPUT,
        formName: "last_name__ilike",
        label: "Prezime",
        placeholder: "Pretraži po prezimenu",
        testId: "user-last-name",
        colSpan: 6,
      },
      { ...FILTER_COMPANY, storeKey: "user_filter_company", colSpan: 6 },
      { ...FILTER_IS_ACTIVE, colSpan: 4 },
    ];

    return (
      <UrlFilters
        testId="users"
        form={form}
        filterOptions={optionsFilters}
        hiddenFields={hiddenFields}
        filterName={FilterGroupsEnum.USERS}
        paginationName={PaginationEnum.USER_PAGINATION}
        handleFiltersChange={
          handleFiltersChange ??
          (() => {
            void usersStore.getAllUsers();
          })
        }
      />
    );
  },
);
