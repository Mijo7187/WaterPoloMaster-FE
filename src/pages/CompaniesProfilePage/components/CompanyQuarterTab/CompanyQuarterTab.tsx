import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { quarterStore } from "@modules/quarter";
import { QuarterTable } from "@pages/QuarterListPage/components/QuarterTable/QuarterTable";

interface ICompanyQuarterTabProps {
  companyId: number;
}

export const CompanyQuarterTab: FC<ICompanyQuarterTabProps> = observer(
  ({ companyId }) => {
    useEffect(() => {
      void quarterStore.getQuartersListByCompanyId(companyId);
    }, [companyId]);

    return (
      <UxCard testId={"company-quarter"}>
        <QuarterTable />
      </UxCard>
    );
  },
);
