import { format, parseISO, isValid } from "date-fns";
import { date } from "zod";

export const handleDateFormat = (dateString: string): string => {
  if (!dateString) return dateString;
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return dateString;
    }
    return format(date, "MMMM d, yyyy");
  } catch {
    return dateString;
  }
};
