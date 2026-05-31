import { FC } from "react";

import { Col, Row } from "antd";

import styles from "./UxPageHeader.module.scss";

interface IUxPageHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export const UxPageHeader: FC<IUxPageHeaderProps> = ({
  title,
  subtitle,
  rightContent,
}) => {
  return (
    <Row
      id="pageHeader"
      justify={"space-between"}
      align={"middle"}
      className={styles.pageHeader}
    >
      <Col>
        <h1>{title}</h1>
        {subtitle && <h3>{subtitle}</h3>}
      </Col>

      {rightContent && <Col>{rightContent}</Col>}
    </Row>
  );
};
