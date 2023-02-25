export const dateToString = (date: Date): string => {
  return (
    date.getFullYear().toString() +
    '.' +
    (date.getMonth() + 1).toString() +
    '.' +
    date.getDate().toString()
  )
}
