import {
  CompanyTypeEnum,
  ICompanyFilters,
  IPostCompany,
} from "./company.types";

export const COMPANY_INITIAL_STATE: IPostCompany = {
  name: "",
  address: "",
  phone_number: "",
  email: "",
  company_type: CompanyTypeEnum.CLUB,
  city_id: "",
  country_id: "",
};

export const COMPANY_TYPE_OPTIONS = Object.values(CompanyTypeEnum).map(
  (type) => ({
    label: type,
    value: type,
  }),
);

export const COMPANY_FILTERS_INITIAL_STATE: ICompanyFilters = {
  name__ilike: "",
};
