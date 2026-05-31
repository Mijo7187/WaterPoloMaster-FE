import { useEffect, useMemo, useState } from "react";

import { ColProps } from "antd";
import Form, { Rule } from "antd/es/form";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { DefaultOptionType } from "antd/es/select";
import { observer } from "mobx-react-lite";
import {
  SIFARNICI_MAP_CONFIG,
  SIFARNIK_INITIAL_VALUE,
} from "@modules/sifarnici/sifarnici.constants";
import { sifarniciStore } from "@modules/sifarnici/sifarnici.store";
import {
  ISifarnikSelectOptions,
  SifarniciTypeEnum,
  SifarniciValueConfig,
} from "@modules/sifarnici/sifarnici.types";
import {
  FiltersWithPagination,
  IGetPagination,
  PAGINATION_INITIAL_STATE,
} from "@stores";

import { IUxSelectProps, UxSelect } from "../UxSelect/UxSelect";

// #region SCROLL
export interface IUxScrollSelectProps<_T, F> extends IUxSelectProps {
  storeKey: string;
  sifarnikName: SifarniciTypeEnum;
  routeParams?: string;
  filtersForGet?: F;
  readOnly?: boolean;
}

export const UxScrollSelect = observer(
  <T, F = unknown>({
    storeKey,
    // readOnly,
    filtersForGet,
    sifarnikName,
    routeParams,
    ...rest
  }: IUxScrollSelectProps<T, F>) => {
    const [loading, setLoading] = useState(false);

    // Ako imamo defaultObj (sa edita), ubaci ga kao prvu opciju.
    const sifarnikConfig = useMemo((): SifarniciValueConfig<T> => {
      const sifarnikValue = sifarniciStore.getSifarnikByKey(storeKey);
      // ako nema sifarnika u storu i ako mu je length 0
      if (!sifarnikValue?.items.length)
        return SIFARNIK_INITIAL_VALUE as SifarniciValueConfig<T>;

      return {
        items: sifarnikValue.items as ISifarnikSelectOptions<T>[],
        pagination: sifarnikValue.pagination,
      };
    }, [sifarniciStore.getSifarnikByKey(storeKey)]);

    // func za get liste sifarnika
    const fetchList = async (filters: FiltersWithPagination<F>) => {
      setLoading(true);
      await sifarniciStore.fetchSifarnikOptions<T, F>(
        storeKey,
        sifarnikName,
        filters,
        routeParams,
      );
      setLoading(false);
    };

    const loadMoreOptions = () => {
      const filters = {
        page: sifarnikConfig.pagination.page,
        size: sifarnikConfig.pagination.size,
        ...filtersForGet,
      };
      void fetchList(filters as FiltersWithPagination<F>);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLElement;
      const heightDifference = clientHeight - (scrollHeight - scrollTop);

      if (Math.abs(heightDifference) < 10) {
        if (
          (sifarnikConfig.pagination as IGetPagination).total ===
          sifarnikConfig.items.length
        )
          return;
        loadMoreOptions();
      }
    };

    const handleLoadDataOnFocus = () => {
      loadMoreOptions();
    };

    const handleSearch = (_value: string) => {
      // setSearch(value);

      const filters = {
        page: PAGINATION_INITIAL_STATE.page,
        size: PAGINATION_INITIAL_STATE.size,
        ...filtersForGet,
      };
      void fetchList(filters as FiltersWithPagination<F>);
    };

    const onClear = () => {
      sifarniciStore.resetSifarnikByKey(storeKey);
      rest.onClear?.();
    };

    return (
      <UxSelect
        {...rest}
        showSearch={
          rest.showSearch !== false ? { onSearch: handleSearch } : false
        }
        onPopupScroll={handleScroll}
        loading={loading}
        notFoundContent={
          !loading && rest.notFoundContent
            ? rest.notFoundContent
            : "No options found"
        }
        // filterOption={false}
        // className={readOnly ? styles.readOnly : ''}
        onClear={onClear}
        allowClear={rest.allowClear}
        onFocus={handleLoadDataOnFocus}
        options={sifarnikConfig.items as DefaultOptionType[]}
      />
    );
  },
);

export interface IUxFormScrollSelect<T, F> extends IUxScrollSelectProps<T, F> {
  formName: string | (string | number)[] | string[];
  objName: string; // npr. "inventory"   => čuva ceo objekat (option.item)
  label?: string;
  rules?: Rule[];
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  colon?: boolean;
}
// #endregion SCROLL
// #region FORM

export const UxFormScrollSelect = observer(
  <T, F extends object>({
    formName,
    storeKey, // "inventoryId"
    label,
    rules,
    labelCol,
    wrapperCol,
    colon,
    objName, // "inventory"
    sifarnikName,
    ...rest
  }: IUxFormScrollSelect<T, F>) => {
    const form = useFormInstance();

    const objItemWatch = Form.useWatch(objName, form) as T;

    useEffect(() => {
      const objItem = form.getFieldValue(objName) as T;
      const formNameValue = form.getFieldValue(formName) as unknown;
      if (!formNameValue && objItem) {
        const sifarnikConfig = SIFARNICI_MAP_CONFIG[sifarnikName];
        const valueKey = sifarnikConfig.valueAccessor ?? "id";
        const defaultValue = (objItem as Record<string, unknown>)[valueKey];
        form.setFieldValue(formName, defaultValue);
        sifarniciStore.setDefaultOptions(storeKey, objItem, sifarnikName);
      }
    }, [objItemWatch]);

    const handleClear = () => {
      // da obrisemo iz form-e
      form.setFieldValue(objName, undefined);
    };

    return (
      <Form.Item
        name={formName}
        label={label}
        rules={rules}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        colon={colon}
        // className={styles.formInput}
      >
        <UxScrollSelect
          {...rest}
          sifarnikName={sifarnikName}
          storeKey={storeKey}
          onClear={handleClear}
        />
      </Form.Item>
    );
  },
);

// #endregion FORM SCROLL
