import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import { UxMenu } from "@components/UxComponents/UxMenu/UxMenu";
import { authStore } from "@modules/auth/auth.store";
import { routerService } from "@router/router.service";
import { IMenuType, RoutePathsEnum } from "@router/router.types";

import styles from "./AppNav.module.scss";

export const AppNav: FC = observer(() => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const userRoles = authStore.getAuthUserRoles;
  const menuConfig = routerService.getMenuConfig(userRoles);
  const selectedItem = menuConfig.find((item: IMenuType) =>
    pathName.includes(item.path),
  );

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const menuItem = menuConfig.find(
      (sidebarItem) => (e.key as RoutePathsEnum) === sidebarItem.key,
    );
    if (menuItem) {
      const pathName = menuItem.path;
      void navigate(`/${pathName}`);
    }
  };

  return (
    <div className={styles.container}>
      <UxMenu
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          paddingTop: "50px",
        }}
        theme="light"
        mode="inline"
        selectedKeys={[selectedItem?.key ?? ""]}
        onClick={handleMenuClick}
        className={styles.menu}
        items={menuConfig.map((route: IMenuType) => {
          return {
            key: route.key,
            icon: route.icon,
            label: route.label,
            style: { paddingLeft: 8, fontSize: 16 },
          };
        })}
        testId={"nav-bar"}
      />
    </div>
  );
});
