export function formatWithOffset(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ms = date.getMilliseconds();

    const pad = (n: number, width = 2) => n.toString().padStart(width, "0");

    const offsetMinutesFromUtc = -date.getTimezoneOffset(); // local - UTC
    const sign = offsetMinutesFromUtc >= 0 ? "+" : "-";
    const absOffset = Math.abs(offsetMinutesFromUtc);
    const offsetHours = Math.floor(absOffset / 60);
    const offsetMins = absOffset % 60;

    const base = `${year}-${pad(month)}-${pad(day)}T` +
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.` +
        pad(ms, 3);

    const offsetStr = `${sign}${pad(offsetHours)}:${pad(offsetMins)}`;
    return base + offsetStr;
}
