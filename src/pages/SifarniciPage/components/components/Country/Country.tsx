import { ColumnsType } from "antd/es/table";
import { IGetCountry } from "@modules/sifarnici/country/country.types";
import { ICrudOptionsConfig, TypeOfFormEnum } from "@stores";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

// #region Table

export const COUNTRY_TABLE_COLUMNS = (): ColumnsType<IGetCountry> => [
  {
    title: "Naziv",
    width: 250,
    minWidth: 250,
    dataIndex: "name",
    key: "name",
  },
];
// #endregion Table

// #region Form
export const COUNTRY_FORM_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "city-name",
      formName: "name",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
  ];
};
// #endregion Form

// #region Filters
export const COUNTRY_FILTER_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "country-name",
      formName: "name__ilike",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
  ];
};
// #endregion Filters
