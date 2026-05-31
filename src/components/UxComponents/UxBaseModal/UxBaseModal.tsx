import { FC } from "react";

import { observer } from "mobx-react-lite";
import { modalStore, ModalTypeEnum } from "@stores";

import { IUxModalProps, UxModal } from "../UxModal/UxModal";

interface IUxBaseModalProps extends Omit<IUxModalProps, "testId"> {
  name: ModalTypeEnum;
  children: React.ReactNode;
}

export const UxBaseModal: FC<IUxBaseModalProps> = observer(
  ({ name, children, ...rest }) => {
    return (
      <>
        {modalStore.getterModalListNames.includes(name) && (
          <UxModal
            {...rest}
            testId={`ux-base-modal-${name}`}
            onCancel={(e) => {
              modalStore.clearModal(name);
              rest.onCancel?.(e);
            }}
            open={true}
            closable={true}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
            footer={null}
            mask={{ closable: true }}
            modalRender={(children) => children}
          >
            {children}
          </UxModal>
        )}
      </>
    );
  },
);
