import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import {
  UxButton,
  UxCard,
  UxPageHeader,
  UxPagination,
} from "@components/UxComponents";
import { usersStore } from "@modules/users";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { AddUserModal } from "./components/AddUserModal/AddUserModal";
import { UserTable } from "./components/UserTable/UserTable";
import { UserFilters } from "./components/UserTableFilters/UserTableFilters";

import styles from "./UsersListPage.module.scss";
import { AppPagination } from "@components/AppCompononets";
import { UxFilterTableWrapper } from "@components/UxComponents/UxFilterTableWrapper/UxFilterTableWrapper";

export const UsersListPage: FC = observer(() => {
  const onAddUserClick = () => {
    modalStore.openModal(ModalTypeEnum.USER_MODAL);
  };

  const fetchUsers = () => {
    void usersStore.getAllUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista korisnika"
        rightContent={
          <UxButton testId={"add-user"} onClick={onAddUserClick}>
            + dodaj korisnika
          </UxButton>
        }
      />

      <UxFilterTableWrapper
        filters={<UserFilters />}
        table={<UserTable />}
        pagination={
          <AppPagination
            align="end"
            handlePaginationChange={fetchUsers}
            paginationName={PaginationEnum.USER_PAGINATION}
            testId={PaginationEnum.USER_PAGINATION}
          />
        }
      />

      <AddUserModal />
    </div>
  );
});
