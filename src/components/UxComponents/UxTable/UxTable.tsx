import { ReactNode, useEffect } from "react";

import { Empty, Table, TableProps } from "antd";
import clsx from "clsx";
import { useScreenResize } from "@utils/index";

import { setTableHeight } from "./getTableScrollHeight";

import styles from "./UxTable.module.scss";

export interface IUxTableProps<
  T extends object = Record<string, unknown>,
> extends Omit<TableProps<T>, "className"> {
  testId: string;
  className?: string;
  scrollConfig?: string[];
  overrideHeight?: string;
}

export const UxTable = <T extends object = Record<string, unknown>>({
  testId,
  className,
  scrollConfig,
  overrideHeight,
  ...antTableProps
}: IUxTableProps<T>) => {
  // const { t } = useTranslation();
  const viewport = useScreenResize();

  useEffect(() => {
    setTableHeight(scrollConfig, overrideHeight);
  }, [viewport, scrollConfig, overrideHeight]);

  useEffect(() => {
    setTableHeight(scrollConfig, overrideHeight);
  }, []);

  const scrollY = overrideHeight
    ? `${overrideHeight}vh`
    : scrollConfig?.length
      ? "100vh"
      : undefined;

  const tableTestId = testId ? `table-${testId}` : undefined;
  const tableClassName = clsx(styles.table, className);

  const localeEmpty = {
    emptyText: (
      <Empty
        description={"Nema podataka"}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    ),
  };

  // Wrap each column's content in a <div> with explicit width and minWidth.
  // This is a Safari-specific fix — Safari ignores column width constraints
  // when using Ant Design Table. By wrapping the cell content, we ensure
  // proper column sizing across all browsers.
  const fixedColumns = antTableProps.columns?.map((column) => ({
    ...column,
    className: clsx(column.className, {
      [styles.actionsMenu]: column.key === "actions",
    }),
    render: (value: unknown, record: T, index: number) => {
      // const fixedValue = value ?? '/';
      const renderedValue = column.render
        ? column.render(value, record, index)
        : (value ?? "/");

      return (
        <div
          style={{
            minWidth: column.minWidth,
            width: column.width,
          }}
        >
          {renderedValue as ReactNode}
        </div>
      );
    },
  }));

  return (
    <Table<T>
      pagination={false}
      {...antTableProps}
      columns={fixedColumns}
      className={tableClassName}
      data-testid={tableTestId}
      locale={localeEmpty}
      scroll={
        scrollY
          ? { x: "max-content", y: scrollY, ...antTableProps.scroll }
          : { x: "max-content", ...antTableProps.scroll }
      }
      rowKey="id"
    />
  );
};
