import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
import { observer } from "mobx-react-lite";

import { AppHeader } from "./AppHeader/AppHeader";

import styles from "./AppLayout.module.scss";

const { Content } = Layout;

export const AppLayout: FC = observer(() => {
  return (
    <Layout className={styles.appWrapper}>
      <AppHeader />
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
});
