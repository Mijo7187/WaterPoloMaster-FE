import React, { CSSProperties, ReactNode } from "react";

import clsx from "clsx";

export type ScrollDirection = "vertical" | "horizontal" | "both" | "none";

interface UxScrollDivProps {
  children: ReactNode;
  direction?: ScrollDirection; // default vertical
  height?: string | number; // px, %, vh...
  maxHeight?: string | number;
  className?: string;
  style?: CSSProperties;
}

export const UxScrollDiv: React.FC<UxScrollDivProps> = ({
  children,
  direction = "vertical",
  height,
  maxHeight,
  className,
  style,
}) => {
  const overflowStyles: CSSProperties = {
    overflowY:
      direction === "vertical" || direction === "both" ? "auto" : "hidden",
    overflowX:
      direction === "horizontal" || direction === "both" ? "auto" : "hidden",
    height,
    maxHeight,
    ...style,
  };

  return (
    <div className={clsx("scroll-container", className)} style={overflowStyles}>
      {children}
    </div>
  );
};
