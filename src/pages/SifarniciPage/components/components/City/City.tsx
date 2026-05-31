import { FormInstance } from "antd";
import { ColumnsType } from "antd/es/table";
import { FCity, IGetCity } from "@modules/sifarnici/city/city.types";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { ICrudOptionsConfig, TypeOfFormEnum } from "@stores";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";
// #region Table
export const CITY_TABLE_COLUMNS = (): ColumnsType<IGetCity> => [
  {
    title: "Država",
    width: 250,
    minWidth: 250,
    dataIndex: ["country", "name"],
    key: "country",
  },
  {
    title: "Naziv",
    width: 250,
    minWidth: 250,
    dataIndex: "name",
    key: "name",
  },
];
// #endregion Table

// #region Modal
export const CITY_FORM_FIELDS = (
  _: FormInstance<IGetCity>,
): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "city-name",
      formName: "name",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
    {
      typeOfForm: TypeOfFormEnum.SCROLL_SELECT,
      testId: "city-country",
      formName: "country_id",
      objName: "country",
      label: "Država",
      sifarnikName: SifarniciTypeEnum.COUNTRY,
      rules: [REQUIRED_FIELD_RULE(true)],
    },
  ];
};
// #endregion Modal

// #region Filters
export const CITY_FILTER_FIELDS = (
  _: FormInstance<FCity>,
): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "city-name",
      formName: "name__ilike",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
  ];
};

// #endregion Filters
