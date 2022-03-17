export const dedupeArrayObject = <T>(arr: T[], keys: Array<keyof T> = []): T[] => {
  const map = new Map();
  const result: T[] = [];

  arr.forEach((item) => {
    const key = keys.map((k) => item[k]).join("|");
    if (!map.has(key)) {
      map.set(key, true);
      result.push(item);
    }
  });

  return result;
};

export const hideCharacters = (str: string, startPosition: number, endPosition: number): string => {
  if (startPosition > endPosition) {
    return str;
  }

  const end = endPosition > str.length ? str.length : endPosition;
  return str.substring(0, startPosition) + "•".repeat(end - startPosition) + str.substring(end);
};
