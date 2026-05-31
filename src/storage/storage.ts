const storagePrefix = "react_wm_";

// here goes enum types for storage
export enum StorageEnum {
  AUTH_USER = "AUTH_USER",
  AUTH_USER_INFO = "AUTH_USER_INFO",
}

const storage = {
  setItem: (key: StorageEnum, value: string) => {
    window.localStorage.setItem(`${storagePrefix}${key}`, value);
  },

  getItem: (key: StorageEnum) => {
    return window.localStorage.getItem(`${storagePrefix}${key}`);
  },

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  setData: <T>(key: StorageEnum, value: T | null) => {
    window.localStorage.setItem(
      `${storagePrefix}${key}`,
      JSON.stringify(value),
    );
  },

  getData: (key: StorageEnum) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-non-null-assertion
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}${key}`)!);
  },

  removeData: (key: StorageEnum) => {
    window.localStorage.removeItem(`${storagePrefix}${key}`);
  },
};

export default storage;
