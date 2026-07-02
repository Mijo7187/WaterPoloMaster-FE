import { FC } from "react";

import { IUxTabsProps, UxTabs } from "@components/UxComponents/UxTabs/UxTabs";
// import { TabsTypeEnum } from "@stores";

// import { useTabUrl } from "./useTabUrl";

// interface IUrlTabsProps extends IUxTabsProps {
// name: TabsTypeEnum;
//   // defaultValue: string;
// }

export const UrlTabs: FC<IUxTabsProps> = ({ ...rest }) => {
  // const { activeKey, setActiveKey } = useTabUrl(name, defaultValue);

  return <UxTabs {...rest} />;
};
