import { Drawer as ANTDrawer, DrawerProps } from "antd";
import { observer } from "mobx-react-lite";
import { CloseOutlined } from "@ant-design/icons";

import { UxButton } from "..";

import styles from "./UxDrawer.module.scss";

export interface IUxDrawerProps extends DrawerProps {
  testId: string;
  children: React.ReactNode;
}

export const UxDrawer: React.FC<IUxDrawerProps> = observer(
  ({ children, testId, ...props }) => {
    return (
      <ANTDrawer
        data-testid={testId}
        title={false}
        closable={false}
        {...props}
        className={styles.wrapper}
        open={true}
      >
        <UxButton
          className={`${styles.closeBtn} }`}
          onClick={props.onClose}
          testId={"close-drawer"}
        >
          <CloseOutlined className={styles.headerIcons} />
        </UxButton>
        {children}
      </ANTDrawer>
    );
  },
);
