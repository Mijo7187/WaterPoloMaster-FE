import { FC } from "react";

import { observer } from "mobx-react-lite";
import { drawerStore, DrawerTypeEnum } from "@stores";

import { IUxDrawerProps, UxDrawer } from "../UxDrawer/UxDrawer";

interface IUxBaseDrawerProps extends IUxDrawerProps {
  name: DrawerTypeEnum;
  children: React.ReactNode;
  onCancel?: () => void;
}

export const UxBaseDrawer: FC<IUxBaseDrawerProps> = observer(
  ({ name, children, title, onCancel, ...rest }) => {
    return (
      <>
        {drawerStore.getterDrawerListNames.includes(name) && (
          <UxDrawer title={title} onClose={onCancel} {...rest}>
            {children}
          </UxDrawer>
        )}
      </>
    );
  },
);
