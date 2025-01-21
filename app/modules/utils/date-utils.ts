import moment from 'moment-timezone';

export function zeroPrefix(value: number | string): string {
  const numberValue = Number(value);

  if (numberValue < 10) {
    return `0${numberValue}`;
  }

  return value.toString();
}

export function getDateTimeLocalValue(date: Date): string {
  return `${date.getFullYear()}-${zeroPrefix(date.getMonth() + 1)}-${zeroPrefix(
    date.getDate()
  )}T${zeroPrefix(date.getHours())}:${zeroPrefix(date.getMinutes())}`;
}

// export class DateWithTimezone extends Date {
//   constructor(timeZone: string, ...args: ConstructorParameters<typeof Date>) {
//     super(...args);

//     const dateWithTimeZone = new Date(
//       this.toLocaleString('en-US', {
//         timeZone,
//       })
//     );

//     const diff = this.getTime() - dateWithTimeZone.getTime();

//     this.setTime(this.getTime() - diff);
//   }
// }

export class DateWithTimezone extends Date {
  constructor(timeZone: string, dateObj: Date, timeStr: string | number) {
    // Extract date parts from the Date object
    const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;

    // Combine date string and time string
    const dateTimeStr = `${dateStr} ${timeStr}`;

    // Convert the combined string to a Date object
    const localDate = new Date(dateTimeStr);

    // Get the local time with the specified time zone
    const dateWithTimeZone = new Date(
      localDate.toLocaleString('en-US', {
        timeZone,
      })
    );

    // Calculate the time difference
    // const diff = localDate.getTime() - dateWithTimeZone.getTime();

    // Adjust the Date object to account for the time zone difference
    // super(localDate.getTime() - diff);
    super(localDate);
  }
}

export function combineDateWithTime(date: Date, time: string): Date {
  // Split the time string into the main time part and the meridiem part (AM/PM).
  // const timeMatch = time.match(/^(\d{1,2}):(\d{2})\s?(am|pm)$/i);
  const timeMatch = time.match(/^\s*(\d{1,2})\s*:\s*(\d{2})\s*(am|pm)\s*$/i);
  if (!timeMatch) {
    throw new Error("Invalid time format. Expected format: 'hh:mm am/pm'");
  }

  let [, hourStr, minuteStr, meridiem] = timeMatch;
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  // Convert hours based on AM/PM
  if (meridiem.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (meridiem.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);

  return newDate;
}

export function createDateWithTimezone(date: Date, timeZone: string) {
  // Create a new Date object with the correct time zone
  const dateString = date?.toLocaleString('en-US', { timeZone });
  return new Date(dateString);
}

export const incrementTimeByMinutes = (time, minutes) => {
  const [hour, minute, period] = time.match(/(\d+):(\d+)\s(AM|PM)/).slice(1);
  const date = new Date();
  date.setHours(
    period === 'PM' ? (parseInt(hour, 10) % 12) + 12 : parseInt(hour, 10) % 12
  );
  date.setMinutes(parseInt(minute, 10) + minutes);
  const newHour = date.getHours() % 12 || 12;
  const newMinute = String(date.getMinutes()).padStart(2, '0');
  const newPeriod = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${newHour}:${newMinute} ${newPeriod}`;
};

export function formatTime(date, timeZone) {
  const dateWithTimeZone = createDateWithTimezone(date, timeZone);
  let hours = dateWithTimeZone.getHours();
  const minutes = dateWithTimeZone.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutesStr + ' ' + ampm;
}

export function endFormatTime(dateWithTimeZone) {
  let hours = dateWithTimeZone.getHours();
  const minutes = dateWithTimeZone.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutesStr + ' ' + ampm;
}

export function combineDateWithTimeAndTimezone(
  startDate,
  startTime,
  timezoneId
) {
  // Combine date and time into one Date object
  const combinedDateTime = combineDateWithTime(startDate, startTime);

  // Create a new date object with the specified timezone
  let timezoneDate = createDateWithTimezone(new Date(), timezoneId);
  const nowTimeStamp = timezoneDate.getTime();
  // Set the relevant fields for date and time in timezoneDate
  timezoneDate.setFullYear(combinedDateTime.getFullYear());
  timezoneDate.setMonth(combinedDateTime.getMonth()); // Month is 0-indexed
  timezoneDate.setDate(combinedDateTime.getDate());
  timezoneDate.setHours(
    combinedDateTime.getHours(),
    combinedDateTime.getMinutes(),
    0,
    0
  );
  const timeStamp = timezoneDate.getTime();

  // Format the time string in the correct format for moment.tz()
  const timeString = `${timezoneDate.getFullYear()}-${(timezoneDate.getMonth() + 1).toString().padStart(2, '0')}-${timezoneDate.getDate().toString().padStart(2, '0')} ${timezoneDate.getHours().toString().padStart(2, '0')}:${timezoneDate.getMinutes().toString().padStart(2, '0')}`;

  // Use moment.tz to apply the timezone
  let date = moment.tz(timeString, timezoneId);
  const utcDate = date.utc().format(); // Convert to UTC format

  return {
    date: timezoneDate,
    timeStamp: timeStamp,
    utc: utcDate,
    nowTimeStamp,
  };
}

export function createUtcWithTimeZone(date: Date, timeZone) {
  const timezoneDate =
    new Date(date) ?? createDateWithTimezone(new Date(), timeZone);

  const timeString = `${timezoneDate.getFullYear()}-${(timezoneDate.getMonth() + 1).toString().padStart(2, '0')}-${timezoneDate.getDate().toString().padStart(2, '0')} ${timezoneDate.getHours().toString().padStart(2, '0')}:${timezoneDate.getMinutes().toString().padStart(2, '0')}`;

  let momentDate = moment.tz(timeString, timeZone);
  return {
    utc: momentDate.utc().format(),
    date: timezoneDate,
  };
}
