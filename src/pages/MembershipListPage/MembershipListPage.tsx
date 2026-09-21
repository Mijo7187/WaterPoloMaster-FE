import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxFilterTableWrapper,
  UxPageHeader,
} from "@components/UxComponents";
import { MEMBERSHIP_INITIAL_STATE } from "@modules/membership/membership.constants";
import { membershipStore } from "@modules/membership/membership.store";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { AddMembershipModal } from "./components/AddMembershipModal/AddMembershipModal";
import { MembershipFilters } from "./components/MembershipFilters/MembershipFilters";
import { MembershipTable } from "./components/MembershipTable/MembershipTable";

export const MembershipListPage: FC = observer(() => {
  const fetchMemberships = () => {
    void membershipStore.getMembershipsList();
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista članarina"
        rightContent={
          <UxButton
            testId="add-membership"
            onClick={() => {
              // Clear any row left over from a previous edit so the modal
              // opens in create mode.
              membershipStore.handleChange(
                "membership",
                MEMBERSHIP_INITIAL_STATE,
              );
              modalStore.openModal(ModalTypeEnum.MEMBERSHIP_MODAL);
            }}
          >
            + Dodaj članarinu
          </UxButton>
        }
      />

      <UxFilterTableWrapper
        filters={<MembershipFilters />}
        table={<MembershipTable />}
        pagination={
          <UrlPagination
            testId={PaginationEnum.MEMBERSHIP_PAGINATION}
            paginationName={PaginationEnum.MEMBERSHIP_PAGINATION}
            handlePaginationChange={fetchMemberships}
          />
        }
      />

      <AddMembershipModal />
    </div>
  );
});
