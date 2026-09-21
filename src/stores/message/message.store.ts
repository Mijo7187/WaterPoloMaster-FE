import type { MessageInstance } from "antd/es/message/interface";

/**
 * Bridges antd's App.useApp() message instance to non-React modules — the axios
 * interceptor has no hooks available but still needs to show errors.
 *
 * Deliberately not a MobX store: nothing renders off it, and making a foreign
 * antd object observable would proxy it.
 */
class MessageStore {
  private instance: MessageInstance | null = null;

  register = (instance: MessageInstance) => {
    this.instance = instance;
  };

  unregister = () => {
    this.instance = null;
  };

  error = (content: string) => {
    // Before <App> mounts (or after it unmounts) there is nowhere to render.
    if (!this.instance) {
      console.error(content);
      return;
    }
    void this.instance.error(content);
  };
}

export const messageStore = new MessageStore();
