import {
  ContractStatusEnum,
  ContractTypeEnum,
  FContract,
  IContractInstallmentItem,
  IPostContract,
} from "./contract.types";

export const CONTRACT_ENDPOINTS = {
  CONTRACT: "/contract/",
};

export const CONTRACT_INSTALLMENT_ITEM_INITIAL_STATE: IContractInstallmentItem =
  {
    period_start: "",
    period_end: "",
    due_date: "",
    amount: null,
  };

export const CONTRACT_INITIAL_STATE: IPostContract = {
  company_id: null,
  user_id: null,
  contract_type: ContractTypeEnum.MEMBERSHIP,
  membership_id: null,
  start_date: "",
  end_date: null,
  amount: null,
  installments_list: [CONTRACT_INSTALLMENT_ITEM_INITIAL_STATE],
  status: ContractStatusEnum.DRAFT,
  signed_at: null,
};

export const CONTRACT_FILTERS_INITIAL_STATE: FContract = {
  season_id: null,
  status: null,
  contract_type: null,
};

export const CONTRACT_TYPE_LABELS: Record<ContractTypeEnum, string> = {
  [ContractTypeEnum.MEMBERSHIP]: "Članarina",
  [ContractTypeEnum.STAFF]: "Zaposleni",
};

export const CONTRACT_TYPE_OPTIONS = Object.values(ContractTypeEnum).map(
  (value) => ({ label: CONTRACT_TYPE_LABELS[value], value }),
);

export const CONTRACT_STATUS_LABELS: Record<ContractStatusEnum, string> = {
  [ContractStatusEnum.DRAFT]: "Nacrt",
  [ContractStatusEnum.ACTIVE]: "Aktivan",
  [ContractStatusEnum.ENDED]: "Završen",
  [ContractStatusEnum.CANCELLED]: "Otkazan",
};

export const CONTRACT_STATUS_OPTIONS = Object.values(ContractStatusEnum).map(
  (value) => ({ label: CONTRACT_STATUS_LABELS[value], value }),
);

export const CONTRACT_STATUS_COLORS: Record<ContractStatusEnum, string> = {
  [ContractStatusEnum.DRAFT]: "default",
  [ContractStatusEnum.ACTIVE]: "green",
  [ContractStatusEnum.ENDED]: "blue",
  [ContractStatusEnum.CANCELLED]: "red",
};
