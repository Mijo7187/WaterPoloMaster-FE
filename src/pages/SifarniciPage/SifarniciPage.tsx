import { FC } from "react";

import { Row, Space } from "antd";
import { observer } from "mobx-react-lite";
import { PlusCircleFilled } from "@ant-design/icons";
import { UrlPagination } from "@components/UrlComponents";
import { UxButton, UxFilterTableWrapper } from "@components/UxComponents";
import { UxSelect } from "@components/UxFormComponents";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import { SIFARNIK_SELECT_OPTIONS } from "@pages/SifarniciPage/components/sifarniciPage.config";
import { modalStore, ModalTypeEnum, PaginationEnum } from "@stores";
import { handleSearchOptions } from "@utils/handleSearchOptions";

import { SifarniciCrudModal } from "./components/SifarniciCrudModal/SifarniciCrudModal";
import { SifarniciFilters } from "./components/SifarniciFilters/SifarniciFilters";
import { SifarniciTable } from "./components/SifarniciTable/SifarniciTable";
import { useSifarniciHook } from "./hooks/useSifarniciHook";

interface ISifarniciHeaderProps {
  onSifarnikTypeChange: (newType: SifarniciTypeEnum) => void;
  sifarnik_type?: SifarniciTypeEnum;
}

const SifarniciHeader: FC<ISifarniciHeaderProps> = observer(
  ({ onSifarnikTypeChange, sifarnik_type }) => {
    return (
      <Row justify={"space-between"} id="sifarniciHeader" className="pb-20">
        <h1>{"Šifarnici"}</h1>
        <Row justify={"end"}>
          <Space>
            <UxSelect
              showSearch={{
                optionFilterProp: "children",
                filterOption: handleSearchOptions,
              }}
              style={{ minWidth: "450px" }}
              onChange={onSifarnikTypeChange}
              value={sifarnik_type}
              options={SIFARNIK_SELECT_OPTIONS}
              testId={"sifarnik-type-select"}
            />

            <UxButton
              testId={`add-sifarnik-${sifarnik_type}`}
              disabled={!sifarnik_type}
              icon={<PlusCircleFilled />}
              onClick={() => {
                modalStore.openModal(ModalTypeEnum.SIFARNIK_MODAL);
              }}
            >
              {"Dodaj"}
            </UxButton>
          </Space>
        </Row>
      </Row>
    );
  },
);

export const SifarniciPage: FC = observer(() => {
  const { sifarnikType, onSifarnikTypeChange, fetchSifarnikList } =
    useSifarniciHook();

  return (
    <>
      <SifarniciHeader
        onSifarnikTypeChange={onSifarnikTypeChange}
        sifarnik_type={sifarnikType}
      />

      <UxFilterTableWrapper
        filters={
          // key → fresh form (and filter store group) on every šifarnik switch
          <SifarniciFilters
            key={sifarnikType}
            sifarnikType={sifarnikType}
            fetchSifarnikList={fetchSifarnikList}
          />
        }
        table={<SifarniciTable sifarnikType={sifarnikType} />}
        pagination={
          <UrlPagination
            handlePaginationChange={fetchSifarnikList}
            paginationName={PaginationEnum.SIFARNICI_PAGINATION}
            testId={PaginationEnum.SIFARNICI_PAGINATION}
          />
        }
      />
      <SifarniciCrudModal sifarnikType={sifarnikType} />
    </>
  );
});
