type TypeLocation = {
	failed: boolean;
	error: string;
	latitude?: number;
	longitude?: number;
	name?: string;
	country?: string;
};

export type TypeWeather = {
	failed: boolean;
	error: string;
	current?: {
		time: Date;
		temperature: number;
		humidity: number;
		wind: number;
		code: number;
	};
	forecast?: {
		time: Date[];
		temperature_max: number[];
		temperature_min: number[];
		code: number[];
	};
};

export const fetchLocation = async (
	location: string
): Promise<TypeLocation> => {
	let result: TypeLocation = {
		failed: true,
		error: 'fetch',
	};

	await fetch(
		`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
			location
		)}&count=1&language=cs&format=json`
	)
		.then(response => response.json())
		.then(data => {
			result = {
				failed: false,
				error: '',
				latitude: data.results[0].latitude,
				longitude: data.results[0].longitude,
				name: data.results[0].name,
				country: data.results[0].country,
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

export const fetchWeather = async (
	latitude: number,
	longitude: number
): Promise<TypeWeather> => {
	let result: TypeWeather = {
		failed: true,
		error: 'fetch',
	};

	await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
			latitude
		)}&longitude=${encodeURIComponent(
			longitude
		)}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&forecast_days=3`
	)
		.then(response => response.json())
		.then(data => {
			result = {
				failed: false,
				error: '',
				current: {
					time: data.current.time,
					temperature: data.current.temperature_2m,
					humidity: data.current.relative_humidity_2m,
					wind: data.current.wind_speed_10m,
					code: data.current.weather_code,
				},
				forecast: {
					time: [data.daily.time[0], data.daily.time[1], data.daily.time[2]],
					temperature_max: [
						data.daily.temperature_2m_max[0],
						data.daily.temperature_2m_max[1],
						data.daily.temperature_2m_max[2],
					],
					temperature_min: [
						data.daily.temperature_2m_min[0],
						data.daily.temperature_2m_min[1],
						data.daily.temperature_2m_min[2],
					],
					code: [
						data.daily.weather_code[0],
						data.daily.weather_code[1],
						data.daily.weather_code[2],
					],
				},
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
