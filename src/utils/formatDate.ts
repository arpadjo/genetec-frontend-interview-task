export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const toDateTimeLocalValue = (date: string) => {
  const parsedDate = new Date(date);
  const timezoneOffset = parsedDate.getTimezoneOffset() * 60_000;

  return new Date(parsedDate.getTime() - timezoneOffset).toISOString().slice(0, 16);
};
