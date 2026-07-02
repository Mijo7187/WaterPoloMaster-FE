import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { CompanyForm } from "@components/PagesComponents/Company/CompanyForm/CompanyForm";
import { UxButton, UxCard, UxPageHeader } from "@components/UxComponents";
import { authStore } from "@modules/auth/auth.store";
import { companyStore, IPostCompany } from "@modules/company";

export const CompanyPage: FC = observer(() => {
  const companyId = authStore.getAuthUser.company_id;
  const [companyForm] = useForm();

  const onFinish = (values: IPostCompany) => {
    void companyStore.updateCompany(companyId, values);
  };

  useEffect(() => {
    void companyStore.getCompanyById(companyId);
  }, []);

  useEffect(() => {
    console.log(companyStore.getterCompany);
    companyForm.setFieldsValue(companyStore.getterCompany);
  }, [companyStore.getterCompany]);

  return (
    <>
      <UxPageHeader title={companyStore.getterCompany.name} />
      <UxCard testId={"company-page-card"}>
        {/* <UxSmallHeader title={"Informacije"} subtitle={"Podaci o kompaniji"} /> */}
        <CompanyForm form={companyForm} onFinish={onFinish} readOnly={false} />
      </UxCard>
      <Flex
        justify={"end"}
        className="pt-10 "
        align={"middle"}
        id="user-buttons"
      >
        <UxButton
          testId="location-tab-form"
          onClick={() => {
            companyForm.submit();
          }}
          // icon={<SvgIcon iconType="save" size="small" />}
        >
          Sačuvaj
          {/* {t(formValidationTR.SAVE)} */}
        </UxButton>
      </Flex>
    </>
  );
});
