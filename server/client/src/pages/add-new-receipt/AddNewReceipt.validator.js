export function isReceiptInfoValid(info) {
  const {name, address, 'date-day': dateDay, 'date-month':dateMonth, 'date-year':dateYear,
   'date-hour':dateHour, 'date-minute': dateMinute} = info;
  const string = [dateMonth, dateDay, dateYear].join("/") + " " + [dateHour,dateMinute].join(":");
  const date = new Date(string);
  if (date instanceof Date && isFinite(date)) {
    return true;
  }
  return false;
}

// 'date-day':"",
// 'date-month':"",
// 'date-year':"",
// 'date-hour':"",
// 'date-minute':"",