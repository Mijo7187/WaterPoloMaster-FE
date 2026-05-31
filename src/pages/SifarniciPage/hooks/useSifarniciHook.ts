import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { sifarniciStore } from "@modules/sifarnici/sifarnici.store";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { FilterGroupsEnum, modalStore, ModalTypeEnum } from "@stores";
import { filtersStore } from "@stores/filters/filters.store";

export const useSifarniciHook = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSifarnikType = () => {
    return (searchParams.get("sifarnik_type") ??
      SifarniciTypeEnum.CITY) as SifarniciTypeEnum;
  };

  const [sifarnikType, setSifarnikType] = useState<SifarniciTypeEnum>(
    initialSifarnikType(),
  );

  const sifarnik_id = searchParams.get("sifarnik_id");

  const fetchSifarnikList = (sifarnikType: SifarniciTypeEnum) => {
    void sifarniciStore.fetchSifarnikListTable(sifarnikType);
  };

  const onSifarnikTypeChange = (newType: SifarniciTypeEnum) => {
    filtersStore.clearFilters(FilterGroupsEnum.SIFARNICI);

    setSifarnikType(newType);
    fetchSifarnikList(newType);
    setSearchParams({ sifarnik_type: newType });
  };

  useEffect(() => {
    fetchSifarnikList(sifarnikType);
    if (sifarnik_id) {
      modalStore.openModal(ModalTypeEnum.SIFARNIK_MODAL);
    }
  }, []);

  return {
    onSifarnikTypeChange,
    sifarnikType,
    fetchSifarnikList,
    setSearchParams,
  };
};
