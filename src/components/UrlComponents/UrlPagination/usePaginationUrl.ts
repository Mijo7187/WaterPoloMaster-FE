import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { omit } from "lodash";
import { reaction } from "mobx";
import {
  IPostPagination,
  PAGINATION_INITIAL_STATE,
  PaginationEnum,
  paginationStore,
} from "@stores/index";

export const usePaginationUrl = (name: PaginationEnum) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL → Store (on mount / browser back-forward)
  useEffect(() => {
    const raw = searchParams.get(name);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as IPostPagination;
        paginationStore.set(name, parsed);
      } catch {
        // invalid JSON in URL — ignore
      }
    } else {
      paginationStore.set(name, PAGINATION_INITIAL_STATE);
    }
  }, [searchParams.get(name)]);

  // Store → URL (when store changes from anywhere)
  useEffect(() => {
    const dispose = reaction(
      () => paginationStore.get(name),
      (value) => {
        setSearchParams(
          (prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (value) {
              const urlValue = omit(value, "total");
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
