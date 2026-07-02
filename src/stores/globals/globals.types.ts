import {
  IUxFormDatePickerProps,
  IUxFormInputNumberProps,
  IUxFormInputProps,
  IUxFormScrollSelect,
  IUxFormSelectProps,
  IUxFormSwitchProps,
  IUxFormTextAreaProps,
} from "@components/UxFormComponents";
import { IGetPagination, TypeOfFormEnum } from "@stores";

export interface IBaseStoreConfig<Store> {
  handleChange: <K extends keyof Store>(key: K, value: Store[K]) => void;
}

export type IApiNoContentResponse = Promise<INoContentResponse>;
export type INoContentResponse = true;

export type IApiPostResponse = Promise<IPostResponse>;
export type IPostResponse = number;

export type IApiGetResponse<T> = Promise<IGetApiResponse<T>>;
export type IGetApiResponse<T> = T;

export type IApiPaginatedResponse<T> = Promise<IPaginatedResponse<T>>;
export interface IPaginatedResponse<T> {
  items: T[];
  pagination: IGetPagination;
}

interface ICrudBaseProps {
  typeOfForm: TypeOfFormEnum;
  hideInput?: boolean;
  colWidth?: number;
}

interface CInput extends IUxFormInputProps, ICrudBaseProps {}
interface CSelect extends IUxFormSelectProps, ICrudBaseProps {}
interface CScrollSelect
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extends IUxFormScrollSelect<any, any>, ICrudBaseProps {}
export interface CDatePicker extends IUxFormDatePickerProps, ICrudBaseProps {}
interface CInputNumber extends IUxFormInputNumberProps, ICrudBaseProps {}
interface CSwitch extends IUxFormSwitchProps, ICrudBaseProps {}
interface CTextArea extends IUxFormTextAreaProps, ICrudBaseProps {}

export type ICrudOptionsConfig =
  | CInput
  | CSelect
  | CScrollSelect
  | CDatePicker
  | CInputNumber
  | CSwitch
  | CTextArea;
