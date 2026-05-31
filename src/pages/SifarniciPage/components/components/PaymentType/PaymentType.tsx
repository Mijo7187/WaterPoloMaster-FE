import { ColumnsType } from "antd/es/table";
import {
  IGetPaymentType,
  PaymentDirectionEnum,
} from "@modules/sifarnici/paymentType/paymentType.types";
import { ICrudOptionsConfig, TypeOfFormEnum } from "@stores";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

const PAYMENT_DIRECTION_OPTIONS = [
  { label: "C → C", value: PaymentDirectionEnum.C_C },
  { label: "U → C", value: PaymentDirectionEnum.U_C },
  { label: "C → U", value: PaymentDirectionEnum.C_U },
];

// #region Table
export const PAYMENT_TYPE_TABLE_COLUMNS = (): ColumnsType<IGetPaymentType> => [
  {
    title: "Naziv",
    width: 250,
    minWidth: 250,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Smer plaćanja",
    width: 200,
    minWidth: 200,
    dataIndex: "payment_direction",
    key: "payment_direction",
    render: (value: PaymentDirectionEnum) =>
      PAYMENT_DIRECTION_OPTIONS.find((o) => o.value === value)?.label ?? value,
  },
  {
    title: "Aktivan",
    width: 100,
    minWidth: 100,
    dataIndex: "active",
    key: "active",
    render: (value: boolean) => (value ? "Da" : "Ne"),
  },
];
// #endregion Table

// #region Form
export const PAYMENT_TYPE_FORM_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "payment-type-name",
      formName: "name",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
    {
      typeOfForm: TypeOfFormEnum.SELECT,
      testId: "payment-type-direction",
      formName: "payment_direction",
      label: "Smer plaćanja",
      options: PAYMENT_DIRECTION_OPTIONS,
      rules: [REQUIRED_FIELD_RULE(true)],
    },
  ];
};
// #endregion Form

// #region Filters
export const PAYMENT_TYPE_FILTER_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "payment-type-name-filter",
      formName: "name__ilike",
      label: "Naziv",
    },
    {
      typeOfForm: TypeOfFormEnum.SELECT,
      testId: "payment-type-active-filter",
      formName: "active",
      label: "Aktivan",
      options: [
        { label: "Da", value: true },
        { label: "Ne", value: false },
      ],
      allowClear: true,
    },
  ];
};
// #endregion Filters
