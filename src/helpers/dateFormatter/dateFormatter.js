import dateformat from 'dateformat';

export function convertDateFormater(date, format, mode) {
  if (mode === 'utcToLocal') {
    const localTime = new Date(date);
    const offset = new Date().getTimezoneOffset();
    const utcTime = new Date(localTime.getTime() + (offset * 60000));
    return dateformat(utcTime, format);
  }

  if (mode === 'localToUtc') {
    const utcTime = new Date(date);
    const offset = new Date().getTimezoneOffset();
    const localTime = new Date(utcTime.getTime() - (offset * 60000));
    return dateformat(localTime, format);
  }

  const time = new Date(date);
  return dateformat(time, format);
}

export function aptDateConverter(aptDate, aptTimeFrom, aptTimeTo) {
  if (aptDate && aptTimeFrom && aptTimeTo && (aptTimeFrom !== aptTimeTo)) {
    const dateFromString = `${aptDate}T${aptTimeFrom}Z`;
    const dateToString = `${aptDate}T${aptTimeTo}Z`;
    const formattedDate = `${convertDateFormater(dateFromString, 'mm/dd/yy, HH:MM', 'utcToLocal')} - ${convertDateFormater(dateToString, 'HH:MM', 'utcToLocal')}`;
    return formattedDate;
  } else if (aptTimeFrom) {
    const dateString = `${aptDate}T${aptTimeFrom}Z`;
    const formattedDate = `${convertDateFormater(dateString, 'mm/dd/yy, HH:MM', 'utcToLocal')}`;
    return formattedDate;
  }
  const formattedDate = `${convertDateFormater(aptDate, 'mm/dd/yy', 'utcToLocal')}`;
  return formattedDate;
}
