export const FormatDate = (date: string) => {
  const year = date.substring(0, 4);
  const month = parseInt(date.substring(5, 7));
  const daya = date.substring(8, 10);

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[month - 1]} ${daya}, ${year}`;
};
