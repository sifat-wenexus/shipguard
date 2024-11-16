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

export class DateWithTimezone extends Date {
  constructor(timeZone: string, ...args: ConstructorParameters<typeof Date>) {
    super(...args);

    const dateWithTimeZone = new Date(
      this.toLocaleString('en-US', {
        timeZone,
      })
    );

    const diff = this.getTime() - dateWithTimeZone.getTime();

    this.setTime(this.getTime() - diff);
  }
}
