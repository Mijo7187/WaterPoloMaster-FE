import { FC, ReactNode, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { setDynamicHeight } from "@utils/setDynamicheight";

interface IUxDynamicScrollDivProps {
  wrapperId: string;
  idsToSubtract: string[];
  extraMinus?: number;
  children: ReactNode;
}

export const UxDynamicScrollDiv: FC<IUxDynamicScrollDivProps> = observer(
  ({ wrapperId, idsToSubtract, extraMinus, children }) => {
    useEffect(() => {
      const update = () => {
        setDynamicHeight(wrapperId, idsToSubtract, extraMinus);
      };

      update();
      window.addEventListener("resize", update);

      return () => {
        window.removeEventListener("resize", update);
      };
    }, [wrapperId, idsToSubtract, extraMinus]);

    return <div id={wrapperId}>{children}</div>;
  },
);
