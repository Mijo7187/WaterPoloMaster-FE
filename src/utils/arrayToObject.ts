export const arrayToObject = <K extends string = string, I = unknown>(array: I[], accessor: keyof I = 'id' as keyof I): Record<K, I> => {
  return array.reduce((obj: Record<K, I>, item: I) => {
    obj[item[accessor] as unknown as K] = item;
    return obj;
  }, {} as Record<K, I>);
};
