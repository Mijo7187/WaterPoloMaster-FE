import { FC, PropsWithChildren } from "react";

import { App, ConfigProvider } from "antd";

import { UxMessageBridge } from "../UxMessageBridge/UxMessageBridge";

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
      {/* component={false} mounts the App contexts (message/notification/modal)
          without an extra wrapper div, so no existing layout is disturbed. */}
      <App component={false}>
        <UxMessageBridge />
        {children}
      </App>
    </ConfigProvider>
  );
};
