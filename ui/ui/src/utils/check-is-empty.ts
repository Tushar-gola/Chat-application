export function checkIsEmpty(value: any) {
  if (value === undefined || value === "" || value?.length === 0 || value === "undefined" || value === "NaN-NaN-NaN") {
    return true;
  }
  return false;
}

export function removeEmptyProperties(obj: any) {
  (Object.keys(obj) as Array<keyof typeof obj>).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      removeEmptyProperties(obj[key]);
    } else {
      if (obj[key] !== null && checkIsEmpty(obj[key])) {
        delete obj[key];
      }
    }
  });
}
