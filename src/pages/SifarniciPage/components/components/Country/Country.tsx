import { ColumnsType } from "antd/es/table";
import { IGetCountry } from "@modules/sifarnici/country/country.types";
import { FilterConfig, ICrudOptionsConfig, TypeOfFormEnum } from "@stores";
import { FILTER_NAME } from "@stores/filters/filtersOptions.constants";
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
export const COUNTRY_FILTER_FIELDS = (): FilterConfig[] => {
  return [{ ...FILTER_NAME, testId: "country-name", colSpan: 6 }];
};
// #endregion Filters
