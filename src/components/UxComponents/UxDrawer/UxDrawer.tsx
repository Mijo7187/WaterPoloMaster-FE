import { Drawer as ANTDrawer, DrawerProps } from "antd";
import { observer } from "mobx-react-lite";
import { CloseOutlined } from "@ant-design/icons";

// import { UxButton } from "..";
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
        // title={
        //   <Flex>
        //     <UxButton
        //       // className={`${styles.closeBtn} }`}
        //       onClick={props.onClose}
        //       testId={"close-drawer"}
        //     />

        //     {props.title && <h3>{props.title}</h3>}
        //   </Flex>
        // }
        closable={true}
        closeIcon={<CloseOutlined className={styles.headerIcons} />}
        {...props}
        className={styles.wrapper}
        open={true}
      >
        {children}
      </ANTDrawer>
    );
  },
);
