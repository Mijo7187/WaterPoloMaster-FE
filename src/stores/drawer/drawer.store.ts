import { makeAutoObservable } from "mobx";

import { DrawerTypeEnum } from "./drawer.types";

class DrawerStore {
  drawerListNames: DrawerTypeEnum[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  handleChange<K extends keyof DrawerStore>(key: K, value: this[K]): void {
    this[key] = value;
  }

  get getterDrawerListNames(): DrawerTypeEnum[] {
    return this.drawerListNames;
  }

  openDrawer = (drawerName: DrawerTypeEnum) => {
    if (this.getterDrawerListNames.includes(drawerName)) return;
    this.drawerListNames.push(drawerName);
  };

  clearDrawer = (name: DrawerTypeEnum) => {
    this.drawerListNames = this.drawerListNames.filter(
      (item) => (item as string) !== (name as string),
    );
  };

  removeAllDrawers = () => {
    this.drawerListNames = [];
  };
}

export const drawerStore = new DrawerStore();
