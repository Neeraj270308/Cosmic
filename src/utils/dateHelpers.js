/**
 * Date utility helpers for custom DatePicker calendar.
 */

/**
 * Checks if a given date object is in the past (before today).
 */
export const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  return targetDate < today;
};

/**
 * Formats a Date object or string as YYYY-MM-DD.
 */
export const formatDateString = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a YYYY-MM-DD string into a premium display format (e.g. "Monday, Jun 15, 2026").
 */
export const formatDisplayDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Gets the number of days in a specific month of a year.
 */
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Gets the starting day of the week (0-6) for a given month and year.
 */
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

/**
 * Generates an array representing the calendar grid for a given month and year.
 * Includes padding cells from the previous and next months for a complete grid.
 */
export const generateCalendarCells = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);
  
  const cells = [];
  
  // Padding cells from previous month
  const prevMonthIndex = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonthIndex);
  
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dateObj = new Date(prevYear, prevMonthIndex, day);
    cells.push({
      day,
      date: dateObj,
      isCurrentMonth: false,
      dateString: formatDateString(dateObj),
      isDisabled: isPastDate(dateObj)
    });
  }
  
  // Cells for the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    cells.push({
      day,
      date: dateObj,
      isCurrentMonth: true,
      dateString: formatDateString(dateObj),
      isDisabled: isPastDate(dateObj)
    });
  }
  
  // Padding cells from next month to round out the 6-row grid (42 cells)
  const remainingCells = 42 - cells.length;
  const nextMonthIndex = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  
  for (let day = 1; day <= remainingCells; day++) {
    const dateObj = new Date(nextYear, nextMonthIndex, day);
    cells.push({
      day,
      date: dateObj,
      isCurrentMonth: false,
      dateString: formatDateString(dateObj),
      isDisabled: isPastDate(dateObj)
    });
  }
  
  return cells;
};

/**
 * Get Month Names list.
 */
export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Get Weekday Names list.
 */
export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
