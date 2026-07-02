import { FC, useEffect } from "react";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { DeleteOutlined } from "@ant-design/icons";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxButton,
  UxPopconfirm,
  UxSmallHeader,
  UxTable,
} from "@components/UxComponents";
import { quarterStore } from "@modules/quarter/quarter.store";
import {
  IGetQuarter,
  IGetQuarterUsersList,
} from "@modules/quarter/quarter.types";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";

import { QuarterAddUserModal } from "./QuarterAddUserModal/QuarterAddUserModal";

interface IUsersQuarterTabProps {
  quarter: IGetQuarter;
}

export const UsersQuarterTab: FC<IUsersQuarterTabProps> = observer(
  ({ quarter }) => {
    useEffect(() => {
      void quarterStore.getQuarterUsersList();
    }, [quarter.id]);

    const columns: ColumnsType<IGetQuarterUsersList> = [
      {
        title: "Ime",
        dataIndex: ["user", "first_name"],
        key: "first_name",
      },
      {
        title: "Prezime",
        dataIndex: ["user", "last_name"],
        key: "last_name",
      },
      {
        title: "",
        key: "action",
        fixed: "right" as const,
        width: 50,
        align: "center" as const,
        render: (_: unknown, record: IGetQuarterUsersList) => (
          <UxPopconfirm
            title="Ukloni korisnika"
            description="Da li ste sigurni?"
            onConfirm={() => {
              void quarterStore.removeUserFromQuarter(record.id);
            }}
            testId={"remove-user"}
          >
            <UxButton
              icon={<DeleteOutlined />}
              danger
              testId={`remove-user-${record.id}`}
            />
          </UxPopconfirm>
        ),
      },
    ];

    return (
      <div>
        <UxSmallHeader
          title="Korisnici"
          rightContent={
            <UxButton
              testId="add-quarter-user"
              onClick={() => {
                modalStore.openModal(ModalTypeEnum.QUARTER_ADD_USER_MODAL);
              }}
            >
              + Dodaj korisnika
            </UxButton>
          }
        />
        <UxTable
          testId="quarter-users-list"
          columns={columns}
          dataSource={quarterStore.getterQuarterUsersList}
          loading={quarterStore.isLoading}
        />
        <UrlPagination
          testId="quarter-users-pagination"
          paginationName={PaginationEnum.USER_PAGINATION}
          handlePaginationChange={() => {
            void quarterStore.getQuarterUsersList();
          }}
        />
        <QuarterAddUserModal quarter={quarter} />
      </div>
    );
  },
);
