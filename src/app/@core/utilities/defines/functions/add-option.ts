export function addOption(array: any[],data:any, itemName: string,) {
  let valueKey = `${itemName}Id`;
  let checkExist = array.some((obj) => obj.id === data[valueKey]);
  if (!checkExist) {
    console.log('checkExist', checkExist);
    array.push({ id: data[valueKey], name: data[itemName] });
  }
}
