import { axiosMain } from "@config/axiosConfig";
import { IApiGetResponse } from "@stores";

import { IGetWallet } from "./wallet.types";

const API_PATH = "wallet";

const getWalletById = (id: string): IApiGetResponse<IGetWallet> => {
  return axiosMain.get(`${API_PATH}/${id}`);
};

export const walletRepo = {
  getWalletById,
};
