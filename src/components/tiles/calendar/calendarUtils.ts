import { getThemeSettings } from '../../options/settings/settingsUtils';

/* Calculate the range of 12 years, starting with the year 1900 (the first range is from 1900 to 1911, the second from 1912 to 1923, etc.) */
export const calculateYearRange = (year: number): number => {
	return year >= 4 ? year - ((year % 12) - 4) : year - ((year % 12) + 8);
};

/* Get the number of days for the displayed month. */
export const getCurrentMonthDays = (
	currentMonth: number,
	currentYear: number
): number => {
	return new Date(currentYear, currentMonth + 1, 0).getDate();
};

/* Get the last day of the previous month for the displayed month. */
export const getPreviousMonthDays = (
	currentMonth: number,
	currentYear: number
): number => {
	currentMonth = currentMonth === -1 ? 11 : currentMonth;
	return new Date(currentYear, currentMonth, 0).getDate();
};

/* Get the weekday of the first day for the displayed month. */
export const getCurrentMonthFirstWeekday = (
	currentMonth: number,
	currentYear: number
): number => {
	return new Date(currentYear, currentMonth, 1).getDay();
};

/* Get the background color for the day info box, based on the current theme. */
export const getBackgroundColor = (): { name: string; hex: string } => {
	const theme: string = getThemeSettings();

	if (theme === 'pink') return { name: 'bg-pink-500', hex: '#f6339a' };
	if (theme === 'green') return { name: 'bg-green-600', hex: '#00a63e' };
	if (theme === 'blue') return { name: 'bg-blue-600', hex: '#155dfc' };

	return { name: '', hex: '' };
};
