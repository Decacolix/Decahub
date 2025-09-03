import { WEEKDAYS_DEFAULT, WEEKDAYS_EN } from '../../../constants/weekdays';
import {
	getAnimationSettings,
	getLanguageSettings,
} from '../../options/settings/settingsUtils';
import sunImage from '../../../assets/weather/sun.gif';
import sunStaticImage from '../../../assets/weather/sun-static.svg';
import sunCloudImage from '../../../assets/weather/sun-cloud.gif';
import sunCloudStaticImage from '../../../assets/weather/sun-cloud-static.svg';
import cloudImage from '../../../assets/weather/cloud.gif';
import cloudStaticImage from '../../../assets/weather/cloud-static.svg';
import rainImage from '../../../assets/weather/rain.gif';
import rainStaticImage from '../../../assets/weather/rain-static.svg';
import snowImage from '../../../assets/weather/snow.gif';
import snowStaticImage from '../../../assets/weather/snow-static.svg';
import thunderImage from '../../../assets/weather/thunder.gif';
import thunderStaticImage from '../../../assets/weather/thunder-static.svg';

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

/* Fetch the information about selected location. */
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

/* Fetch the information about current weather and 3-day forecast. */
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

/* Set the names of the three forecast days. */
export const setForecastDays = (date: Date): string[] => {
	const currentDay = new Date(date).getDay();

	return Array.from({ length: 3 }, (_, i) => {
		const forecastDays = (((currentDay + 6) % 7) + i + 1) % 7;
		return getLanguageSettings() === 'cs'
			? WEEKDAYS_DEFAULT[forecastDays]
			: WEEKDAYS_EN[forecastDays];
	});
};

/* Set the image for the displayed weather. */
export const setImage = (code: number): string => {
	switch (code) {
		case 0:
			return getAnimationSettings() === 'on' ? sunImage : sunStaticImage;
			break;
		case 1:
		case 2:
		case 3:
			return getAnimationSettings() === 'on'
				? sunCloudImage
				: sunCloudStaticImage;
		case 45:
		case 48:
		case 51:
		case 53:
		case 55:
		case 56:
		case 57:
			return getAnimationSettings() === 'on' ? cloudImage : cloudStaticImage;
		case 61:
		case 63:
		case 65:
		case 66:
		case 67:
		case 80:
		case 81:
		case 82:
			return getAnimationSettings() === 'on' ? rainImage : rainStaticImage;
		case 71:
		case 73:
		case 75:
		case 77:
		case 85:
		case 86:
			return getAnimationSettings() === 'on' ? snowImage : snowStaticImage;
		case 95:
		case 96:
		case 99:
			return getAnimationSettings() === 'on'
				? thunderImage
				: thunderStaticImage;
		default:
			return '';
	}
};
