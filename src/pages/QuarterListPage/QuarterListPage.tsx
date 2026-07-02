import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxButton, UxPageHeader } from "@components/UxComponents";
import { quarterStore } from "@modules/quarter/quarter.store";
import { modalStore, ModalTypeEnum } from "@stores";

import { AddQuarterModal } from "./components/AddQuarterModal/AddQuarterModal";
import { QuarterTable } from "./components/QuarterTable/QuarterTable";

export const QuarterListPage: FC = observer(() => {
  useEffect(() => {
    void quarterStore.getQuartersList();
  }, []);

  return (
    <div>
      <UxPageHeader
        title="Lista kvartala"
        rightContent={
          <UxButton
            testId="add-quarter"
            onClick={() => {
              modalStore.openModal(ModalTypeEnum.QUARTER_MODAL);
            }}
          >
            + Dodaj kvartal
          </UxButton>
        }
      />
      <QuarterTable />
      <AddQuarterModal />
    </div>
  );
});
