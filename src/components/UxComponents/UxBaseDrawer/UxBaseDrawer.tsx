import { FC } from "react";

import { observer } from "mobx-react-lite";
import { drawerStore, DrawerTypeEnum } from "@stores";

import { UxDrawer } from "../UxDrawer/UxDrawer";

interface IUxBaseDrawerProps {
  name: DrawerTypeEnum;
  children: React.ReactNode;
  title?: string;
  onCancel?: () => void;
}

export const UxBaseDrawer: FC<IUxBaseDrawerProps> = observer(
  ({ name, children, title, onCancel }) => {
    return (
      <>
        {drawerStore.getterDrawerListNames.includes(name) && (
          <UxDrawer testId={name} title={title} onClose={onCancel}>
            {children}
          </UxDrawer>
        )}
      </>
    );
  },
);
