import { action, makeObservable, observable } from "mobx";

import { FilterGroupMap, FilterGroupsEnum, FilterValue } from "./filters.types";

const initialFilterGroups = (): Record<FilterGroupsEnum, FilterGroupMap> => ({
  [FilterGroupsEnum.USERS]: new Map<string, FilterValue>(),
  [FilterGroupsEnum.COMPANY]: new Map<string, FilterValue>(),
  [FilterGroupsEnum.SIFARNICI]: new Map<string, FilterValue>(),
  [FilterGroupsEnum.INVENTORY]: new Map<string, FilterValue>(),
  [FilterGroupsEnum.PRODUCT]: new Map<string, FilterValue>(),
  [FilterGroupsEnum.ORDER]: new Map<string, FilterValue>(),
  [FilterGroupsEnum.DIMENSION]: new Map<string, FilterValue>(),
});

const initialFilterEntries = Object.entries(initialFilterGroups()) as [
  FilterGroupsEnum,
  FilterGroupMap,
][];

export class FiltersStore {
  filterValues: Map<FilterGroupsEnum, FilterGroupMap> = new Map<
    FilterGroupsEnum,
    FilterGroupMap
  >(initialFilterEntries);

  constructor() {
    makeObservable(this, {
      filterValues: observable,
      updateFilter: action,
      clearFilters: action,
      setFilterGroup: action,
    });
  }

  /** Get single filter field value */
  get getFilterValue() {
    return (filterGroup: FilterGroupsEnum, filterKey: string) => {
      return this.filterValues.get(filterGroup)?.get(filterKey);
    };
  }

  /** Get filter group map instance */
  get getFilterGroupMap() {
    return (filterGroup: FilterGroupsEnum) =>
      this.filterValues.get(filterGroup);
  }

  /** Get object value of filter group */
  get getFilterGroupValues() {
    return (filterGroup: FilterGroupsEnum) => {
      const group = this.getFilterGroupMap(filterGroup);
      if (!group) return {};
      return Object.fromEntries(group.entries());
    };
  }

  clearFilters = (filterGroup: FilterGroupsEnum) => {
    this.filterValues.get(filterGroup)?.clear();
  };

  resetStore = () => {
    this.filterValues = new Map<FilterGroupsEnum, FilterGroupMap>(
      initialFilterEntries,
    );
  };

  updateFilter = (
    filterGroup: FilterGroupsEnum,
    filterKey: string,
    filterValue: FilterValue,
  ) => {
    const filterGroupMap = this.filterValues.get(filterGroup);

    if (filterGroupMap) {
      filterGroupMap.set(filterKey, filterValue ?? undefined);
    } else {
      console.error(
        "Cannot update filters for selected group map. This is probably a typo, or a missing filterGroup",
      );
    }
  };

  setFilterGroup = (
    filterGroup: FilterGroupsEnum,
    filterValues: Record<string, unknown>,
  ) => {
    const filterGroupMap = this.filterValues.get(filterGroup);

    if (filterGroupMap) {
      Object.entries(filterValues).forEach(([key, value]) => {
        filterGroupMap.set(key, value ?? undefined);
      });
    } else {
      console.error(
        "Cannot update filters for selected group map. This is probably a typo, or a missing filterGroup",
      );
    }
  };
}

export const filtersStore = new FiltersStore();
