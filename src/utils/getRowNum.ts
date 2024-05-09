export const getRowNum = (
  numOfItems: number,
  pageNum: number,
  rowIdx: number,
) => {
  return numOfItems - (pageNum - 1) * 5 - rowIdx
}
