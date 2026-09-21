import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { CompanyTypeEnum } from "@modules/company/company.types";
import { trainingStore } from "@modules/training";
import { TrainingFilters } from "@pages/TrainingsListPage/components/TrainingFilters/TrainingFilters";
import { TrainingTable } from "@pages/TrainingsListPage/components/TrainingTable/TrainingTable";
import { PaginationEnum } from "@stores";

interface ICompanyTrainingTabProps {
  companyId: number;
  companyType: CompanyTypeEnum;
}

export const CompanyTrainingTab: FC<ICompanyTrainingTabProps> = observer(
  ({ companyId, companyType }) => {
    const fetchTrainings = () => {
      if (companyType === CompanyTypeEnum.POOL) {
        void trainingStore.getTrainingsListByPoolId(companyId);
      } else {
        void trainingStore.getTrainingsListByCompanyId(companyId);
      }
    };

    useEffect(() => {
      fetchTrainings();
    }, [companyId, companyType]);

    return (
      <UxFilterTableWrapper
        filters={<TrainingFilters handleFiltersChange={fetchTrainings} />}
        table={<TrainingTable />}
        pagination={
          <UrlPagination
            testId="company-training-pagination"
            paginationName={PaginationEnum.TRAINING_PAGINATION}
            handlePaginationChange={fetchTrainings}
          />
        }
      />
    );
  },
);
