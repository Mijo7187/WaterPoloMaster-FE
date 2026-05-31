import { TabsTypeEnum } from "stores/tab/tab.types";
import { useSearchParams } from "react-router-dom";

export const useTabUrl = (name: TabsTypeEnum, initialValue: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeKey = searchParams.get(name) ?? initialValue;

  const setActiveKey = (key: string) => {
    setSearchParams(
      (prev) => {
        prev.set(name, key);
        return prev;
      },
      { replace: true },
    );
  };

  return { activeKey, setActiveKey };
};
