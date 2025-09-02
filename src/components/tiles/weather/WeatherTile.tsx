import { use, useEffect, useState } from 'react';
import { SettingsContext } from '../../../App';
import { fetchLocation, fetchWeather, type TypeWeather } from './weatherUtils';
import Loader from '../../layout/Loader';
import { WEEKDAYS_DEFAULT, WEEKDAYS_EN } from '../../../constants/weekdays';
import {
	getAnimationSettings,
	getLanguageSettings,
} from '../../options/settings/settingsUtils';

const setImage = (code: number): string => {
	switch (code) {
		case 0:
			return getAnimationSettings()
				? '/src/assets/weather/sun.gif'
				: '/src/assets/weather/sun-static.svg';
			break;
		case 1:
		case 2:
		case 3:
			return getAnimationSettings()
				? '/src/assets/weather/sun-cloud.gif'
				: '/src/assets/weather/sun-cloud-static.svg';
		case 45:
		case 48:
		case 51:
		case 53:
		case 55:
		case 56:
		case 57:
			return getAnimationSettings()
				? '/src/assets/weather/cloud.gif'
				: '/src/assets/weather/cloud-static.svg';
		case 61:
		case 63:
		case 65:
		case 66:
		case 67:
		case 80:
		case 81:
		case 82:
			return getAnimationSettings()
				? '/src/assets/weather/rain.gif'
				: '/src/assets/weather/rain-static.svg';
		case 71:
		case 73:
		case 75:
		case 77:
		case 85:
		case 86:
			return getAnimationSettings()
				? '/src/assets/weather/snow.gif'
				: '/src/assets/weather/snow-static.svg';
		case 95:
		case 96:
		case 99:
			return getAnimationSettings()
				? '/src/assets/weather/thunder.gif'
				: '/src/assets/weather/thunder-static.svg';
		default:
			return '';
	}
};

const setForecastDays = (date: Date): string[] => {
	const currentDay = new Date(date).getDay();

	return Array.from({ length: 3 }, (_, i) => {
		const forecastDays = (((currentDay + 6) % 7) + i + 1) % 7;
		return getLanguageSettings() === 'cs'
			? WEEKDAYS_DEFAULT[forecastDays]
			: WEEKDAYS_EN[forecastDays];
	});
};

const WeatherTile = () => {
	const { weatherLocation } = use(SettingsContext);
	const [weatherInfo, setWeatherInfo] = useState<TypeWeather>();
	const [isWeatherLoading, setisWeatherLoading] = useState<boolean>(true);

	useEffect(() => {
		setisWeatherLoading(true);

		const fetchWeatherOnLoad = async () => {
			await fetchLocation(weatherLocation.municipality).then(async location => {
				await fetchWeather(
					location.latitude as number,
					location.longitude as number
				).then(data => {
					setWeatherInfo(data);
					setisWeatherLoading(false);
				});
			});
		};

		fetchWeatherOnLoad();
	}, [weatherLocation]);

	return weatherInfo?.failed ? (
		<p className="p-4">
			{getLanguageSettings() === 'cs'
				? 'Nepodařilo se načíst počasí. Chyba: '
				: 'Could not load the weather. Error: ' + weatherInfo?.error}
		</p>
	) : isWeatherLoading ? (
		<Loader />
	) : (
		<div className="flex flex-col justify-between h-full w-full text-center">
			<div className="mt-6">
				<div className="flex justify-between items-center">
					<span className="ml-8 text-6xl font-bold">
						{getLanguageSettings() === 'cs'
							? weatherInfo?.current?.temperature
									.toFixed(1)
									.toString()
									.replace('.', ',')
							: weatherInfo?.current?.temperature.toFixed(1)}{' '}
						°C
					</span>
					<span className="mr-8 mt-2">
						<img
							className="w-22 "
							src={setImage(weatherInfo?.current?.code as number)}
						/>
					</span>
				</div>
				<div className="mt-4">
					<span>
						{getLanguageSettings() === 'cs' ? 'Vlhkost:' : 'Humidity:'}{' '}
						{weatherInfo?.current?.humidity} %
					</span>
					<span> &#9679; </span>
					<span>
						{getLanguageSettings() === 'cs' ? 'Vítr:' : 'Wind:'}{' '}
						{getLanguageSettings() === 'cs'
							? weatherInfo?.current?.wind.toString().replace('.', ',')
							: weatherInfo?.current?.wind}{' '}
						km/h
					</span>
				</div>
			</div>
			<div className="w-full ">
				{weatherInfo?.forecast?.time.map((time, i) => {
					return (
						<div
							className="flex justify-between items-center mt-2"
							key={time.toString()}
						>
							<div className="flex-col items-start justify-center text-left ml-8">
								<div>
									{setForecastDays(weatherInfo?.current?.time as Date)[i]}
								</div>
								<div className="text-2xl font-bold  text-left">
									{getLanguageSettings() === 'cs'
										? weatherInfo?.forecast?.temperature_min[i]
												.toFixed(1)
												.toString()
												.replace('.', ',')
										: weatherInfo?.forecast?.temperature_min[i].toFixed(1)}{' '}
									–{' '}
									{getLanguageSettings() === 'cs'
										? weatherInfo?.forecast?.temperature_max[i]
												.toFixed(1)
												.toString()
												.replace('.', ',')
										: weatherInfo?.forecast?.temperature_max[i].toFixed(1)}{' '}
									°C
								</div>
							</div>

							<div className="mr-8">
								<img
									className="w-12"
									src={setImage(weatherInfo?.forecast?.code[i] as number)}
								/>
							</div>
						</div>
					);
				})}
			</div>
			<div className="mb-6">{weatherLocation.municipality}</div>
		</div>
	);
};

export default WeatherTile;
