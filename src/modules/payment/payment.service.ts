import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { paymentRepo } from "./payment.repo";
import type {
  IGetPayment,
  IPostPayment,
  IPutPayment,
} from "./payment.types";

class PaymentService {
  getPaymentList = (filters?: object): IApiPaginatedResponse<IGetPayment> =>
    paymentRepo.getPaymentList(filters);

  getPaymentById = (id: string): IApiGetResponse<IGetPayment> =>
    paymentRepo.getPaymentById(id);

  createPayment = (payload: IPostPayment): IApiPostResponse =>
    paymentRepo.createPayment(payload);

  updatePayment = (id: string, payload: IPutPayment): IApiNoContentResponse =>
    paymentRepo.updatePayment(id, payload);
}

export const paymentService = new PaymentService();
