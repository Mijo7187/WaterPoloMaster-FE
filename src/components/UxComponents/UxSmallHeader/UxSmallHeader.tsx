import { FC } from "react";

import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";

import styles from "./UxSmallHeader.module.scss";

interface IUxSmallHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export const UxSmallHeader: FC<IUxSmallHeaderProps> = observer(
  ({ title, subtitle, rightContent }) => {
    return (
      <Row
        id="smallHeader"
        justify={"space-between"}
        align={"middle"}
        className={styles.smallHeaderWrapper}
      >
        <Col>
          <h3>{title}</h3>
          {subtitle && <h4>{subtitle}</h4>}
        </Col>

        {rightContent && <Col>{rightContent}</Col>}
      </Row>
    );
  },
);
