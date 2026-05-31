import { FC } from "react";
import { Link } from "react-router-dom";

import { Header } from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { RoutePathsEnum } from "@router/router.types";

import { AppNav } from "../AppNav/AppNav";

import styles from "./AppHeader.module.scss";

export const AppHeader: FC = observer(() => {
  return (
    <div className={styles.container} id="appHeader">
      <Header className={styles.header}>
        <Link
          style={{ display: "flex", width: "200px", textAlign: "center" }}
          to={`/${RoutePathsEnum.HOME_PAGE}`}
          className={styles.logoWrapper}
        >
          Waterpolo Masters
        </Link>

        <AppNav />
      </Header>
    </div>
  );
});
