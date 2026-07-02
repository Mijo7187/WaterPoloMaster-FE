import { beforeEach, describe, expect, it } from "vitest";

import { drawerStore } from "./drawer.store";
import { DrawerTypeEnum } from "./drawer.types";

beforeEach(() => {
  drawerStore.removeAllDrawers();
});

describe("DrawerStore – openDrawer", () => {
  it("adds a drawer to the list", () => {
    drawerStore.openDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    expect(drawerStore.getterDrawerListNames).toContain(
      DrawerTypeEnum.TRAINING_USERS_DRAWER,
    );
  });

  it("does not add the same drawer twice", () => {
    drawerStore.openDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    drawerStore.openDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    const count = drawerStore.getterDrawerListNames.filter(
      (d) => d === DrawerTypeEnum.TRAINING_USERS_DRAWER,
    ).length;
    expect(count).toBe(1);
  });

  it("can have multiple different drawers open simultaneously", () => {
    drawerStore.openDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    drawerStore.openDrawer(DrawerTypeEnum.PAYMENT_DRAWER);
    expect(drawerStore.getterDrawerListNames).toHaveLength(2);
    expect(drawerStore.getterDrawerListNames).toContain(
      DrawerTypeEnum.TRAINING_USERS_DRAWER,
    );
    expect(drawerStore.getterDrawerListNames).toContain(
      DrawerTypeEnum.PAYMENT_DRAWER,
    );
  });
});

describe("DrawerStore – clearDrawer", () => {
  it("removes the specified drawer from the list", () => {
    drawerStore.openDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    drawerStore.openDrawer(DrawerTypeEnum.PAYMENT_DRAWER);
    drawerStore.clearDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    expect(drawerStore.getterDrawerListNames).not.toContain(
      DrawerTypeEnum.TRAINING_USERS_DRAWER,
    );
    expect(drawerStore.getterDrawerListNames).toContain(
      DrawerTypeEnum.PAYMENT_DRAWER,
    );
  });

  it("does nothing when the drawer is not in the list", () => {
    drawerStore.openDrawer(DrawerTypeEnum.PAYMENT_DRAWER);
    drawerStore.clearDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    expect(drawerStore.getterDrawerListNames).toHaveLength(1);
  });
});

describe("DrawerStore – removeAllDrawers", () => {
  it("clears all open drawers", () => {
    drawerStore.openDrawer(DrawerTypeEnum.TRAINING_USERS_DRAWER);
    drawerStore.openDrawer(DrawerTypeEnum.PAYMENT_DRAWER);
    drawerStore.openDrawer(DrawerTypeEnum.TOURNAMENT_USERS_DRAWER);
    drawerStore.removeAllDrawers();
    expect(drawerStore.getterDrawerListNames).toHaveLength(0);
  });
});

describe("DrawerStore – getterDrawerListNames", () => {
  it("returns empty array after reset", () => {
    expect(drawerStore.getterDrawerListNames).toEqual([]);
  });

  it("reflects current open drawers", () => {
    drawerStore.openDrawer(DrawerTypeEnum.TOURNAMENT_USERS_DRAWER);
    expect(drawerStore.getterDrawerListNames).toEqual([
      DrawerTypeEnum.TOURNAMENT_USERS_DRAWER,
    ]);
  });
});

describe("DrawerStore – handleChange", () => {
  it("directly sets the drawerListNames property", () => {
    drawerStore.handleChange("drawerListNames", [
      DrawerTypeEnum.TRAINING_USERS_DRAWER,
    ]);
    expect(drawerStore.getterDrawerListNames).toEqual([
      DrawerTypeEnum.TRAINING_USERS_DRAWER,
    ]);
  });
});
