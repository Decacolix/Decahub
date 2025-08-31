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
