import { FC, useEffect } from "react";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { UrlPagination } from "@components/UrlComponents";
import {
  UxFilterTableWrapper,
  UxTable,
  UxTag,
} from "@components/UxComponents";
import { contractInstallmentStore } from "@modules/contractInstallment/contractInstallment.store";
import { IGetContractInstallment } from "@modules/contractInstallment/contractInstallment.types";
import { PaginationEnum } from "@stores";

interface IInstallmentsContractTabProps {
  contractId: number;
}

const formatDate = (value?: string | null) =>
  value ? dayjs(value).format("DD-MM-YYYY") : "";

export const InstallmentsContractTab: FC<IInstallmentsContractTabProps> =
  observer(({ contractId }) => {
    const fetchInstallments = () => {
      if (!contractId) return;
      void contractInstallmentStore.getContractInstallmentsListByContractId(
        contractId,
      );
    };

    useEffect(() => {
      fetchInstallments();
    }, [contractId]);

    const columns: ColumnsType<IGetContractInstallment> = [
      {
        title: "Period",
        width: 220,
        minWidth: 220,
        key: "period",
        render: (_: unknown, record: IGetContractInstallment) =>
          `${formatDate(record.period_start)} – ${formatDate(record.period_end)}`,
      },
      {
        title: "Dospeva",
        width: 140,
        minWidth: 140,
        dataIndex: "due_date",
        key: "due_date",
        render: (value: string) => formatDate(value),
      },
      {
        title: "Iznos",
        width: 120,
        minWidth: 120,
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Oslobođeno",
        width: 130,
        minWidth: 130,
        dataIndex: "waived",
        key: "waived",
        render: (value: boolean) => (
          <UxTag
            testId={`installment-waived-${String(value)}`}
            color={value ? "orange" : "green"}
          >
            {value ? "Da" : "Ne"}
          </UxTag>
        ),
      },
    ];

    const installments =
      contractInstallmentStore.getterContractInstallmentsList;

    // The rows are the split of the contract total, so the sum is the check the
    // user needs: it must match the contract amount.
    const total = installments.reduce(
      (sum, installment) => sum + (installment.amount ?? 0),
      0,
    );

    return (
      // No filters: installments have no filter group / list page to reuse.
      <UxFilterTableWrapper
        table={
          <UxTable
            testId="contract-installments-list"
            columns={columns}
            dataSource={installments}
            loading={contractInstallmentStore.isLoading}
            summary={() =>
              installments.length ? (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>Ukupno</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} />
                  <Table.Summary.Cell index={2}>{total}</Table.Summary.Cell>
                  <Table.Summary.Cell index={3} />
                </Table.Summary.Row>
              ) : null
            }
          />
        }
        pagination={
          <UrlPagination
            testId="contract-installments-pagination"
            paginationName={PaginationEnum.CONTRACT_INSTALLMENT_PAGINATION}
            handlePaginationChange={fetchInstallments}
          />
        }
      />
    );
  });
