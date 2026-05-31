import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { CompanyForm } from "@components/PagesComponents/Company/CompanyForm/CompanyForm";
import { UxBaseModal, UxButton } from "@components/UxComponents";
import { COMPANY_INITIAL_STATE } from "@modules/company/company.constants";
import { companyStore } from "@modules/company/company.store";
import { IPostCompany } from "@modules/company/company.types";
import { ModalTypeEnum } from "@stores";

const AddCompanyForm = () => {
  const [companyForm] = useForm();

  const onFinish = (company: IPostCompany) => {
    void companyStore.createCompany(company);
  };

  return (
    <>
      <CompanyForm form={companyForm} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            companyForm.submit();
          }}
          testId={"submit-company"}
        >
          Submit
        </UxButton>
      </Flex>
    </>
  );
};

export const AddCompanyModal = observer(() => {
  return (
    <UxBaseModal
      name={ModalTypeEnum.COMPANY_MODAL}
      title={"Dodaj kompaniju"}
      onCancel={() => {
        companyStore.handleChange("company", COMPANY_INITIAL_STATE);
      }}
    >
      <AddCompanyForm />
    </UxBaseModal>
  );
});
