import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import { seasonStore } from "@modules/season/season.store";
import {
  FilterConfig,
  FilterGroupsEnum,
  FilterTypeEnum,
  IFiltersComponentProps,
  PaginationEnum,
} from "@stores";
import { YES_NO_OPTIONS } from "@stores/filters/filtersOptions.constants";

export const SeasonFilters: FC<IFiltersComponentProps> = observer(
  ({ handleFiltersChange, hiddenFields }) => {
    const [form] = useForm();

    const optionsFilters: FilterConfig[] = [
      {
        type: FilterTypeEnum.SELECT,
        formName: "is_current",
        label: "Tekuća sezona",
        placeholder: "Sve",
        options: YES_NO_OPTIONS,
        testId: "season-is-current",
        colSpan: 6,
      },
    ];

    return (
      <UrlFilters
        testId="season"
        form={form}
        filterOptions={optionsFilters}
        hiddenFields={hiddenFields}
        filterName={FilterGroupsEnum.SEASON}
        paginationName={PaginationEnum.SEASON_PAGINATION}
        handleFiltersChange={
          handleFiltersChange ??
          (() => {
            void seasonStore.getSeasonsList();
          })
        }
      />
    );
  },
);
