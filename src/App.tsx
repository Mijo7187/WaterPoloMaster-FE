import { type FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { UxTheme } from "@components/UxComponents";
import { WithAxios } from "@config/axiosConfig";
import { RoutesList } from "@router/RoutesList";

import "./App.scss";

const App: FC = () => {
  return (
    <BrowserRouter>
      <WithAxios>
        <UxTheme>
          <RoutesList />
        </UxTheme>
      </WithAxios>
    </BrowserRouter>
  );
};

export default App;
