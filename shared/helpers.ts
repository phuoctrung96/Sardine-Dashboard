export const dedupeArrayObject = <T>(arr: T[], keys: Array<keyof T> = [], remoteEmptyObjects = false): T[] => {
  if (!arr?.length) {
    return [];
  }

  let newKeys = keys;
  if (!newKeys?.length) {
    newKeys = Object.keys(arr[0]) as Array<keyof T>;
  }

  const map = new Map();
  const result: T[] = [];

  arr.forEach((item) => {
    const key = newKeys.map((k) => item[k]).join("|");
    if (!map.has(key)) {
      map.set(key, true);
      result.push(item);
    }
  });

  return remoteEmptyObjects ? removeObjectsEmptyKeys(result) : result;
};

export const removeObjectsEmptyKeys = <T>(arr: T[]): T[] => {
  if (!arr?.length) {
    return [];
  }

  return arr.filter((item) => {
    const keys = Object.keys(item) as Array<keyof T>;
    const isEmptyObject = !item || keys.length === 0 || keys.every((key) => !item[key]);
    return !isEmptyObject;
  });
};

export const hideCharacters = (str: string, startPosition: number, endPosition: number): string => {
  if (startPosition > endPosition) {
    return str;
  }

  const end = endPosition > str.length ? str.length : endPosition;
  return str.substring(0, startPosition) + "•".repeat(end - startPosition) + str.substring(end);
};
