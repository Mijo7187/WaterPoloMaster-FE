import { axiosMain } from "@config/axiosConfig";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { MEMBERSHIP_ENDPOINTS } from "./membership.constants";
import {
  FMembershipList,
  IGetMembership,
  IPostMembership,
} from "./membership.types";

const getMembershipsList = (
  filters?: FMembershipList,
): IApiPaginatedResponse<IGetMembership> => {
  return axiosMain.get(MEMBERSHIP_ENDPOINTS.MEMBERSHIP, { params: filters });
};

const getMembershipById = (id: number): IApiGetResponse<IGetMembership> => {
  return axiosMain.get(`${MEMBERSHIP_ENDPOINTS.MEMBERSHIP}${id}`);
};

const createMembership = (payload: IPostMembership): IApiPostResponse => {
  return axiosMain.post(MEMBERSHIP_ENDPOINTS.MEMBERSHIP, payload);
};

const updateMembership = (
  id: number,
  payload: IPostMembership,
): IApiNoContentResponse => {
  return axiosMain.put(`${MEMBERSHIP_ENDPOINTS.MEMBERSHIP}${id}`, payload);
};

export const membershipRepo = {
  getMembershipsList,
  getMembershipById,
  createMembership,
  updateMembership,
};
