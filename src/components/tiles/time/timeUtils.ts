type FetchTime = {
	failed: boolean;
	error: string | unknown;
	day?: number;
	month?: number;
	year?: number;
	hour?: number;
	minute?: number;
	seconds?: number;
};

export const fetchTime = async (timezone: string): Promise<FetchTime> => {
	try {
		const url: string = `https://timeapi.io/api/time/current/zone?timeZone=${encodeURIComponent(
			timezone
		)}`;

		const response: Response = await fetch(url);

		if (!response.ok) {
			throw new Error();
		}

		const data = await response.json();

		return {
			failed: false,
			error: '',
			day: data.day,
			month: data.month,
			year: data.year,
			hour: data.hour,
			minute: data.minute,
			seconds: data.seconds,
		};
	} catch (error) {
		return {
			failed: true,
			error: error,
		};
	}
};
