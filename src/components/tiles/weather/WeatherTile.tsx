import { use, useEffect, useState } from 'react';
import { SettingsContext } from '../../../App';
import {
	fetchLocation,
	fetchWeather,
	setForecastDays,
	setImage,
	type TypeWeather,
} from './weatherUtils';
import Loader from '../../layout/Loader';
import { getLanguageSettings } from '../../options/settings/settingsUtils';

/* Weather tile displaying the information about the current weather and 3-day forecast based on the selected location. */
const WeatherTile = () => {
	const { weatherLocation } = use(SettingsContext);
	const [weatherInfo, setWeatherInfo] = useState<TypeWeather>();
	const [isWeatherLoading, setisWeatherLoading] = useState<boolean>(true);

	/* Fetch the weather date on change of the weather location. */
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
			{(getLanguageSettings() === 'cs'
				? 'Nepodařilo se načíst počasí. Chyba: '
				: 'Could not load the weather. Error: ') + weatherInfo?.error}
		</p>
	) : isWeatherLoading ? (
		<Loader />
	) : (
		<div className="flex flex-col justify-between h-full w-full text-center">
			<div className="mt-6">
				<div className="flex justify-between items-center">
					<span className="ml-8 text-5xl 2xl:text-6xl font-bold">
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
