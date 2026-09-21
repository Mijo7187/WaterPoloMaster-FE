import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { UxDynamicScrollDiv } from "@components/UxComponents/UxDynamicScrollDiv/UxDynamicScrollDiv";
import { TrainingSegmentEnum } from "@modules/sifarnici/exerciseOption/exerciseOption.types";
import { IGetTraining, IGetTrainingSegmente } from "@modules/training";
import { trainingStore } from "@modules/training/training.store";

import { AddSegmentModal } from "./components/AddSegmentModal/AddSegmentModal";
import { ExerciseSegment } from "./components/ExerciseSegment/ExerciseSegment";
import { SparringSegmentCard } from "./components/SparringSegment/SparringSegment";

interface ISegmentTrainingTabProps {
  training: IGetTraining;
}

export const SegmentTrainingTab: FC<ISegmentTrainingTabProps> = observer(
  ({ training }) => {
    useEffect(() => {
      if (!training.id) return;
      void trainingStore.getSegmentsByTrainingId(training.id);
    }, [training.id]);

    const segments = trainingStore.getterTrainingSegments;

    return (
      <div>
        <UxDynamicScrollDiv
          wrapperId={"segment"}
          extraMinus={300}
          idsToSubtract={[]}
        >
          {segments.map(
            (segment: IGetTrainingSegmente, index: number) => (
              <div key={index}>
                {segment.segment_type === TrainingSegmentEnum.SPARRING ? (
                  <SparringSegmentCard training={training} segment={segment} />
                ) : (
                  <ExerciseSegment
                    training={training}
                    segmentType={segment.segment_type}
                    segment={segment}
                  />
                )}
              </div>
            ),
            // <SegmentCard
            //   key={segment.id}
            //   training={training}
            //   segmentType={segment.segment_type}
            //   segment={segment}
            // />
          )}
        </UxDynamicScrollDiv>
        <AddSegmentModal trainingId={training.id} />
      </div>
    );
  },
);
