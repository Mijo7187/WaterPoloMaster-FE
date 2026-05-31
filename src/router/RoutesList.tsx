import { Navigate, Route, Routes } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { AppLayout } from "@components/AppCompononets";
import { authStore } from "@modules/auth/auth.store";
import { LoginPage } from "@pages/LoginPage/LoginPage";

import { REDIRECT_ROUTES_MAP } from "./router.constants";
import { routerService } from "./router.service";
import { RoutePathsEnum } from "./router.types";

export const RoutesList = observer(() => {
  const routes = routerService.getRouterConfig(authStore.getAuthUserRoles);
  // const isLoggedIn = authStore.getAuthUser.user_id;

  if (!routes.length) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={<Navigate to={`/${RoutePathsEnum.LOGIN}`} replace />}
        />
      </Routes>
    );
  }

  const redirectRoute = REDIRECT_ROUTES_MAP[authStore.getAuthUserRoles[0]];
  return (
    <>
      <Routes>
        {/* Render routes available to all roles */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<AppLayout />}>
          {/* Redirect from root path */}
          <Route
            path="/"
            element={<Navigate to={`/${RoutePathsEnum.HOME_PAGE}`} replace />}
          />

          {/* Map all available routes */}
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* Catch all unknown routes */}
          <Route
            path="*"
            element={
              <Navigate
                to={routes.length ? redirectRoute : `/${RoutePathsEnum.LOGIN}`}
                replace
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
});
