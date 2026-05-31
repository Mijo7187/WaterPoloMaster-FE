import { FC, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";
import { UxButton } from "@components/UxComponents";
import { UxTable } from "@components/UxComponents/UxTable/UxTable";
import { sifarniciStore } from "@modules/sifarnici/sifarnici.store";
import {
  IGetSifarnikType,
  SifarniciTypeEnum,
} from "@modules/sifarnici/sifarnici.types";
import { SIFARNIK_TABLE_CONFIG_DATA } from "@pages/SifarniciPage/components/sifarniciPage.config";
import { modalStore, ModalTypeEnum } from "@stores";

interface ISifarniciTableProps {
  sifarnikType: SifarniciTypeEnum;
}

export const SifarniciTable: FC<ISifarniciTableProps> = observer(
  ({ sifarnikType }) => {
    const [, setSearchParams] = useSearchParams();

    const columns = useMemo((): ColumnsType<IGetSifarnikType> => {
      const baseColumns = SIFARNIK_TABLE_CONFIG_DATA[sifarnikType];
      const resolvedBaseColumns: ColumnsType<IGetSifarnikType> =
        typeof baseColumns === "function" ? baseColumns() : [];
      return [
        ...resolvedBaseColumns,
        {
          title: ``,
          key: "operation",
          fixed: "right" as const,
          width: 80,
          align: "center" as const,
          render: (_: unknown, record: IGetSifarnikType) => {
            return (
              <UxButton
                icon={<EditOutlined />}
                name={`edit-sifarnik-${sifarnikType}`}
                onClick={() => {
                  modalStore.openModal(ModalTypeEnum.SIFARNIK_MODAL);
                  setSearchParams({
                    sifarnik_type: sifarnikType,
                    sifarnik_id: String(record.id),
                  });
                }}
                testId={`edit-sifarnik-${sifarnikType}`}
              />
            );
          },
        },
      ].filter(Boolean);
    }, [sifarnikType]);

    return (
      <UxTable<IGetSifarnikType>
        testId="sifarnici"
        pagination={false}
        columns={[...columns]}
        dataSource={[...sifarniciStore.sifarniciListTable]}
      />
    );
  },
);
