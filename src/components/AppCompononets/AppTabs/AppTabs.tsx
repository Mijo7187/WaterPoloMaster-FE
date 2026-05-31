import { FC } from "react";

import { UxTabs } from "@components/UxComponents";
import { IUxTabsProps, TabsTypeEnum } from "@stores";

// import { IUxTabsProps, UxTabs } from "components/UxComponents/UxTabs/UxTabs";
// import { TabsTypeEnum } from "stores/tab/tab.types";
import { useTabUrl } from "./useTabUrl";

interface IAppTabsProps extends IUxTabsProps {
  name: TabsTypeEnum;
}

export const AppTabs: FC<IAppTabsProps> = ({ name, items, ...rest }) => {
  const defaultKey = items?.length ? items[0].key : "";
  const { activeKey, setActiveKey } = useTabUrl(name, defaultKey);

  return (
    <UxTabs
      {...rest}
      testId={name}
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
    />
  );
};
