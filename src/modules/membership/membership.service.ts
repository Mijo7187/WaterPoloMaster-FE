import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { membershipRepo } from "./membership.repo";
import type {
  FMembershipList,
  IGetMembership,
  IPostMembership,
} from "./membership.types";

class MembershipService {
  getMembershipsList = (
    filters?: FMembershipList,
  ): IApiPaginatedResponse<IGetMembership> => {
    return membershipRepo.getMembershipsList(filters);
  };

  getMembershipById = (id: number): IApiGetResponse<IGetMembership> => {
    return membershipRepo.getMembershipById(id);
  };

  createMembership = (payload: IPostMembership): IApiPostResponse => {
    return membershipRepo.createMembership(payload);
  };

  updateMembership = (
    id: number,
    payload: IPostMembership,
  ): IApiNoContentResponse => {
    return membershipRepo.updateMembership(id, payload);
  };
}

export const membershipService = new MembershipService();
