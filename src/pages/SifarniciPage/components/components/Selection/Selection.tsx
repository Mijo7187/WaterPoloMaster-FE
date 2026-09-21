import { ColumnsType } from "antd/es/table";
import { IGetSelection } from "@modules/sifarnici/selection/selection.types";
import { FilterConfig, ICrudOptionsConfig, TypeOfFormEnum } from "@stores";
import { FILTER_NAME } from "@stores/filters/filtersOptions.constants";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

// #region Table

export const SELECTION_TABLE_COLUMNS = (): ColumnsType<IGetSelection> => [
  {
    title: "Naziv",
    width: 250,
    minWidth: 250,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Min. godina",
    width: 150,
    minWidth: 150,
    dataIndex: "age_min",
    key: "age_min",
  },
  {
    title: "Maks. godina",
    width: 150,
    minWidth: 150,
    dataIndex: "age_max",
    key: "age_max",
  },
];
// #endregion Table

// #region Form
export const SELECTION_FORM_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "selection-name",
      formName: "name",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
    {
      typeOfForm: TypeOfFormEnum.INPUT_NUMBER,
      testId: "selection-age-min",
      formName: "age_min",
      label: "Min. godina",
    },
    {
      typeOfForm: TypeOfFormEnum.INPUT_NUMBER,
      testId: "selection-age-max",
      formName: "age_max",
      label: "Maks. godina",
    },
  ];
};
// #endregion Form

// #region Filters
export const SELECTION_FILTER_FIELDS = (): FilterConfig[] => {
  return [{ ...FILTER_NAME, testId: "selection-name", colSpan: 6 }];
};
// #endregion Filters
