import { axiosMain } from "@config/axiosConfig";
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from "@stores";

import { PAYMENT_ENDPOINTS } from "./payment.constants";
import { IGetPayment, IPostPayment, IPutPayment } from "./payment.types";

const getPaymentList = (filters?: object): IApiPaginatedResponse<IGetPayment> =>
  axiosMain.get(PAYMENT_ENDPOINTS.PAYMENT, { params: filters });

const getPaymentById = (id: string): IApiGetResponse<IGetPayment> =>
  axiosMain.get(`${PAYMENT_ENDPOINTS.PAYMENT}${id}`);

const createPayment = (payload: IPostPayment): IApiPostResponse =>
  axiosMain.post(PAYMENT_ENDPOINTS.PAYMENT, payload);

const updatePayment = (
  id: string,
  payload: IPutPayment,
): IApiNoContentResponse =>
  axiosMain.put(`${PAYMENT_ENDPOINTS.PAYMENT}${id}`, payload);

export const paymentRepo = {
  getPaymentList,
  getPaymentById,
  createPayment,
  updatePayment,
};
