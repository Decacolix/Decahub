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

export const formatClock = (
	hour: number,
	minute: number,
	seconds: number
): string => {
	return `${hour.toString().padStart(2, '0')}:${minute
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
