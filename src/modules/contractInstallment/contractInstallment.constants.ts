import { IPostContractInstallment } from "./contractInstallment.types";

export const CONTRACT_INSTALLMENT_ENDPOINTS = {
  CONTRACT_INSTALLMENT: "/contract-installment/",
};

export const CONTRACT_INSTALLMENT_INITIAL_STATE: IPostContractInstallment = {
  contract_id: null,
  period_start: "",
  period_end: "",
  due_date: "",
  amount: null,
  waived: false,
};
