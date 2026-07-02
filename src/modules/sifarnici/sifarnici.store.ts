import to from "await-to-js";
import { makeAutoObservable } from "mobx";
import {
  FilterGroupsEnum,
  FiltersWithPagination,
  IApiPaginatedResponse,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
  PAGINATION_INITIAL_STATE,
  PaginationEnum,
  paginationStore,
} from "@stores";
import { filtersStore } from "@stores/filters/filters.store";
import { arrayToObject } from "@utils/arrayToObject";

import { SIFARNICI_MAP_CONFIG } from "./sifarnici.constants";
import { sifarniciService } from "./sifarnici.service";
import {
  FSifarnici,
  IGetSifarnikType,
  IPostSifarnikType,
  ISifarnikSelectOptions,
  SifarniciGroupMap,
  SifarniciTypeEnum,
} from "./sifarnici.types";

class SifarniciStore {
  sifarniciSelectValues: SifarniciGroupMap = new Map();

  sifarnik: IPostSifarnikType | IGetSifarnikType | null = null;
  sifarniciListTable: IGetSifarnikType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  handleChange<K extends keyof SifarniciStore>(
    key: K,
    value: SifarniciStore[K],
  ) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // #region SELECT
  /** Get single sifarnik field value */
  get getSifarnikByKey() {
    return (sifarnikKey: string) => {
      return this.sifarniciSelectValues.get(sifarnikKey);
    };
  }
  /** Get single sifarnik items */
  get getSifarnikItems() {
    return (sifarnikKey: string) => {
      return this.getSifarnikByKey(sifarnikKey)?.items;
    };
  }
  /** Get single sifarnik pagination */
  get getSifarnikPagination() {
    return (sifarnikKey: string) => {
      return this.getSifarnikByKey(sifarnikKey)?.pagination;
    };
  }

  get getArrayToObjSifarnik() {
    return (sifarnikKey: string) => {
      const existingItems = this.getSifarnikItems(sifarnikKey);
      if (!existingItems) {
        return null;
      }
      const arrayToObj = arrayToObject(existingItems, "value");
      return arrayToObj;
    };
  }

  setSifarnikOptions<T>(
    storeKey: string,
    payload: IPaginatedResponse<T>,
    sifarnikName: SifarniciTypeEnum,
  ) {
    // 2. Definišemo accessor (pretpostavka je da koristiš 'id' ili prosleđeni ključ)
    const existingItemsMap = this.getArrayToObjSifarnik(storeKey);
    const sifarniciConfig = SIFARNICI_MAP_CONFIG[sifarnikName];
    const valueKey = sifarniciConfig.valueAccessor ?? "id";

    const newItems = payload.items
      .map((item) => {
        const itemKey = (item as Record<string, unknown>)[valueKey] as string;

        if (
          existingItemsMap &&
          Object.prototype.hasOwnProperty.call(existingItemsMap, itemKey)
        ) {
          return;
        }

        return sifarniciService.makeSifarnikOption(sifarnikName, item);
      })
      .filter(Boolean) as ISifarnikSelectOptions<T>[];

    // 5. Spajamo stare i nove unikatne stavke
    let updatedItems = newItems;
    if (existingItemsMap) {
      const existingItems = this.getSifarnikItems(
        storeKey,
      ) as ISifarnikSelectOptions<T>[];
      updatedItems = [...existingItems, ...updatedItems];
    }

    // 6. Update-ovanje stanja (stora)
    this.sifarniciSelectValues.set(storeKey, {
      pagination: {
        page: payload.pagination.page,
        size: payload.pagination.size,
        total: payload.pagination.total,
        pages: payload.pagination.pages,
      },
      items: updatedItems,
    });
  }

  setDefaultOptions = <T = unknown>(
    storeKey: string,
    defaultObj: T,
    sifarnikName: SifarniciTypeEnum,
  ): T => {
    // Setuj default kao jedinu opciju
    const newDefaultValue: ISifarnikSelectOptions<T> =
      sifarniciService.makeSifarnikOption(sifarnikName, defaultObj);
    console.log(storeKey, "storeKey");
    console.log(defaultObj, "defaultObj");
    console.log(sifarnikName, "sifarnikName");

    this.sifarniciSelectValues.set(storeKey, {
      pagination: PAGINATION_INITIAL_STATE,
      items: [newDefaultValue],
    });
    return defaultObj;
  };

  resetSifarnikByKey(storeKey: string) {
    this.sifarniciSelectValues.delete(storeKey);
  }

  resetAll() {
    this.sifarniciSelectValues.clear();
  }

  fetchSifarnikOptions = async <T, F = FSifarnici>(
    storeKey: string,
    sifarnikName: SifarniciTypeEnum,
    filters: FiltersWithPagination<F>,
    routeParams?: string,
  ): IApiPaginatedResponse<T> => {
    const [err, res] = await to<IPaginatedResponse<T>>(
      sifarniciService.getSifarniciOptions<T, F>(
        sifarnikName,
        filters,
        routeParams,
      ),
    );
    if (err) return Promise.reject(err);
    this.setSifarnikOptions(storeKey, res, sifarnikName);
    return res;
  };
  // #endregion SELECT
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // #region CRUD
  fetchSifarnikListTable = async (sifarnikType: SifarniciTypeEnum) => {
    const filters = {
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.SIFARNICI_PAGINATION,
      ),
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.SIFARNICI),
    };
    const [err, res] = await to<IPaginatedResponse<IGetSifarnikType>>(
      sifarniciService.fetchSifarnikListTable(sifarnikType, filters),
    );
    if (err) return;
    this.sifarniciListTable = res.items;
    paginationStore.set(PaginationEnum.SIFARNICI_PAGINATION, res.pagination);
  };

  fetchSifarnikById = async (sifarnikType: SifarniciTypeEnum, id: number) => {
    const [err, res] = await to<IGetSifarnikType>(
      sifarniciService.fetchSifarnikById(sifarnikType, id),
    );
    if (err) return;
    this.handleChange("sifarnik", res);
  };

  postSifarnik = async (
    sifarnikType: SifarniciTypeEnum,
    data: IPostSifarnikType,
  ) => {
    const [err, res] = await to<IPostResponse>(
      sifarniciService.postSifarnik(sifarnikType, data),
    );
    if (err) return;
    return res;
  };

  updateSifarnik = async (
    sifarnikType: SifarniciTypeEnum,
    id: number,
    data: IPostSifarnikType,
  ) => {
    const [err, res] = await to<INoContentResponse>(
      sifarniciService.updateSifarnik(sifarnikType, id, data),
    );
    if (err) return;
    return res;
  };
  // #endregion CRUD
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
export const sifarniciStore = new SifarniciStore();
