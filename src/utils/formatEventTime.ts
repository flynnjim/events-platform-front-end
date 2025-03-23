export function formatEventTimeRange(
  start: string | number,
  end: string | number
): string {
  const startDate = new Date(
    typeof start === "number" ? start : Date.parse(start)
  );
  const endDate = new Date(typeof end === "number" ? end : Date.parse(end));

  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  function formatHour(date: Date): number {
    let hours = date.getHours();
    return hours % 12 || 12;
  }

  const weekday = startDate.toLocaleDateString(undefined, { weekday: "long" });
  const dayWithOrdinal = getOrdinalSuffix(startDate.getDate());
  const month = startDate.toLocaleDateString(undefined, { month: "long" });

  const startHour = formatHour(startDate);
  const endHour = formatHour(endDate);
  const startPeriod = startDate.getHours() >= 12 ? "pm" : "am";
  const endPeriod = endDate.getHours() >= 12 ? "pm" : "am";

  const timeRange = `${startHour}${startPeriod} to ${endHour}${endPeriod}`;

  return `${weekday} ${dayWithOrdinal} ${month} ${timeRange}`;
}
