import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable } from "@components/UxComponents";
import { IGetUser, usersStore } from "@modules/users";
import { RoutePathsEnum } from "@router/router.types";

export const UserTable: FC = observer(() => {
  const navigate = useNavigate();
  const columns: ColumnsType<IGetUser> = [
    {
      title: "Ime",
      width: 200,
      minWidth: 200,
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Prezime",
      width: 200,
      minWidth: 200,
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      width: 250,
      minWidth: 250,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Broj telefona",
      width: 200,
      minWidth: 200,
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Datum rođenja",
      width: 200,
      minWidth: 200,
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Aktivan",
      width: 150,
      minWidth: 150,
      dataIndex: "is_active",
      key: "is_active",
    },
    {
      title: "Uloge",
      width: 200,
      minWidth: 200,
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "",
      width: 50,
      minWidth: 50,
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      render: (_: unknown, record: IGetUser) => {
        return (
          <UxButton
            icon={<EditOutlined />}
            name={`edit-user-${record.id}`}
            onClick={() => {
              void navigate(`/${RoutePathsEnum.USER_PROFILE}/${record.id}`);
            }}
            testId={`edit-user-${record.id}`}
          />
        );
      },
    },
  ];
  return (
    <UxTable
      testId="users-list"
      columns={columns}
      pagination={false}
      dataSource={usersStore.getterUsersList}
    />
  );
});
