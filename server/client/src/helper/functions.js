export function isEmptyObject(object){
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      return false;
    }
  }
  return true;
}