import { List as ANTList, ListProps } from "antd";

interface IUxListProps<T> extends ListProps<T> {
  name: string;
}

export const UxList = <T extends {}>(props: IUxListProps<T>) => {
  return <ANTList<T> {...props} data-testid={`${props.name}-list`} />;
};
