enum WalletTypeEnum {
  COMPANY = "company",
  USER = "user",
}

export interface IGetWallet {
  id: string;
  owner_id: string;
  owner_type: WalletTypeEnum;
  created_at: string;
  name: string;
}
