import { FC, useEffect } from "react";

import { App } from "antd";
import { messageStore } from "@stores/message/message.store";

/**
 * Renders nothing — it only publishes antd's message API to messageStore so
 * non-React code (the axios interceptor) can show toasts. Must live inside <App>.
 */
export const UxMessageBridge: FC = () => {
  const { message } = App.useApp();

  useEffect(() => {
    messageStore.register(message);
    return () => {
      messageStore.unregister();
    };
  }, [message]);

  return null;
};
