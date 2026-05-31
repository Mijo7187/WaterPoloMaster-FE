import { FC, useEffect } from "react";

import { Badge, BadgeProps, CalendarProps, Flex } from "antd";
import { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import { UxButton, UxCalendar } from "@components/UxComponents";
import { trainingsStore } from "@modules/trainings/trainings.store";
import {
  IGetTraining,
  TrainingStatusEnum,
} from "@modules/trainings/trainings.types";
import { modalStore, ModalTypeEnum } from "@stores";

import styles from "./TrainingsPage.module.scss";

const STATUS_BADGE_MAP: Record<TrainingStatusEnum, BadgeProps["status"]> = {
  [TrainingStatusEnum.INCOMING]: "warning",
  [TrainingStatusEnum.IN_PROGRESS]: "processing",
  [TrainingStatusEnum.COMPLETED]: "success",
  [TrainingStatusEnum.CANCELLED]: "error",
};

const getTrainingsForDate = (
  date: Dayjs,
  trainings: IGetTraining[],
): IGetTraining[] => {
  const dateStr = date.format("YYYY-MM-DD");
  return trainings.filter((t) =>
    t.start_training_date_time.startsWith(dateStr),
  );
};

export const TrainingsPage: FC = observer(() => {
  useEffect(() => {
    void trainingsStore.getTrainingsList();
  }, []);

  const dateCellRender = (value: Dayjs) => {
    const dayTrainings = getTrainingsForDate(
      value,
      trainingsStore.getterTrainingsList,
    );
    return (
      <ul className={styles.events}>
        {dayTrainings.map((training) => (
          <li key={training.id}>
            <Badge
              status={STATUS_BADGE_MAP[training.status]}
              text={`${training.start_training_date_time.slice(11, 16)} - ${training.end_training_date_time.slice(11, 16)}`}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return (
    <div className={styles.trainingsCalendar}>
      <Flex justify="space-between" className="mb-10">
        <h1>Kalendar treninga</h1>
        <UxButton
          type="primary"
          onClick={() => {
            modalStore.openModal(ModalTypeEnum.TRAINING_MODAL);
          }}
          testId="add-training"
        >
          Dodaj trening
        </UxButton>
      </Flex>
      <UxCalendar
        cellRender={cellRender}
        mode="month"
        testId={"trainings-calendar"}
      />
    </div>
  );
});
