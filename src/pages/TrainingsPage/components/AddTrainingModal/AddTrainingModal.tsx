import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { TrainingForm } from "@components/PagesComponents/Training/TrainingForm/TrainingForm";
import { UxButton } from "@components/UxComponents";
import { UxBaseModal } from "@components/UxComponents/UxBaseModal/UxBaseModal";
import { TRAINING_INITIAL_STATE } from "@modules/trainings/trainings.constants";
import { trainingsStore } from "@modules/trainings/trainings.store";
import { IPostTraining } from "@modules/trainings/trainings.types";
import { ModalTypeEnum } from "@stores";

export const AddTrainingModal = observer(() => {
  const [trainingForm] = useForm();

  const onFinish = (training: IPostTraining) => {
    void trainingsStore.createTraining(training);
  };

  return (
    <UxBaseModal
      name={ModalTypeEnum.TRAINING_MODAL}
      onCancel={() => {
        trainingsStore.handleChange("training", TRAINING_INITIAL_STATE);
      }}
    >
      <TrainingForm form={trainingForm} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            trainingForm.submit();
          }}
          testId="submit-training"
        >
          Sačuvaj
        </UxButton>
      </Flex>
    </UxBaseModal>
  );
});
