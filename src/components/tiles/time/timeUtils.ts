import { WEEKDAYS_DEFAULT, WEEKDAYS_EN } from '../../../constants/weekdays';
import { getLanguageSettings } from '../../options/settings/settingsUtils';

export type TypeFetchTime = {
	failed: boolean;
	error: string;
	day?: number;
	month?: number;
	year?: number;
	hour?: number;
	minute?: number;
	seconds?: number;
};

export type TypeFetchTimezone = {
	failed: boolean;
	error: string;
	timeZone?: string;
	currentUtcOffset?: number;
	standardUtcOffset?: number;
	isDayLightSavingActive?: boolean;
};

/*
 *	Function that fetches the current time based on the currently selected time zone.
 *	@param {string} timezone – The time zone.
 *	@returns {Promise<TypeRates>}
 */
export const fetchTime = async (timezone: string): Promise<TypeFetchTime> => {
	let result: TypeFetchTime = {
		failed: true,
		error: 'fetch',
	};

	await fetch(
		`https://timeapi.io/api/time/current/zone?timeZone=${encodeURIComponent(
			timezone
		)}`
	)
		.then(response => response.json())
		.then(data => {
			result = {
				failed: false,
				error: '',
				day: data.day,
				month: data.month,
				year: data.year,
				hour: data.hour,
				minute: data.minute,
				seconds: data.seconds,
			};
		})
		.catch(error => {
			result = {
				failed: true,
				error: error,
			};
		});

	return result;
};

/*
 *	Function that fetches the information abount the currently selected time zone.
 *	@param {string} timezone – The time zone.
 *	@returns {Promise<TypeFetchTimezone>}
 */
export const fetchTimezone = async (
	timezone: string
): Promise<TypeFetchTimezone> => {
	let result: TypeFetchTimezone = {
		failed: true,
		error: 'fetch',
	};

	await fetch(
		`https://timeapi.io/api/timezone/zone?timeZone=${encodeURIComponent(
			timezone
		)}`
	)
		.then(response => response.json())
		.then(data => {
			result = {
				failed: false,
				error: '',
				timeZone: data.timeZone,
				currentUtcOffset: data.currentUtcOffset.seconds,
				standardUtcOffset: data.standardUtcOffset.seconds,
				isDayLightSavingActive: data.isDayLightSavingActive,
			};
		})
		.catch(error => {
			result = {
				failed: true,
				error: error,
			};
		});

	return result;
};

/*
 *	Function to format the clock to the HH:MM format
 *	@param {number} hour – The hour.
 *	@param {number} minute – The minute.
 *	@param {number} seconds – The seconds.
 *	@returns {Promise<TypeFetchTimezone>}
 */
export const formatClock = (
	hour: number,
	minute: number,
	seconds: number
): string => {
	return `${hour.toString().padStart(2, '0')}:${minute
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/*
 *	Function to format the time zone to "UTC: -/+HH:MM" format (example: UTC: +02:00 or UTC: -07:00).
 *	@param {number | undefined} value – The value to be formatted.
 *	@returns {string}
 */
export const formatTimezone = (value: number | undefined): string => {
	if (!value) return '';

	const isNegative: boolean = value < 0 ? true : false;
	const utcNegative: string = 'UTC: -';
	const uctPositive: string = 'UTC: +';

	let convertedValue: string = (value / 3600).toString();

	if (isNegative) {
		convertedValue = convertedValue.substring(1);
	}

	if (convertedValue.includes('.')) {
		const index: number = convertedValue.indexOf('.');
		const resultLeft: string = convertedValue.slice(0, index);
		const resultRight: string = convertedValue.slice(index + 1);

		return (
			(isNegative ? utcNegative : uctPositive) +
			resultLeft.padStart(2, '0') +
			':' +
			(('.' + resultRight) as unknown as number) * 60
		);
	}

	return (
		(isNegative ? utcNegative : uctPositive) +
		convertedValue.padStart(2, '0') +
		':' +
		'00'
	);
};

/*
 *	Function to calculate the number of the current week.
 *	@param {Date} date – The date.
 *	@returns {number}
 */
export const getWeekNumber = (date: Date): number => {
	const firstYearDay: Date = new Date(date.getFullYear(), 0, 1);
	const today: Date = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	);
	const dayOfYear: number =
		(today.getTime() - firstYearDay.getTime() + 86400000) / 86400000;
	return Math.ceil(dayOfYear / 7);
};

/*
 *	Function to return the name of the weekday for current date.
 *	@param {Date} date – The date.
 *	@returns {string}
 */
export const getWeekday = (date: Date): string => {
	switch (date.getDay()) {
		case 0:
			return getLanguageSettings() === 'cs'
				? WEEKDAYS_DEFAULT[6]
				: WEEKDAYS_EN[6];
		case 1:
			return getLanguageSettings() === 'cs'
				? WEEKDAYS_DEFAULT[0]
				: WEEKDAYS_EN[0];
		case 2:
			return getLanguageSettings() === 'cs'
				? WEEKDAYS_DEFAULT[1]
				: WEEKDAYS_EN[1];

		case 3:
			return getLanguageSettings() === 'cs'
				? WEEKDAYS_DEFAULT[2]
				: WEEKDAYS_EN[2];

		case 4:
			return getLanguageSettings() === 'cs'
				? WEEKDAYS_DEFAULT[3]
				: WEEKDAYS_EN[3];

		case 5:
			return getLanguageSettings() === 'cs'
				? WEEKDAYS_DEFAULT[4]
				: WEEKDAYS_EN[4];

		case 6:
			return getLanguageSettings() === 'cs'
				? WEEKDAYS_DEFAULT[5]
				: WEEKDAYS_EN[5];

		default:
			return '';
	}
};
