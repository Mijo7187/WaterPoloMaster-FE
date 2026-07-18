import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { UrlTabs } from "@components/UrlComponents";
import { UxPageHeader } from "@components/UxComponents";
import { companyStore } from "@modules/company";
import { CompanyTypeEnum } from "@modules/company/company.types";
import { TabsTypeEnum } from "@stores";

import { CompanyInformationTab } from "./components/CompanyInformationTab/CompanyInformationTab";
import { CompanyPaymentTab } from "./components/CompanyPaymentTab/CompanyPaymentTab";
import { CompanyQuarterTab } from "./components/CompanyQuarterTab/CompanyQuarterTab";
import { CompanyTournamentTab } from "./components/CompanyTournamentTab/CompanyTournamentTab";
import { CompanyTrainingTab } from "./components/CompanyTrainingTab/CompanyTrainingTab";
import { CompanyUsersTab } from "./components/CompanyUsersTab/CompanyUsersTab";

export const CompaniesProfilePage: FC = observer(() => {
  const { id: idString } = useParams();
  const id = Number(idString);

  const company = companyStore.getterCompany;
  const companyType = company.company_type;

  useEffect(() => {
    if (id) {
      void companyStore.getCompanyById(id);
    }
  }, [id]);

  const informationTab = {
    key: "information",
    label: "Informacije",
    children: <CompanyInformationTab companyId={id} />,
  };

  const paymentTab = {
    key: "payment",
    label: "Plaćanja",
    children: <CompanyPaymentTab companyId={id} />,
  };

  const usersTab = {
    key: "users",
    label: "Korisnici",
    children: <CompanyUsersTab companyId={id} />,
  };

  const trainingTab = {
    key: "training",
    label: "Trening",
    children: <CompanyTrainingTab companyId={id} companyType={companyType} />,
  };

  const clubItems = [
    informationTab,
    {
      key: "tournament",
      label: "Turnir",
      children: <CompanyTournamentTab companyId={id} />,
    },
    trainingTab,
    paymentTab,
    {
      key: "quarter",
      label: "Kvartal",
      children: <CompanyQuarterTab companyId={id} />,
    },
    usersTab,
  ];

  const poolItems = [paymentTab, informationTab, usersTab, trainingTab];

  const items = companyType === CompanyTypeEnum.POOL ? poolItems : clubItems;

  return (
    <div>
      <UxPageHeader title={company.name} />
      <UrlTabs
        items={items}
        defaultValue={items[0].key}
        testId={TabsTypeEnum.COMPANY}
      />
    </div>
  );
});
