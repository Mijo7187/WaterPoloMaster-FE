import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import { authStore } from "@modules/auth/auth.store";
import { tournamentStore } from "@modules/tournament/tournament.store";
import {
  FilterConfig,
  FilterGroupsEnum,
  IFiltersComponentProps,
  PaginationEnum,
} from "@stores";
import { FILTER_SEASON } from "@stores/filters/filtersOptions.constants";

export const TournamentFilters: FC<IFiltersComponentProps> = observer(
  ({ handleFiltersChange, hiddenFields }) => {
    const [form] = useForm();

    const optionsFilters: FilterConfig[] = [
      {
        ...FILTER_SEASON,
        storeKey: "tournament_filter_season",
        testId: "tournament-season",
        filtersForGet: { company_id: authStore.getAuthUser.company_id },
        colSpan: 6,
      },
    ];

    return (
      <UrlFilters
        testId="tournament"
        form={form}
        filterOptions={optionsFilters}
        hiddenFields={hiddenFields}
        filterName={FilterGroupsEnum.TOURNAMENT}
        paginationName={PaginationEnum.TOURNAMENT_PAGINATION}
        handleFiltersChange={
          handleFiltersChange ??
          (() => {
            void tournamentStore.getTournamentsList();
          })
        }
      />
    );
  },
);
