import { ColumnsType } from "antd/es/table";
import { IGetTrainingType } from "@modules/sifarnici/trainingType/trainingType.types";
import { ICrudOptionsConfig, TypeOfFormEnum } from "@stores";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

// #region Table
export const TRAINING_TYPE_TABLE_COLUMNS = (): ColumnsType<IGetTrainingType> => [
  {
    title: "Naziv",
    width: 250,
    minWidth: 250,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Aktivan",
    width: 100,
    minWidth: 100,
    dataIndex: "is_active",
    key: "is_active",
    render: (value: boolean) => (value ? "Da" : "Ne"),
  },
];
// #endregion Table

// #region Form
export const TRAINING_TYPE_FORM_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "training-type-name",
      formName: "name",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
  ];
};
// #endregion Form

// #region Filters
export const TRAINING_TYPE_FILTER_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "training-type-name-filter",
      formName: "name__ilike",
      label: "Naziv",
    },
    {
      typeOfForm: TypeOfFormEnum.SELECT,
      testId: "training-type-active-filter",
      formName: "is_active",
      label: "Aktivan",
      options: [
        { label: "Da", value: 1 },
        { label: "Ne", value: 0 },
      ],
      allowClear: true,
    },
  ];
};
// #endregion Filters
