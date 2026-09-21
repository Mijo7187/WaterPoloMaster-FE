import { FC } from "react";

import { Col, Collapse, Form, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { UxButton } from "@components/UxComponents";
import { UxFormSelect, UxFormTextArea } from "@components/UxFormComponents";
import { SPARRING_SIDE_OPTIONS } from "@modules/training/training.constants";
import { IPlayerOption } from "@modules/training/training.types";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

interface ISparringLineupProps {
  segmentKey: string;
  playerOptions: IPlayerOption[];
}

export const SparringLineup: FC<ISparringLineupProps> = ({
  segmentKey,
  playerOptions,
}) => {
  return (
    <Collapse
      ghost
      className="mt-10"
      items={[
        {
          key: "lineup",
          label: "Postava i napomena",
          children: (
            <>
              <Form.List name="participants">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Row key={field.key} gutter={12} align="bottom">
                        <Col span={10}>
                          <UxFormSelect
                            formName={[field.name, "user_id"]}
                            label="Igrač"
                            options={playerOptions}
                            rules={[REQUIRED_FIELD_RULE(true)]}
                            testId={`participant-user-${field.key}`}
                          />
                        </Col>
                        <Col span={8}>
                          <UxFormSelect
                            formName={[field.name, "side"]}
                            label="Strana"
                            options={SPARRING_SIDE_OPTIONS}
                            rules={[REQUIRED_FIELD_RULE(true)]}
                            testId={`participant-side-${field.key}`}
                          />
                        </Col>
                        <Col>
                          <Form.Item>
                            <UxButton
                              icon={<DeleteOutlined />}
                              danger
                              onClick={() => {
                                remove(field.name);
                              }}
                              testId={`remove-participant-${field.key}`}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                    <UxButton
                      onClick={() => {
                        add();
                      }}
                      testId={`add-participant-${segmentKey}`}
                    >
                      + Dodaj učesnika
                    </UxButton>
                  </>
                )}
              </Form.List>

              <Row gutter={16} className="mt-10">
                <Col span={24}>
                  <UxFormTextArea
                    formName="sparring_notes"
                    label="Napomena (sparing)"
                    testId={`sparring-notes-${segmentKey}`}
                  />
                </Col>
              </Row>
            </>
          ),
        },
      ]}
    />
  );
};
