import to from "await-to-js";
import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { authStore } from "@modules/auth/auth.store";
import type { IGetUser } from "@modules/users/users.types";
import {
  IBaseStoreConfig,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
  modalStore,
  ModalTypeEnum,
  PaginationEnum,
  paginationStore,
} from "@stores";

import { TOURNAMENT_INITIAL_STATE } from "./tournament.constants";
import { tournamentService } from "./tournament.service";
import {
  FUsersNotInTournament,
  IGetTournament,
  IGetTournamentUsersList,
  IPostTournament,
  IPostTournamentUsersList,
} from "./tournament.types";

class TournamentStore implements IBaseStoreConfig<TournamentStore> {
  tournamentsList: IGetTournament[] = [];
  tournament: IGetTournament | IPostTournament = TOURNAMENT_INITIAL_STATE;
  tournamentUsersList: IGetTournamentUsersList[] = [];
  usersNotInTournamentList: IGetUser[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterTournament(): IGetTournament | IPostTournament {
    return this.tournament;
  }

  get getterTournamentsList(): IGetTournament[] {
    return this.tournamentsList;
  }

  get getterTournamentUsersList(): IGetTournamentUsersList[] {
    return this.tournamentUsersList;
  }

  get getterUsersNotInTournamentList(): IGetUser[] {
    return this.usersNotInTournamentList;
  }

  handleChange<K extends keyof TournamentStore>(
    key: K,
    value: TournamentStore[K],
  ) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  private normalizePayload<T extends IPostTournament>(payload: T): T {
    const toDate = (v: string) =>
      /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : dayjs(v).format("YYYY-MM-DD");
    return {
      ...payload,
      from_date: toDate(payload.from_date),
      to_date: toDate(payload.to_date),
    };
  }

  // #region General

  getTournamentsList = async () => {
    this.isLoading = true;
    const filters = {
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TOURNAMENT_PAGINATION,
      ),
      order_by: "from_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTournament>>(
      tournamentService.getTournamentsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("tournamentsList", res.items);
  };

  async getTournamentById(id: number) {
    this.isLoading = true;
    const [err, res] = await to<IGetTournament>(
      tournamentService.getTournamentById(id),
    );
    if (err) return Promise.reject(err);
    this.handleChange("tournament", res);
  }

  async createTournament(payload: IPostTournament) {
    this.isLoading = true;
    const normalized = this.normalizePayload({
      ...payload,
      company_id: authStore.getAuthUser.company_id,
    });
    const [err, _res] = await to<IPostResponse>(
      tournamentService.createTournament(normalized),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.TOURNAMENT_MODAL);
    void this.getTournamentsList();
  }

  async updateTournament(id: number, payload: IGetTournament) {
    this.isLoading = true;
    const normalized = this.normalizePayload(payload);
    const [err, _res] = await to<INoContentResponse>(
      tournamentService.updateTournament(id, normalized),
    );
    if (err) return Promise.reject(err);
    this.handleChange("tournament", normalized);
  }

  // #endregion General

  // #region User

  getTournamentsListByUserId = async (userId: number) => {
    this.isLoading = true;
    const filters = {
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TOURNAMENT_PAGINATION,
      ),
      user_id: userId,
      order_by: "from_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTournament>>(
      tournamentService.getTournamentsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("tournamentsList", res.items);
  };

  getTournamentsListByCompanyId = async (companyId: number) => {
    this.isLoading = true;
    const filters = {
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TOURNAMENT_PAGINATION,
      ),
      company_id: companyId,
      order_by: "from_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTournament>>(
      tournamentService.getTournamentsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("tournamentsList", res.items);
  };

  getTournamentsListByQuarterId = async (quarterId: number) => {
    this.isLoading = true;
    const filters = {
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.TOURNAMENT_PAGINATION,
      ),
      quarter_id: quarterId,
      order_by: "from_date",
    };
    const [err, res] = await to<IPaginatedResponse<IGetTournament>>(
      tournamentService.getTournamentsList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("tournamentsList", res.items);
  };

  getTournamentUsersList = async () => {
    this.isLoading = true;
    const filters = {
      tournament_id: (this.tournament as IGetTournament).id,
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.USER_PAGINATION,
      ),
    };
    const [err, res] = await to<IPaginatedResponse<IGetTournamentUsersList>>(
      tournamentService.getAllTournamentUsersList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("tournamentUsersList", res.items);
    paginationStore.set(PaginationEnum.USER_PAGINATION, res.pagination);
    this.isLoading = false;
  };

  getUsersNotInTournament = async (
    tournament_id: number,
    company_id: number,
  ) => {
    const filters: FUsersNotInTournament = { tournament_id, company_id };
    const [err, res] = await to<{ items: IGetUser[] }>(
      tournamentService.getUsersNotInTournament(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("usersNotInTournamentList", res.items);
  };

  addUserToTournament = async (payload: IPostTournamentUsersList) => {
    const [err] = await to<IPostResponse>(
      tournamentService.createTournamentUsersList(payload),
    );
    if (err) return Promise.reject(err);
    void this.getTournamentUsersList();
    void this.getUsersNotInTournament(
      payload.tournament_id,
      authStore.getAuthUser.company_id,
    );
  };

  removeUserFromTournament = async (id: number, tournamentId: number) => {
    const [err] = await to<INoContentResponse>(
      tournamentService.deleteTournamentUsersList(id),
    );
    if (err) return Promise.reject(err);
    void this.getTournamentUsersList();
    void this.getUsersNotInTournament(
      tournamentId,
      authStore.getAuthUser.company_id,
    );
  };

  // #endregion User
}

export const tournamentStore = new TournamentStore();
