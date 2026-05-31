import React from "react";

import { Modal as ANTModal, ModalProps } from "antd";

export interface IUxModalProps extends ModalProps {
  testId: string;
}

export const UxModal: React.FC<IUxModalProps> = ({ testId, ...props }) => {
  return <ANTModal {...props} data-testid={`${testId}-modal`} />;
};
