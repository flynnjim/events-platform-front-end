function formatDateForLink(date: Date): string {
  return (
    date
      .toISOString()
      .replace(/-|:|\.\d+/g, "")
      .slice(0, 15) + "Z"
  );
}

/**
 * Generates a Google Calendar URL with pre-filled event details.
 *
 * @param title - The title of the event.
 * @param description - The description of the event.
 * @param location - The event location.
 * @param start - The event start time as a Date object.
 * @param end - The event end time as a Date object.
 * @returns A URL string that opens Google Calendar with the event details.
 */
export function getGoogleCalendarLink(
  title: string,
  description: string,
  location: string,
  start: Date,
  end: Date
): string {
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
    location
  )}&dates=${formatDateForLink(start)}/${formatDateForLink(end)}`;
}
