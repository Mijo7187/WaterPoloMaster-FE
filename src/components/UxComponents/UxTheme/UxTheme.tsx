import { FC, PropsWithChildren } from "react";

import { ConfigProvider } from "antd";

export const UxTheme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          fontFamily: "Montserrat",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
