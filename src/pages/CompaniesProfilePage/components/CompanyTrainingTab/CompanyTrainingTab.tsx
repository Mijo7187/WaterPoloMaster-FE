import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { CompanyTypeEnum } from "@modules/company/company.types";
import { trainingStore } from "@modules/training";
import { TrainingTable } from "@pages/TrainingsListPage/components/TrainingTable/TrainingTable";

interface ICompanyTrainingTabProps {
  companyId: number;
  companyType: CompanyTypeEnum;
}

export const CompanyTrainingTab: FC<ICompanyTrainingTabProps> = observer(
  ({ companyId, companyType }) => {
    useEffect(() => {
      if (companyType === CompanyTypeEnum.POOL) {
        void trainingStore.getTrainingsListByPoolId(companyId);
      } else {
        void trainingStore.getTrainingsListByCompanyId(companyId);
      }
    }, [companyId, companyType]);

    return (
      <UxCard testId={"company-training"}>
        <TrainingTable />
      </UxCard>
    );
  },
);
