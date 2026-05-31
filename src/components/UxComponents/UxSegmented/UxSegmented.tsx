import { Segmented as ANTSegmented, SegmentedProps } from "antd";

export interface IUxSegmentedProps extends SegmentedProps {
  name: string;
}

export const UxSegmented: React.FC<IUxSegmentedProps> = (props) => {
  return (
    <ANTSegmented
      {...props}
      data-testid={`${props.name}-segmented`}
      autoComplete="off"
    />
  );
};
