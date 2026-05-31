import { beforeEach, describe, expect, it } from "vitest";

import { modalStore } from "./modal.store";
import { ModalTypeEnum } from "./modal.types";

beforeEach(() => {
  modalStore.removeAllModals();
});

describe("ModalStore – openModal", () => {
  it("adds a modal to the list", () => {
    modalStore.openModal(ModalTypeEnum.USER_MODAL);
    expect(modalStore.getterModalListNames).toContain(ModalTypeEnum.USER_MODAL);
  });

  it("does not add the same modal twice", () => {
    modalStore.openModal(ModalTypeEnum.USER_MODAL);
    modalStore.openModal(ModalTypeEnum.USER_MODAL);
    const count = modalStore.getterModalListNames.filter(
      (m) => m === ModalTypeEnum.USER_MODAL,
    ).length;
    expect(count).toBe(1);
  });

  it("can have multiple different modals open simultaneously", () => {
    modalStore.openModal(ModalTypeEnum.USER_MODAL);
    modalStore.openModal(ModalTypeEnum.COMPANY_MODAL);
    expect(modalStore.getterModalListNames).toHaveLength(2);
    expect(modalStore.getterModalListNames).toContain(ModalTypeEnum.USER_MODAL);
    expect(modalStore.getterModalListNames).toContain(
      ModalTypeEnum.COMPANY_MODAL,
    );
  });
});

describe("ModalStore – clearModal", () => {
  it("removes the specified modal from the list", () => {
    modalStore.openModal(ModalTypeEnum.USER_MODAL);
    modalStore.openModal(ModalTypeEnum.COMPANY_MODAL);
    modalStore.clearModal(ModalTypeEnum.USER_MODAL);
    expect(modalStore.getterModalListNames).not.toContain(
      ModalTypeEnum.USER_MODAL,
    );
    expect(modalStore.getterModalListNames).toContain(
      ModalTypeEnum.COMPANY_MODAL,
    );
  });

  it("does nothing when the modal is not in the list", () => {
    modalStore.openModal(ModalTypeEnum.COMPANY_MODAL);
    modalStore.clearModal(ModalTypeEnum.USER_MODAL);
    expect(modalStore.getterModalListNames).toHaveLength(1);
  });
});

describe("ModalStore – removeAllModals", () => {
  it("clears all open modals", () => {
    modalStore.openModal(ModalTypeEnum.USER_MODAL);
    modalStore.openModal(ModalTypeEnum.COMPANY_MODAL);
    modalStore.openModal(ModalTypeEnum.TRAINING_MODAL);
    modalStore.removeAllModals();
    expect(modalStore.getterModalListNames).toHaveLength(0);
  });
});

describe("ModalStore – getterModalListNames", () => {
  it("returns empty array after reset", () => {
    expect(modalStore.getterModalListNames).toEqual([]);
  });

  it("reflects current state accurately", () => {
    modalStore.openModal(ModalTypeEnum.SIFARNIK_MODAL);
    expect(modalStore.getterModalListNames).toEqual([
      ModalTypeEnum.SIFARNIK_MODAL,
    ]);
  });
});

describe("ModalStore – handleChange", () => {
  it("directly sets the modalListNames property", () => {
    modalStore.handleChange("modalListNames", [ModalTypeEnum.TRAINING_MODAL]);
    expect(modalStore.getterModalListNames).toEqual([
      ModalTypeEnum.TRAINING_MODAL,
    ]);
  });
});
