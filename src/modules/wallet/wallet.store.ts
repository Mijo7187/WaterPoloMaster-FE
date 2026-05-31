import to from "await-to-js";
import { makeAutoObservable } from "mobx";
import { IGetApiResponse } from "@stores";

import { walletService } from "./wallet.service";
import { IGetWallet } from "./wallet.types";

class WalletStore {
  wallet: null | IGetWallet = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setWallet = (wallet: IGetWallet) => {
    this.wallet = wallet;
  };

  getWalletById = async (id: string) => {
    this.setIsLoading(true);
    const [err, res] = await to<IGetApiResponse<IGetWallet>>(
      walletService.getWalletById(id),
    );
    this.setIsLoading(false);
    if (err) return Promise.reject(err);
    this.setWallet(res);
    return Promise.resolve(res);
  };
}

export const walletStore = new WalletStore();
