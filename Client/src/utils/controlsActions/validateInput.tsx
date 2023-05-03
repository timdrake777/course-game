export const validateInput = (inputString: string): boolean => {
  if (inputString === "") {
    return false;
  }
  return !/^[a-zа-я]*\.[a-zа-я]*\([0-9]*\)$/i.test(inputString);
};
