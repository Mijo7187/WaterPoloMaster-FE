import { Table as ANTTable, TableProps } from "antd";

export interface IUxTableProps<T> extends TableProps<T> {
  testId: string;
}

export const UxTable = <T,>({ testId, ...props }: IUxTableProps<T>) => {
  return (
    <ANTTable<T>
      {...props}
      dataSource={[...(props.dataSource ?? [])]}
      rowKey={props.rowKey ?? "id"}
      data-testid={`${testId}-table`}
      {...props}
    />
  );
};
