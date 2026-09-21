import dayjs from "dayjs";

import { FILTER_DATE_FORMAT } from "./filters.constants";
import { FilterValue } from "./filters.types";

class FiltersService {
  /** Normalizes a single form value into a value the store / API expects */
  toStoreFilterValue = (value: unknown): FilterValue => {
    if (value === null || value === "") return undefined;
    if (dayjs.isDayjs(value)) return value.format(FILTER_DATE_FORMAT);
    return value as FilterValue;
  };

  /**
   * Maps a form field to one or more store entries.
   * - dayjs → "YYYY-MM-DD"
   * - range ([start, end]) + rangeKeys → two entries (start / end)
   * - "" / null → undefined
   */
  toStoreFilterEntries = (
    key: string,
    value: unknown,
    rangeKeys?: [string, string],
  ): [string, FilterValue][] => {
    if (rangeKeys) {
      const [startKey, endKey] = rangeKeys;
      const [start, end]: unknown[] = Array.isArray(value)
        ? (value as unknown[])
        : [];
      return [
        [startKey, this.toStoreFilterValue(start)],
        [endKey, this.toStoreFilterValue(end)],
      ];
    }

    return [[key, this.toStoreFilterValue(value)]];
  };
}

export const filtersService = new FiltersService();
