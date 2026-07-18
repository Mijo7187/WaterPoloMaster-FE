import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { CompanyForm } from "@components/PagesComponents/Company/CompanyForm/CompanyForm";
import { UxButton, UxCard } from "@components/UxComponents";
import { companyStore, IPostCompany } from "@modules/company";

interface ICompanyInformationTabProps {
  companyId: number;
}

export const CompanyInformationTab: FC<ICompanyInformationTabProps> = observer(
  ({ companyId }) => {
    const [companyForm] = useForm();

    const onFinish = (values: IPostCompany) => {
      void companyStore.updateCompany(companyId, values);
    };

    useEffect(() => {
      companyForm.setFieldsValue(companyStore.getterCompany);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyStore.getterCompany]);

    return (
      <>
        <UxCard testId={"company-info-card"}>
          <CompanyForm
            form={companyForm}
            onFinish={onFinish}
            readOnly={false}
          />
        </UxCard>
        <Flex justify={"end"} className="pt-10 " align={"middle"}>
          <UxButton
            testId="company-info-save"
            onClick={() => {
              companyForm.submit();
            }}
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </>
    );
  },
);
