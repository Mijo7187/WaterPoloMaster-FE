import { FC, ReactNode } from "react";

import { Col, ColProps, Form, FormInstance, FormProps, Row } from "antd";
import {
  UxFormDatePicker,
  UxFormInput,
  UxFormInputNumber,
  UxFormRangeDatePicker,
  UxFormScrollSelect,
  UxFormSelect,
} from "@components/UxFormComponents";
import { FilterConfig, FilterTypeEnum } from "@stores";
import {
  FILTER_DEFAULT_COL_SPAN,
  FILTER_DISPLAY_DATE_FORMAT,
} from "@stores/filters/filters.constants";

import styles from "./UxFilters.module.scss";

export interface IUxFiltersProps extends Omit<FormProps, "form"> {
  form: FormInstance;
  filterOptions: FilterConfig[];
  testId: string;
  /** formNames of fields not to render (e.g. fixed by the profile a tab lives in) */
  hiddenFields?: string[];
}

// strips layout-only keys so they don't reach the form field components
const toFieldProps = <T extends FilterConfig>(item: T) => {
  const {
    type: _type,
    colSpan: _colSpan,
    width: _width,
    isVisible: _isVisible,
    ...fieldProps
  } = item;
  return fieldProps;
};

const getColProps = ({ width, colSpan }: FilterConfig): ColProps => {
  if (width !== undefined) {
    return { flex: typeof width === "number" ? `${String(width)}px` : width };
  }
  return { span: colSpan ?? FILTER_DEFAULT_COL_SPAN };
};

const renderFilterField = (item: FilterConfig): ReactNode => {
  const testId = `filter-${item.testId}`;

  switch (item.type) {
    case FilterTypeEnum.INPUT:
      return <UxFormInput allowClear {...toFieldProps(item)} testId={testId} />;
    case FilterTypeEnum.INPUT_NUMBER:
      return <UxFormInputNumber {...toFieldProps(item)} testId={testId} />;
    case FilterTypeEnum.SELECT:
      return (
        <UxFormSelect allowClear {...toFieldProps(item)} testId={testId} />
      );
    case FilterTypeEnum.SCROLL_SELECT:
      return (
        <UxFormScrollSelect<unknown, object>
          allowClear
          {...toFieldProps(item)}
          testId={testId}
        />
      );
    case FilterTypeEnum.DATE:
      return (
        <UxFormDatePicker
          allowClear
          format={FILTER_DISPLAY_DATE_FORMAT}
          {...toFieldProps(item)}
          testId={testId}
        />
      );
    case FilterTypeEnum.RANGE_DATE: {
      const { rangeKeys: _rangeKeys, ...rangeProps } = toFieldProps(item);
      return (
        <UxFormRangeDatePicker
          allowClear
          format={FILTER_DISPLAY_DATE_FORMAT}
          {...rangeProps}
          testId={testId}
        />
      );
    }
  }
};

export const UxFilters: FC<IUxFiltersProps> = ({
  form,
  filterOptions,
  testId,
  hiddenFields = [],
  layout = "vertical",
  ...rest
}) => {
  const visibleOptions = filterOptions.filter(
    (item) =>
      item.isVisible !== false &&
      !hiddenFields.includes(String(item.formName)),
  );

  return (
    <Form
      id={`${testId}Filter`}
      data-testid={`filters-${testId}`}
      form={form}
      layout={layout}
      colon={false}
      className={styles.wrapper}
      {...rest}
    >
      <Row gutter={[16, 16]}>
        {visibleOptions.map((item) => (
          <Col {...getColProps(item)} key={String(item.formName)}>
            {renderFilterField(item)}
          </Col>
        ))}
      </Row>
    </Form>
  );
};
