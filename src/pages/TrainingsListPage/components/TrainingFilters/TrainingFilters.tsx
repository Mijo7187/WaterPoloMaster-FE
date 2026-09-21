import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import { authStore } from "@modules/auth/auth.store";
import { TRAINING_STATUS_OPTIONS } from "@modules/training/training.constants";
import { trainingStore } from "@modules/training/training.store";
import {
  FilterConfig,
  FilterGroupsEnum,
  FilterTypeEnum,
  IFiltersComponentProps,
  PaginationEnum,
} from "@stores";
import { FILTER_SEASON } from "@stores/filters/filtersOptions.constants";

export const TrainingFilters: FC<IFiltersComponentProps> = observer(
  ({ handleFiltersChange, hiddenFields }) => {
    const [form] = useForm();

    const optionsFilters: FilterConfig[] = [
      {
        ...FILTER_SEASON,
        storeKey: "training_filter_season",
        testId: "training-season",
        filtersForGet: { company_id: authStore.getAuthUser.company_id },
        colSpan: 6,
      },
      {
        type: FilterTypeEnum.SELECT,
        formName: "status",
        label: "Status",
        placeholder: "Svi statusi",
        options: TRAINING_STATUS_OPTIONS,
        testId: "training-status",
        colSpan: 6,
      },
      {
        type: FilterTypeEnum.DATE,
        formName: "training_date__ilike",
        label: "Datum",
        placeholder: "Izaberi datum",
        testId: "training-date",
        colSpan: 6,
      },
    ];

    return (
      <UrlFilters
        testId="training"
        form={form}
        filterOptions={optionsFilters}
        hiddenFields={hiddenFields}
        filterName={FilterGroupsEnum.TRAINING}
        paginationName={PaginationEnum.TRAINING_PAGINATION}
        handleFiltersChange={
          handleFiltersChange ??
          (() => {
            void trainingStore.getTrainingsList();
          })
        }
      />
    );
  },
);
