export function parseDate(dateString: string): Date | null {
  const dt = new Date(dateString);

  if (isNaN(dt.getTime())) {
    throw new Error("Invalid date");
  }

  return dt;
}
