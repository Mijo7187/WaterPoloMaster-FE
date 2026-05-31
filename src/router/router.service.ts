import { UserRolesEnum } from "@modules/auth/auth.types";

import {
  ALL_ROUTE_CONFIG,
  AuthenticatedRoutePathsEnum,
  ROUTES_BY_ROLE,
} from "./router.constants";
import { IMenuType, IRoutesType } from "./router.types";

class RouterService {
  getUserRoutesEnum = (
    userRoles: UserRolesEnum[] | null,
  ): AuthenticatedRoutePathsEnum[] => {
    if (!userRoles || userRoles.length === 0) return [];

    const allEnums = userRoles.flatMap((role) => ROUTES_BY_ROLE[role]);

    return [...new Set(allEnums)];
  };

  getRouterConfig = (userRoles: UserRolesEnum[] | null): IRoutesType[] => {
    if (!userRoles || userRoles.length === 0) return [];

    return this.getUserRoutesEnum(userRoles).map((routeEnum) => {
      const { path, element, key } = ALL_ROUTE_CONFIG[routeEnum];
      return { path, element, key };
    });
  };

  getMenuConfig = (userRoles: UserRolesEnum[] | null): IMenuType[] => {
    if (!userRoles || userRoles.length === 0) return [];

    return this.getUserRoutesEnum(userRoles).reduce<IMenuType[]>(
      (acc, routeEnum) => {
        const { path, label, icon, children, subPath, key, hideInMenu } =
          ALL_ROUTE_CONFIG[routeEnum];
        if (hideInMenu) return acc;
        return [...acc, { path, label, icon, children, subPath, key }];
      },
      [],
    );
  };
}

export const routerService = new RouterService();
