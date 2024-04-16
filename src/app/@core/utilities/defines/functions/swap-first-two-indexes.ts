export function swapFirstTwoIndexes(columnlocalized: any,language:string,firstIndex:number=0,secondIndex:number=1) {
  for (let key in columnlocalized) {
    if (columnlocalized.hasOwnProperty(key)) {
      const array = columnlocalized[key];
      if (array.length >= 2) {
        if (
          array[0].field
            .toLowerCase()
            .search(language) == -1
        )
          [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
      }
    }
  }
  return columnlocalized;
}
