import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxPageHeader,
} from "@components/UxComponents";
import { seasonStore } from "@modules/season/season.store";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { AddSeasonModal } from "./components/AddSeasonModal/AddSeasonModal";
import { SeasonFilters } from "./components/SeasonFilters/SeasonFilters";
import { SeasonTable } from "./components/SeasonTable/SeasonTable";

export const SeasonListPage: FC = observer(() => {
  const fetchSeasons = () => {
    void seasonStore.getSeasonsList();
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista sezona"
        rightContent={
          <UxButton
            testId="add-season"
            onClick={() => {
              modalStore.openModal(ModalTypeEnum.SEASON_MODAL);
            }}
          >
            + Dodaj sezonu
          </UxButton>
        }
      />

      <UxFilterTableWrapper
        filters={<SeasonFilters />}
        table={<SeasonTable />}
        pagination={
          <UrlPagination
            testId={PaginationEnum.SEASON_PAGINATION}
            paginationName={PaginationEnum.SEASON_PAGINATION}
            handlePaginationChange={fetchSeasons}
          />
        }
      />

      <AddSeasonModal />
    </div>
  );
});
