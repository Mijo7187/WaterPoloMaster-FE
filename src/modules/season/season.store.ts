import to from "await-to-js";
import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { authStore } from "@modules/auth/auth.store";
import {
  FilterGroupsEnum,
  IBaseStoreConfig,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
  modalStore,
  ModalTypeEnum,
  PaginationEnum,
  paginationStore,
} from "@stores";
import { filtersStore } from "@stores/filters/filters.store";

import { SEASON_INITIAL_STATE } from "./season.constants";
import { seasonService } from "./season.service";
import { IGetSeason, IPostSeason } from "./season.types";

class SeasonStore implements IBaseStoreConfig<SeasonStore> {
  seasonsList: IGetSeason[] = [];
  season: IGetSeason | IPostSeason = SEASON_INITIAL_STATE;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterSeason(): IGetSeason | IPostSeason {
    return this.season;
  }

  get getterSeasonsList(): IGetSeason[] {
    return this.seasonsList;
  }

  handleChange<K extends keyof SeasonStore>(key: K, value: SeasonStore[K]) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  private normalizePayload<T extends IPostSeason>(payload: T): T {
    const toDate = (v: string) =>
      /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : dayjs(v).format("YYYY-MM-DD");
    return {
      ...payload,
      start_date: toDate(payload.start_date),
      end_date: toDate(payload.end_date),
    };
  }

  getSeasonsList = async () => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.SEASON),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.SEASON_PAGINATION,
      ),
      order_by: "start_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetSeason>>(
      seasonService.getSeasonsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("seasonsList", res.items);
    paginationStore.set(PaginationEnum.SEASON_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  async getSeasonById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetSeason>(seasonService.getSeasonById(id));
    if (err) return Promise.reject(err);
    this.handleChange("season", res);
  }

  async createSeason(payload: IPostSeason) {
    this.isLoading = true;
    const normalized = this.normalizePayload({
      ...payload,
      company_id: authStore.getAuthUser.company_id,
    });
    const [err, _res] = await to<IPostResponse>(
      seasonService.createSeason(normalized),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.SEASON_MODAL);
    void this.getSeasonsList();
  }

  async updateSeason(id: number, payload: IGetSeason) {
    this.isLoading = true;
    const normalized = this.normalizePayload(payload);
    const [err, _res] = await to<INoContentResponse>(
      seasonService.updateSeason(id, normalized),
    );
    if (err) return Promise.reject(err);
    this.handleChange("season", normalized);
  }
}

export const seasonStore = new SeasonStore();
