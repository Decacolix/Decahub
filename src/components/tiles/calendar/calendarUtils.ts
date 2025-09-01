import { getThemeSettings } from '../../options/settings/settingsUtils';

export const calculateYearRange = (year: number): number => {
	return year >= 4 ? year - ((year % 12) - 4) : year - ((year % 12) + 8);
};

export const getCurrentMonthDays = (
	currentMonth: number,
	currentYear: number
): number => {
	return new Date(currentYear, currentMonth + 1, 0).getDate();
};

export const getPreviousMonthDays = (
	currentMonth: number,
	currentYear: number
): number => {
	currentMonth = currentMonth === -1 ? 11 : currentMonth;
	return new Date(currentYear, currentMonth, 0).getDate();
};

export const getCurrentMonthFirstWeekday = (
	currentMonth: number,
	currentYear: number
): number => {
	return new Date(currentYear, currentMonth, 1).getDay();
};

export const getBackgroundColor = (): { name: string; hex: string } => {
	const theme: string = getThemeSettings();

	if (theme === 'pink') return { name: 'bg-pink-500', hex: '#f6339a' };
	if (theme === 'green') return { name: 'bg-green-600', hex: '#00a63e' };
	if (theme === 'blue') return { name: 'bg-blue-600', hex: '#155dfc' };

	return { name: '', hex: '' };
};
