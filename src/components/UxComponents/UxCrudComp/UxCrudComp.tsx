import { FC } from "react";

import { Col } from "antd";
import { observer } from "mobx-react-lite";
import {
  IUxFormDatePickerProps,
  IUxFormInputNumberProps,
  IUxFormInputProps,
  IUxFormScrollSelect,
  IUxFormSelectProps,
  IUxFormSwitchProps,
  IUxFormTextAreaProps,
  UxFormDatePicker,
  UxFormInput,
  UxFormInputNumber,
  UxFormScrollSelect,
  UxFormSelect,
  UxFormSwitch,
  UxFormTextArea,
} from "@components/UxFormComponents";
import { ICrudOptionsConfig, TypeOfFormEnum } from "@stores";

interface IUxCrudCompProps {
  item: ICrudOptionsConfig;
}

const renderFormComp = (item: ICrudOptionsConfig) => {
  switch (item.typeOfForm) {
    case TypeOfFormEnum.INPUT:
      return <UxFormInput {...(item as unknown as IUxFormInputProps)} />;
    case TypeOfFormEnum.INPUT_NUMBER:
      return (
        <UxFormInputNumber {...(item as unknown as IUxFormInputNumberProps)} />
      );
    case TypeOfFormEnum.SCROLL_SELECT:
      return (
        <UxFormScrollSelect
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(item as unknown as IUxFormScrollSelect<any, any>)}
        />
      );
    case TypeOfFormEnum.SELECT:
      return <UxFormSelect {...(item as unknown as IUxFormSelectProps)} />;
    case TypeOfFormEnum.DATE:
      return (
        <UxFormDatePicker {...(item as unknown as IUxFormDatePickerProps)} />
      );
    case TypeOfFormEnum.SWITCH:
      return <UxFormSwitch {...(item as unknown as IUxFormSwitchProps)} />;
    case TypeOfFormEnum.AREA:
      return <UxFormTextArea {...(item as unknown as IUxFormTextAreaProps)} />;
    default:
      return null;
  }
};

export const UxCrudComp: FC<IUxCrudCompProps> = observer(({ item }) => {
  if (item.hideInput) return null;

  const formComp = renderFormComp(item);

  return <Col span={item.colWidth ?? 24}>{formComp}</Col>;
});
