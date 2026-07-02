import { ColumnsType } from "antd/es/table";
import { IGetSwimmingDiscipline } from "@modules/sifarnici/swimmingDiscipline/swimmingDiscipline.types";
import { ICrudOptionsConfig, TypeOfFormEnum } from "@stores";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

// #region Table
export const SWIMMING_DISCIPLINE_TABLE_COLUMNS =
  (): ColumnsType<IGetSwimmingDiscipline> => [
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
export const SWIMMING_DISCIPLINE_FORM_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "swimming-discipline-name",
      formName: "name",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
  ];
};
// #endregion Form

// #region Filters
export const SWIMMING_DISCIPLINE_FILTER_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "swimming-discipline-name-filter",
      formName: "name__ilike",
      label: "Naziv",
    },
    {
      typeOfForm: TypeOfFormEnum.SELECT,
      testId: "swimming-discipline-active-filter",
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
