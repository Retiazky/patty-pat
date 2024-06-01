export const formatDate = (datetime: number): string => {
  const date = new Date(datetime);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
