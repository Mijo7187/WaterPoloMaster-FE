import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import { UxFilterTableWrapper } from "@components/UxComponents";
import { usersStore } from "@modules/users";
import { AddUserModal } from "@pages/UsersListPage/components/AddUserModal/AddUserModal";
import { UserTable } from "@pages/UsersListPage/components/UserTable/UserTable";
import { UserFilters } from "@pages/UsersListPage/components/UserTableFilters/UserTableFilters";
import { PaginationEnum } from "@stores";

interface ICompanyUsersTabProps {
  companyId: number;
}

export const CompanyUsersTab: FC<ICompanyUsersTabProps> = observer(
  ({ companyId }) => {
    const fetchUsers = () => {
      void usersStore.getUsersListByCompanyId(companyId);
    };

    useEffect(() => {
      fetchUsers();
    }, [companyId]);

    return (
      <>
        <UxFilterTableWrapper
          filters={
            <UserFilters
              handleFiltersChange={fetchUsers}
              hiddenFields={["company_id"]}
            />
          }
          table={<UserTable />}
          pagination={
            <UrlPagination
              testId="company-users-pagination"
              paginationName={PaginationEnum.USER_PAGINATION}
              handlePaginationChange={fetchUsers}
            />
          }
        />
        <AddUserModal />
      </>
    );
  },
);
