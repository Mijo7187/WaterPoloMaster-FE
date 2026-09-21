import { FC, useEffect, useMemo, useRef } from "react";

import { Form } from "antd";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { IUxFiltersProps, UxFilters } from "@components/UxComponents";
import {
  FilterGroupsEnum,
  FilterTypeEnum,
  PaginationEnum,
  paginationStore,
} from "@stores";
import { FILTER_DEBOUNCE_MS } from "@stores/filters/filters.constants";
import { filtersService } from "@stores/filters/filters.service";
import { filtersStore } from "@stores/filters/filters.store";

// import { useFiltersUrl } from "./useFiltersUrl";

interface IUrlFiltersProps extends Omit<IUxFiltersProps, "onValuesChange"> {
  filterName: FilterGroupsEnum;
  /** When set, page is reset to 1 on every filter change */
  paginationName?: PaginationEnum;
  handleFiltersChange: () => void;
}

export const UrlFilters: FC<IUrlFiltersProps> = observer(
  ({
    filterName,
    paginationName,
    handleFiltersChange,
    initialValues = {},
    filterOptions,
    form,
    ...rest
  }) => {
    // useFiltersUrl(filterName);

    // form key of a RANGE_DATE field → store keys it is split into
    const rangeKeysMap = useMemo(() => {
      const map = new Map<string, [string, string]>();
      filterOptions.forEach((item) => {
        if (item.type === FilterTypeEnum.RANGE_DATE) {
          map.set(String(item.formName), item.rangeKeys);
        }
      });
      return map;
    }, [filterOptions]);

    // always call the latest handler, while keeping one stable debounced fn
    const handleFiltersChangeRef = useRef(handleFiltersChange);
    useEffect(() => {
      handleFiltersChangeRef.current = handleFiltersChange;
    }, [handleFiltersChange]);

    const debouncedFetch = useMemo(
      () =>
        debounce(() => {
          handleFiltersChangeRef.current();
        }, FILTER_DEBOUNCE_MS),
      [],
    );

    // on unmount: drop a pending fetch and clear the group, so list filters
    // don't leak into other screens reading the same group (e.g. profile tabs)
    useEffect(() => {
      return () => {
        debouncedFetch.cancel();
        filtersStore.clearFilters(filterName);
      };
    }, [debouncedFetch, filterName]);

    const syncFilter = (key: string, value: unknown) => {
      filtersService
        .toStoreFilterEntries(key, value, rangeKeysMap.get(key))
        .forEach(([storeKey, storeValue]) => {
          filtersStore.updateFilter(filterName, storeKey, storeValue);
        });
    };

    // Mirror the registered form fields into the store, not just the changed
    // field. A field's onChange can imperatively reset other fields via
    // form.setFieldsValue. Those resets go through the form watcher but NOT
    // through onValuesChange, so reading the whole form state is the only way
    // to keep the store in sync.
    //
    // NB: getFieldsValue() (no `true`) intentionally excludes phantom values —
    // keys like start_date/end_date that live in the store but have no
    // Form.Item. With `true` those stale values would be written back over the
    // fresh dates derived from the range picker.
    const syncStoreFromForm = () => {
      const values = form.getFieldsValue() as Record<string, unknown>;
      Object.entries(values).forEach(([key, value]) => {
        syncFilter(key, value);
      });
    };

    // 1) seed the store from initialValues on mount
    useEffect(() => {
      Object.entries(initialValues as Record<string, unknown>).forEach(
        ([key, value]) => {
          syncFilter(key, value);
        },
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 2) watch every form value change (incl. programmatic setFieldsValue
    // resets triggered by another field's onChange) and mirror it to the store
    const watchedValues = Form.useWatch(
      (values: Record<string, unknown>) => values,
      form,
    );
    useEffect(() => {
      syncStoreFromForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedValues]);

    // 3) user interaction → sync SYNCHRONOUSLY (onValuesChange fires after antd
    // committed the new value) so the debounced fetch is guaranteed to read
    // fresh filters, reset page and trigger the (debounced) refetch
    const handleValuesChange = () => {
      syncStoreFromForm();
      if (paginationName) paginationStore.resetPage(paginationName);
      debouncedFetch();
    };

    return (
      <UxFilters
        {...rest}
        form={form}
        filterOptions={filterOptions}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
      />
    );
  },
);
