import { FC } from "react";
import { useParams } from "react-router-dom";

import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";

// import { usersStore } from "@modules/users/users.store";
import { UserInfo } from "./components/UserInfo/UserInfo";

export const UserProfilePage: FC = observer(() => {
  const { id: idString } = useParams();
  const id = idString ? Number(idString) : undefined;
  return (
    <Row>
      {/* <Col span={24}>
        <h1 style={{ textAlign: "left" }}>
          {usersStore.getterUser.first_name} {usersStore.getterUser.last_name}
        </h1>
      </Col> */}
      <Col span={16}>
        <UserInfo userId={id} />
      </Col>
    </Row>
  );
});
