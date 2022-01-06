export function isReceiptInfoValid(info) {
  const {'date-day': dateDay, 'date-month':dateMonth, 'date-year':dateYear,
   'date-hour':dateHour, 'date-minute': dateMinute} = info;
  const string = [dateMonth, dateDay, dateYear].join("/") + " " + [dateHour,dateMinute].join(":");
  const date = new Date(string);
  if (date instanceof Date && isFinite(date)) {
    return true;
  }
  return false;
}
