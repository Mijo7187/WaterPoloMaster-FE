import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { reaction } from "mobx";
import {
  IPostPagination,
  PAGINATION_INITIAL_STATE,
  PaginationEnum,
  paginationStore,
} from "@stores";

export const usePaginationUrl = (name: PaginationEnum) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawParam = searchParams.get(name);

  // URL → Store (on mount / browser back-forward)
  useEffect(() => {
    if (rawParam) {
      try {
        const parsed = JSON.parse(rawParam) as IPostPagination;
        paginationStore.set(name, parsed);
      } catch {
        // invalid JSON in URL — ignore
      }
    } else {
      paginationStore.set(name, {
        page: PAGINATION_INITIAL_STATE.page,
        size: PAGINATION_INITIAL_STATE.size,
      });
    }
  }, [rawParam, name]);

  // Store → URL (when store changes from anywhere)
  useEffect(() => {
    const dispose = reaction(
      () => paginationStore.get(name),
      (value) => {
        setSearchParams(
          (prev) => {
            if (value) {
              const { total: _total, pages: _pages, ...urlValue } = value;
              prev.set(name, JSON.stringify(urlValue));
            } else {
              prev.delete(name);
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
  }, []);

  // Cleanup store on unmount (not URL — navigation already changed it)
  useEffect(() => {
    return () => {
      paginationStore.remove(name);
    };
  }, []);
};
