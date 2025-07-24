import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";

// Configure Day.js plugins and locale
dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.locale("pl");

export { Dayjs, dayjs as default };
export type { Dayjs as DateType };

// Date format constants
export const DayFormat = "YYYY-MM-DD";

// Helper functions for common operations
export const dateUtils = {
  // Create dayjs instance
  create: (date?: string | Date | Dayjs) => dayjs(date),

  // Current date/time
  now: () => dayjs(),

  // Format date
  format: (date: string | Date | Dayjs, format: string) =>
    dayjs(date).format(format),

  // Start/end of periods
  startOfMonth: (date: string | Date | Dayjs) => dayjs(date).startOf("month"),
  endOfMonth: (date: string | Date | Dayjs) => dayjs(date).endOf("month"),
  startOfWeek: (date: string | Date | Dayjs) => dayjs(date).startOf("week"),
  endOfWeek: (date: string | Date | Dayjs) => dayjs(date).endOf("week"),

  // Date comparisons
  isSame: (
    date1: string | Date | Dayjs,
    date2: string | Date | Dayjs,
    unit?: string
  ) => dayjs(date1).isSame(dayjs(date2), unit as any),
  isSameOrBefore: (
    date1: string | Date | Dayjs,
    date2: string | Date | Dayjs,
    unit?: string
  ) => dayjs(date1).isSameOrBefore(dayjs(date2), unit as any),

  // Date arithmetic
  add: (date: string | Date | Dayjs, amount: number, unit: string) =>
    dayjs(date).add(amount, unit as any),
  subtract: (date: string | Date | Dayjs, amount: number, unit: string) =>
    dayjs(date).subtract(amount, unit as any),
};
