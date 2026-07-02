import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton, UxTable } from "@components/UxComponents";
import { companyStore, IGetCompany } from "@modules/company";
import { RoutePathsEnum } from "@router/router.types";

export const CompanyTable: FC = observer(() => {
  const navigate = useNavigate();
  const columns: ColumnsType<IGetCompany> = [
    {
      title: "Naziv",
      width: 250,
      minWidth: 250,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Adresa",
      width: 250,
      minWidth: 250,
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Država",
      width: 200,
      minWidth: 200,
      key: "country",
      dataIndex: ["country", "name"],
      // render: (_: unknown, record: IGetCompany) => record.city?.name ?? "",
    },
    {
      title: "Grad",
      width: 200,
      minWidth: 200,
      key: "city",
      dataIndex: ["city", "name"],
      // render: (_: unknown, record: IGetCompany) => record.city?.name ?? "",
    },
    {
      title: "Telefon",
      width: 200,
      minWidth: 200,
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      width: 250,
      minWidth: 250,
      dataIndex: "email",
      key: "email",
    },
    {
      title: ``,
      key: "operation",
      fixed: "right" as const,
      width: 50,
      minWidth: 50,
      align: "center" as const,
      render: (_: unknown, record: IGetCompany) => {
        return (
          <UxButton
            icon={<EditOutlined />}
            name={`edit-company-${record.id}`}
            onClick={() => {
              void navigate(`/${RoutePathsEnum.COMPANY_PROFILE}/${record.id}`);
            }}
            testId={`edit-company-${record.id}`}
          />
        );
      },
    },
  ];

  return (
    <UxTable
      testId="company-list"
      columns={columns}
      dataSource={companyStore.getterCompaniesList}
    />
  );
});
