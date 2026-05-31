import { makeAutoObservable } from "mobx";

import { ModalTypeEnum } from "./modal.types";

class ModalStore {
  modalListNames: ModalTypeEnum[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  handleChange<K extends keyof ModalStore>(key: K, value: this[K]): void {
    this[key] = value;
  }

  get getterModalListNames(): ModalTypeEnum[] {
    return this.modalListNames;
  }

  openModal = (modalName: ModalTypeEnum) => {
    if (this.getterModalListNames.includes(modalName)) return;
    this.modalListNames.push(modalName);
  };

  clearModal = (name: ModalTypeEnum) => {
    this.modalListNames = this.modalListNames.filter(
      (item) => (item as string) !== (name as string),
    );
  };

  removeAllModals = () => {
    this.modalListNames = [];
  };
}

export const modalStore = new ModalStore();
