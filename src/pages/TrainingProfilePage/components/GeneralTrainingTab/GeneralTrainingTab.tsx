import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { TrainingForm } from "@components/PagesComponents/Training/TrainingForm/TrainingForm";
import { UxButton, UxCard } from "@components/UxComponents";
import { UxDynamicScrollDiv } from "@components/UxComponents/UxDynamicScrollDiv/UxDynamicScrollDiv";
import { IGetTraining, trainingStore } from "@modules/training";

interface IGeneralTrainingTabProps {
  training: IGetTraining;
}

export const GeneralTrainingTab: FC<IGeneralTrainingTabProps> = observer(
  ({ training }) => {
    const [form] = useForm<IGetTraining>();

    const onFinish = (values: IGetTraining) => {
      void trainingStore.updateTraining(training.id, values);
      void trainingStore.getTrainingsList();
    };

    useEffect(() => {
      if (!training.id) return;
      form.setFieldsValue({
        ...training,
        training_date: training.training_date
          ? (dayjs(training.training_date) as unknown as string)
          : "",
        start_time: training.start_time
          ? (dayjs(training.start_time, "HH:mm:ss") as unknown as string)
          : "",
        end_time: training.end_time
          ? (dayjs(training.end_time, "HH:mm:ss") as unknown as string)
          : "",
      });
    }, [training]);

    return (
      <>
        <UxCard className="p-20" testId={"training"}>
          <UxDynamicScrollDiv
            wrapperId={"training-form"}
            idsToSubtract={[""]}
            extraMinus={380}
          >
            <TrainingForm form={form} onFinish={onFinish} />
          </UxDynamicScrollDiv>
        </UxCard>
        <Flex justify="end" className="mt-10">
          <UxButton
            type="primary"
            onClick={() => {
              form.submit();
            }}
            testId="submit-edit-training"
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </>
    );
  },
);
