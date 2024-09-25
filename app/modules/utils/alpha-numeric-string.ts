export const makeAlphaNumeric = (s: string): string => {
  let result = '';
  for (let char of s) {
    if (char.match(/[a-z0-9]/i)) {
      result += char.toLowerCase();
    } else if (char === ' ') {
      result += '-';
    }
  }
  return result;
};
