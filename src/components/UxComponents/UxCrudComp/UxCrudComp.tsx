import { FC } from "react";

import { observer } from "mobx-react-lite";
import { ICrudOptionsConfig } from "@stores";

interface IUxCrudCompProps {
  item: ICrudOptionsConfig;
}

export const UxCrudComp: FC<IUxCrudCompProps> = observer(({ item }) => {
  return <>{item.typeOfForm}</>;
});
