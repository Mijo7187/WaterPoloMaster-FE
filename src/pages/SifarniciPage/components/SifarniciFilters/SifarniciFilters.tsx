import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { FilterGroupsEnum, PaginationEnum } from "@stores";

import { SIFARNIK_FILTERS_CONFIG_DATA } from "../sifarniciPage.config";

interface ISifarniciFiltersProps {
  sifarnikType: SifarniciTypeEnum;
  fetchSifarnikList: () => void;
}

export const SifarniciFilters: FC<ISifarniciFiltersProps> = observer(
  ({ sifarnikType, fetchSifarnikList }) => {
    const [form] = useForm();

    const filtersConfig = SIFARNIK_FILTERS_CONFIG_DATA[sifarnikType];

    if (!filtersConfig) return null;

    return (
      <UrlFilters
        testId={`sifarnik-${sifarnikType}`}
        form={form}
        initialValues={filtersConfig.filtersInitialState}
        filterOptions={filtersConfig.components()}
        filterName={FilterGroupsEnum.SIFARNICI}
        paginationName={PaginationEnum.SIFARNICI_PAGINATION}
        handleFiltersChange={fetchSifarnikList}
      />
    );
  },
);
