import { IApiGetResponse } from "@stores";

import { walletRepo } from "./wallet.repo";
import { IGetWallet } from "./wallet.types";

class WalletService {
  getWalletById = (id: string): IApiGetResponse<IGetWallet> => {
    return walletRepo.getWalletById(id);
  };

  // getWalletList = (): TApiResponseList<IGetWallet> => {
  //   return walletRepo.getWalletList();
  // };
}

export const walletService = new WalletService();
