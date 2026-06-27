// src/utils/dateUtils.ts

export const formatDateRange = (): string => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const start = today.toLocaleDateString("en-US", options);
  const end = nextWeek.toLocaleDateString("en-US", options);

  return `${start} - ${end}`;
};
