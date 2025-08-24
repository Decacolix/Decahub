import { use, useEffect, useState } from 'react';
import { WeatherLocationContext } from '../../../App';
import { fetchLocation, fetchWeather, type TypeWeather } from './weatherUtils';
import Loader from '../../layout/Loader';
import { WEEKDAYS } from '../../../constants/weekdays';

const setImage = (code: number): string => {
	switch (code) {
		case 0:
			return '/src/assets/weather/sun.gif';
			break;
		case 1:
		case 2:
		case 3:
			return '/src/assets/weather/sun-cloud.gif';
		case 45:
		case 48:
		case 51:
		case 53:
		case 55:
		case 56:
		case 57:
			return '/src/assets/weather/cloud.gif';
		case 61:
		case 63:
		case 65:
		case 66:
		case 67:
		case 80:
		case 81:
		case 82:
			return '/src/assets/weather/rain.gif';
		case 71:
		case 73:
		case 75:
		case 77:
		case 85:
		case 86:
			return '/src/assets/weather/snow.gif';
		case 95:
		case 96:
		case 99:
			return '/src/assets/weather/thunder.gif';
		default:
			return '';
	}
};

const setForecastDays = (date: Date): string[] => {
	const currentDay = new Date(date).getDay();

	return Array.from({ length: 3 }, (_, i) => {
		const forecastDays = (((currentDay + 6) % 7) + i + 1) % 7;
		return WEEKDAYS[forecastDays];
	});
};

const WeatherTile = () => {
	const { weatherLocation } = use(WeatherLocationContext);
	const [weatherInfo, setWeatherInfo] = useState<TypeWeather>();
	const [isWeatherLoading, setisWeatherLoading] = useState<boolean>(true);

	useEffect(() => {
		setisWeatherLoading(true);
		const fetchWeatherOnLoad = async () => {
			await fetchLocation(weatherLocation).then(async location => {
				await fetchWeather(
					location.latitude as number,
					location.longitude as number
				).then(data => {
					setWeatherInfo(data);
					setisWeatherLoading(false);
					console.log(setForecastDays(weatherInfo?.current?.time as Date)[0]);
				});
			});
		};

		fetchWeatherOnLoad();
	}, [weatherLocation]);

	return weatherInfo?.failed ? (
		<p className="p-4">
			{'Nepodařilo se načíst zprávy. Chyba: ' + weatherInfo?.error}
		</p>
	) : isWeatherLoading ? (
		<Loader size={7} />
	) : (
		<>
			<div className="flex justify-between items-center w-full">
				<span className="ml-8 text-6xl font-bold">
					{weatherInfo?.current?.temperature.toString().replace('.', ',')} °C
				</span>
				<span className="mr-8 mt-2">
					<img
						className="w-22 "
						src={setImage(weatherInfo?.current?.code as number)}
					/>
				</span>
			</div>
			<div className="mt-4">
				<span>Vlhkost: {weatherInfo?.current?.humidity} %</span>
				<span> &#9679; </span>
				<span>Vítr: {weatherInfo?.current?.wind} km/h</span>
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
									{weatherInfo?.forecast?.temperature_min[i]
										.toString()
										.replace('.', ',')}{' '}
									–{' '}
									{weatherInfo?.forecast?.temperature_max[i]
										.toString()
										.replace('.', ',')}{' '}
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
			<div>{weatherLocation}</div>
		</>
	);
};

export default WeatherTile;
