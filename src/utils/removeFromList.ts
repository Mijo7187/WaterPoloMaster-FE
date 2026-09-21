export const removeFromList = <T = object>(
  list: T[],
  value: number | string,
  acc: keyof T = "id" as keyof T,
) => {
  return list.filter((item) => item[acc] !== value);
};
