export enum PaymentDirectionEnum {
  C_C = "c_c",
  U_C = "u_c",
  C_U = "c_u",
}

export interface IPostPaymentType {
  name: string;
  payment_direction: PaymentDirectionEnum;
  active: boolean;
}

export interface IGetPaymentType extends IPostPaymentType {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface FPaymentType {
  name__ilike?: string;
  active?: boolean | null;
}
