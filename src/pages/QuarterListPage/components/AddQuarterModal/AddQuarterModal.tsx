import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { QuarterForm } from "@components/PagesComponents/Quarter/QuarterForm/QuarterForm";
import { UxButton } from "@components/UxComponents";
import { UxBaseModal } from "@components/UxComponents/UxBaseModal/UxBaseModal";
import { QUARTER_INITIAL_STATE } from "@modules/quarter/quarter.constants";
import { quarterStore } from "@modules/quarter/quarter.store";
import { IPostQuarter } from "@modules/quarter/quarter.types";
import { ModalTypeEnum } from "@stores";

export const AddQuarterModal = observer(() => {
  const [quarterForm] = useForm();

  const onFinish = (quarter: IPostQuarter) => {
    void quarterStore.createQuarter(quarter);
  };

  return (
    <UxBaseModal
      name={ModalTypeEnum.QUARTER_MODAL}
      title={"Dodaj kvartal"}
      onCancel={() => {
        quarterStore.handleChange("quarter", QUARTER_INITIAL_STATE);
      }}
    >
      <QuarterForm form={quarterForm} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            quarterForm.submit();
          }}
          testId="submit-quarter"
        >
          Sačuvaj
        </UxButton>
      </Flex>
    </UxBaseModal>
  );
});
