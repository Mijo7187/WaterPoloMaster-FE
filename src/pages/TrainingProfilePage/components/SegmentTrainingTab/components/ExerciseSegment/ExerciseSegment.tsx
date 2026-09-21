import { FC, useEffect } from "react";

import { Col, Flex, Form, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { DeleteOutlined } from "@ant-design/icons";
import { UxButton } from "@components/UxComponents";
import {
  UxFormInputNumber,
  UxFormScrollSelect,
  UxFormTextArea,
} from "@components/UxFormComponents";
import { TrainingSegmentEnum } from "@modules/sifarnici/exerciseOption/exerciseOption.types";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import {
  SEGMENT_METRIC_FIELDS,
  SEGMENT_METRIC_LABEL_MAP,
} from "@modules/training/training.constants";
import { trainingStore } from "@modules/training/training.store";
import {
  IGetBaseExerciseSegment,
  IGetTraining,
  IPostBaseExerciseSegment,
  IPostExerciseSegment,
} from "@modules/training/training.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

type ExerciseSegmentType =
  | TrainingSegmentEnum.SWIMMING
  | TrainingSegmentEnum.GYM
  | TrainingSegmentEnum.WORK_WITH_BALL;

interface IExerciseFormRow extends Partial<IPostExerciseSegment> {
  exercise_option?: unknown;
}

interface IExerciseSegmentFormValues {
  duration_minutes?: number | null;
  notes?: string | null;
  exercises?: IExerciseFormRow[];
}

interface IExerciseSegmentProps {
  training: IGetTraining;
  segmentType: ExerciseSegmentType;
  segment?: IGetBaseExerciseSegment;
  onSaved?: () => void;
}

export const ExerciseSegment: FC<IExerciseSegmentProps> = observer(
  ({ training, segmentType, segment, onSaved }) => {
    const [form] = useForm<IExerciseSegmentFormValues>();
    const metricFields = SEGMENT_METRIC_FIELDS[segmentType];

    useEffect(() => {
      if (!segment) return;
      form.setFieldsValue({
        duration_minutes: segment.duration_minutes,
        notes: segment.notes,
        exercises: (segment.exercises ?? []).map((exercise) => ({
          exercise_option_id: exercise.exercise_option_id,
          exercise_option:
            "exercise_option" in exercise
              ? exercise.exercise_option
              : undefined,
          meters: exercise.meters,
          sets: exercise.sets,
          reps: exercise.reps,
          weight_kg: exercise.weight_kg,
          duration_seconds: exercise.duration_seconds,
        })),
      });
    }, [segment]);

    const onFinish = (values: IExerciseSegmentFormValues) => {
      const exercises: IPostExerciseSegment[] = (values.exercises ?? [])
        .map((row, index) => {
          if (row.exercise_option_id == null) return null;
          const input: IPostExerciseSegment = {
            exercise_option_id: row.exercise_option_id,
            position: index,
          };
          metricFields.forEach((field) => {
            input[field] = row[field] ?? null;
          });
          return input;
        })
        .filter((row): row is IPostExerciseSegment => row !== null);

      const payload: IPostBaseExerciseSegment = {
        training_id: training.id,
        segment_type: segmentType,
        duration_minutes: values.duration_minutes ?? null,
        notes: values.notes ?? null,
        exercises,
      };

      if (segment) {
        void trainingStore.updateSegment(segment.id, training.id, payload);
        return;
      }

      void trainingStore.createSegment(payload).then(() => onSaved?.());
    };

    return (
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <UxFormInputNumber
              formName="duration_minutes"
              label="Trajanje (min)"
              testId={`segment-duration-${segment?.id ?? "new"}`}
            />
          </Col>
        </Row>

        <Form.List name="exercises">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Row key={field.key} gutter={12} align="bottom">
                  <Col span={7}>
                    <UxFormScrollSelect
                      storeKey={`exercise-${segment?.id ?? "new"}-${field.key}`}
                      formName={[field.name, "exercise_option_id"]}
                      objName={[field.name, "exercise_option"]}
                      listName={"exercises"}
                      sifarnikName={SifarniciTypeEnum.EXERCISE_OPTION}
                      filtersForGet={{ segment_type: segmentType }}
                      label="Vežba"
                      rules={[REQUIRED_FIELD_RULE(true)]}
                      allowClear
                      testId={`exercise-option-${field.key}`}
                    />
                  </Col>
                  {metricFields.map((metric) => (
                    <Col key={metric} span={4}>
                      <UxFormInputNumber
                        formName={[field.name, metric]}
                        label={SEGMENT_METRIC_LABEL_MAP[metric]}
                        testId={`exercise-${metric}-${field.key}`}
                      />
                    </Col>
                  ))}
                  <Col>
                    <Form.Item>
                      <UxButton
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => {
                          remove(field.name);
                        }}
                        testId={`remove-exercise-${field.key}`}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
              <UxButton
                onClick={() => {
                  add();
                }}
                testId={`add-exercise-${segment?.id ?? "new"}`}
              >
                + Dodaj vežbu
              </UxButton>
            </>
          )}
        </Form.List>

        <Row gutter={16} className="mt-10">
          <Col span={24}>
            <UxFormTextArea
              formName="notes"
              label="Napomena"
              testId={`segment-notes-${segment?.id ?? "new"}`}
            />
          </Col>
        </Row>

        <Flex justify="end" className="mt-10">
          <UxButton
            type="primary"
            onClick={() => {
              form.submit();
            }}
            testId={`save-segment-${segment?.id ?? "new"}`}
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </Form>
    );
  },
);
