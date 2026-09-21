import { ColumnsType } from "antd/es/table";
import {
  TRAINING_SEGMENT_LABEL_MAP,
  TRAINING_SEGMENT_OPTIONS,
} from "@modules/sifarnici/exerciseOption/exerciseOption.constants";
import {
  IGetExerciseOption,
  TrainingSegmentEnum,
} from "@modules/sifarnici/exerciseOption/exerciseOption.types";
import {
  FilterConfig,
  FilterTypeEnum,
  ICrudOptionsConfig,
  TypeOfFormEnum,
} from "@stores";
import {
  FILTER_IS_ACTIVE,
  FILTER_NAME,
  YES_NO_OPTIONS,
} from "@stores/filters/filtersOptions.constants";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

// #region Table
export const EXERCISE_OPTION_TABLE_COLUMNS =
  (): ColumnsType<IGetExerciseOption> => [
    {
      title: "Segment",
      width: 100,
      minWidth: 100,
      dataIndex: "segment_type",
      key: "segment_type",
      render: (value: TrainingSegmentEnum) => TRAINING_SEGMENT_LABEL_MAP[value],
    },
    // {
    //   title: "Šifra",
    //   width: 200,
    //   minWidth: 200,
    //   dataIndex: "code",
    //   key: "code",
    // },
    {
      title: "Naziv",
      width: 250,
      minWidth: 250,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Aktivan",
      width: 100,
      minWidth: 100,
      dataIndex: "is_active",
      key: "is_active",
      render: (value: boolean) => (value ? "Da" : "Ne"),
    },
  ];
// #endregion Table

// #region Form
export const EXERCISE_OPTION_FORM_FIELDS = (): ICrudOptionsConfig[] => {
  return [
    {
      typeOfForm: TypeOfFormEnum.SELECT,
      testId: "exercise-option-segment-type",
      formName: "segment_type",
      label: "Segment",
      options: TRAINING_SEGMENT_OPTIONS,
      rules: [REQUIRED_FIELD_RULE(true)],
    },
    // {
    //   typeOfForm: TypeOfFormEnum.INPUT,
    //   testId: "exercise-option-code",
    //   formName: "code",
    //   label: "Šifra",
    //   rules: [REQUIRED_FIELD_RULE(true)],
    // },
    {
      typeOfForm: TypeOfFormEnum.INPUT,
      testId: "exercise-option-name",
      formName: "name",
      label: "Naziv",
      rules: [REQUIRED_FIELD_RULE(true)],
    },
    {
      typeOfForm: TypeOfFormEnum.SWITCH,
      testId: "exercise-option-active",
      formName: "is_active",
      label: "Aktivan",
    },
  ];
};
// #endregion Form

// #region Filters
export const EXERCISE_OPTION_FILTER_FIELDS = (): FilterConfig[] => {
  return [
    {
      type: FilterTypeEnum.SELECT,
      testId: "exercise-option-segment-type",
      formName: "segment_type",
      label: "Segment",
      placeholder: "Svi segmenti",
      options: TRAINING_SEGMENT_OPTIONS,
      colSpan: 6,
    },
    {
      type: FilterTypeEnum.INPUT,
      testId: "exercise-option-code",
      formName: "code__ilike",
      label: "Šifra",
      colSpan: 6,
    },
    { ...FILTER_NAME, testId: "exercise-option-name", colSpan: 6 },
    {
      ...FILTER_IS_ACTIVE,
      testId: "exercise-option-active",
      label: "Aktivan",
      options: YES_NO_OPTIONS,
      colSpan: 6,
    },
  ];
};
// #endregion Filters
