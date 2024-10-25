export const toggleSet = <T>(set: Set<T>, value: T): Set<T> => {
  const newSet = new Set(set);
  if (newSet.has(value)) {
    newSet.delete(value);
  } else {
    newSet.add(value);
  }
  return newSet;
};
export const parseInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { type, value } = e.target;
  const parsedValue = type === 'number' ? Number(value.replace(/[^0-9]/g, '')) : value;
  e.target.value = parsedValue.toString();

  return parsedValue;
};
