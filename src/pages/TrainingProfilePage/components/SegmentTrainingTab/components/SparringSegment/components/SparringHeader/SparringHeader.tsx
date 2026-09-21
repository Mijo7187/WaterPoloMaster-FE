import { FC, useState } from "react";

import { Col, Flex, Row } from "antd";
import to from "await-to-js";
import {
  DeleteOutlined,
  PauseCircleFilled,
  PlusCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { UxButton, UxPopconfirm } from "@components/UxComponents";
import { TRAINING_SEGMENT_LABEL_MAP } from "@modules/sifarnici/exerciseOption/exerciseOption.constants";
import { TrainingSegmentEnum } from "@modules/sifarnici/exerciseOption/exerciseOption.types";
import {
  IGetSparringSegment,
  IGetTraining,
  trainingStore,
} from "@modules/training";
interface ISparringSegmentProps {
  training: IGetTraining;
  segment: IGetSparringSegment;
}

export const SparringSegmentHeader: FC<ISparringSegmentProps> = ({
  training,
  segment,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const [err] = await to(trainingStore.getSegmentById(segment.id));
    setIsRefreshing(false);
    if (err) return;
  };

  return (
    <Flex className={"p-30"} justify="space-between" align="center">
      <h3>{TRAINING_SEGMENT_LABEL_MAP[TrainingSegmentEnum.SPARRING]}</h3>

      <Row justify={"end"} gutter={16}>
        <Col>
          <UxButton
            icon={<ReloadOutlined />}
            loading={isRefreshing}
            onClick={() => {
              void handleRefresh();
            }}
            testId={`refresh-segment-${segment.id}`}
          >
            Osveži
          </UxButton>
        </Col>
        <Col>
          <UxButton
            icon={<PauseCircleFilled />}
            testId={`pause-segment-${segment.id}`}
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
  );
};
