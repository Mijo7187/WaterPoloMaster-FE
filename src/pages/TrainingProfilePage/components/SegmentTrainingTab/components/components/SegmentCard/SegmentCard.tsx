import { FC } from "react";

import { Col, Flex, Row } from "antd";
import { observer } from "mobx-react-lite";
import {
  DeleteOutlined,
  PauseCircleFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import { UxButton, UxCard, UxPopconfirm } from "@components/UxComponents";
import { TRAINING_SEGMENT_LABEL_MAP } from "@modules/sifarnici/exerciseOption/exerciseOption.constants";
import { TrainingSegmentEnum } from "@modules/sifarnici/exerciseOption/exerciseOption.types";
import { trainingStore } from "@modules/training/training.store";
import {
  IGetTraining,
  IGetTrainingSegmente,
} from "@modules/training/training.types";

interface ISegmentCardProps {
  training: IGetTraining;
  segmentType: TrainingSegmentEnum;
  segment: IGetTrainingSegmente;
}

export const SegmentCard: FC<ISegmentCardProps> = observer(
  ({ training, segmentType, segment }) => {
    const title = TRAINING_SEGMENT_LABEL_MAP[segmentType];

    return (
      <>
        <UxCard className="p-0 mt-10" testId={`segment-card-${segment.id}`}>
          {/* {deleteButton} */}
          <Flex className={"p-30"} justify="space-between" align="center">
            <h3>{title}</h3>
            <Row justify={"end"} gutter={16}>
              <Col>
                <UxButton
                  icon={<PauseCircleFilled />}
                  testId={`add-event-${segment.id}`}
                  danger
                >
                  Pauziraj
                </UxButton>
              </Col>
              <Col>
                <UxButton
                  icon={<PlusCircleFilled />}
                  testId={`add-event-${segment.id}`}
                >
                  Dodaj događaj
                </UxButton>
              </Col>
              <Col>
                <UxPopconfirm
                  title="Obriši segment"
                  description="Da li ste sigurni?"
                  onConfirm={() => {
                    void trainingStore.deleteSegment(segment.id, training.id);
                  }}
                  testId={`delete-segment-${segment.id}`}
                >
                  <UxButton
                    icon={<DeleteOutlined />}
                    danger
                    testId={`delete-segment-${segment.id}`}
                  />
                </UxPopconfirm>
              </Col>
            </Row>
          </Flex>
        </UxCard>
      </>
    );
  },
);
