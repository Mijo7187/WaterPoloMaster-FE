import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { isEmpty, isNil, omitBy } from "lodash";
import { reaction } from "mobx";
import { FilterGroupsEnum } from "@stores";
import { filtersStore } from "@stores/filters/filters.store";

export const useFiltersUrl = (name: FilterGroupsEnum) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(name);

  // URL → Store (on mount / browser back-forward)
  useEffect(() => {
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        filtersStore.setFilterGroup(name, parsed);
      } catch {
        // invalid JSON in URL — ignore
      }
    } else {
      filtersStore.clearFilters(name);
    }
  }, [name, raw]);

  // Store → URL (when store changes from anywhere)
  useEffect(() => {
    const dispose = reaction(
      () => filtersStore.getFilterGroupValues(name),
      (value) => {
        const urlValue = omitBy(value, isNil);
        setSearchParams(
          (prev) => {
            if (isEmpty(urlValue)) {
              prev.delete(name);
            } else {
              prev.set(name, JSON.stringify(urlValue));
            }
            return prev;
          },
          { replace: true },
        );
      },
    );
    return () => {
      dispose();
    };
    // setSearchParams is intentionally left out — re-subscribing the reaction
    // on every URL change is unnecessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // Cleanup store on unmount (not URL — navigation already changed it)
  useEffect(() => {
    return () => {
      filtersStore.clearFilters(name);
    };
  }, [name]);
};
