import { FC, useEffect } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { CompanyForm } from "@components/PagesComponents/Company/CompanyForm/CompanyForm";
import { UxCard, UxSmallHeader } from "@components/UxComponents";
import { authStore } from "@modules/auth/auth.store";
import { companyStore, IPostCompany } from "@modules/company";

export const CompanyPage: FC = observer(() => {
  const [companyForm] = useForm();

  const onFinish = (values: IPostCompany) => {
    console.log("CompanyInfo form values:", values);
  };

  useEffect(() => {
    void companyStore.getCompanyById(authStore.getAuthUser.company_id);
  }, []);

  useEffect(() => {
    companyForm.setFieldsValue(companyStore.getterCompany);
  }, [companyStore.getterCompany]);

  return (
    <UxCard testId={"company-page-card"}>
      <UxSmallHeader title={"Informacije"} subtitle={"Podaci o kompaniji"} />
      <CompanyForm form={companyForm} onFinish={onFinish} readOnly={false} />
    </UxCard>
  );
});
