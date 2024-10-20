export function findEmptyValues(arr: any[]) {
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];

    for (const key in obj) {
      if (obj[key] === '') {
        return i;
      }
    }
  }
  return -1;
}
