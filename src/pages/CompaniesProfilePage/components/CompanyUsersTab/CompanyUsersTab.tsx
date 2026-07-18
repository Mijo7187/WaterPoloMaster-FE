import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import { usersStore } from "@modules/users";
import { UserTable } from "@pages/UsersListPage/components/UserTable/UserTable";

interface ICompanyUsersTabProps {
  companyId: number;
}

export const CompanyUsersTab: FC<ICompanyUsersTabProps> = observer(
  ({ companyId }) => {
    useEffect(() => {
      void usersStore.getUsersListByCompanyId(companyId);
    }, [companyId]);

    return (
      <UxCard testId={"company-users"}>
        <UserTable />
      </UxCard>
    );
  },
);
