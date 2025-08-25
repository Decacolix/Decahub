import { use, useState } from 'react';
import { WeatherLocationContext } from '../../../App';
import { fetchLocation } from '../../tiles/weather/weatherUtils';
import { setLocationSettings, type TypeLocation } from './settingsUtils';

const SettingsWeather = () => {
	const { weatherLocation, setWeatherLocation } = use(WeatherLocationContext);
	const [locationInput, setLocationInput] = useState<string>('');
	const [locationInformation, setLocationInformation] = useState<string>(
		`Aktuální lokalita: ${weatherLocation.municipality}, ${weatherLocation.country}`
	);

	const handleLocationChange = async (): Promise<void> => {
		setLocationInput('');
		await fetchLocation(locationInput).then(async location => {
			if (location.failed) {
				setLocationInformation('Lokalita nebyla nalezena');
				setTimeout(() => {
					setLocationInformation(
						`Aktuální lokalita: ${weatherLocation.municipality}, ${weatherLocation.country}`
					);
				}, 2000);

				return;
			}

			const fetchedLocation: TypeLocation = {
				municipality: location.name as string,
				country: location.country as string,
			};

			setLocationSettings(fetchedLocation);
			setWeatherLocation(fetchedLocation);
			setLocationInformation(
				`Aktuální lokalita: ${location.name}, ${location.country}`
			);
		});
	};

	return (
		<div className="pr-14">
			<h1 className="pl-7 my-4 text-2xl">Lokalita počasí</h1>
			<div className="relative">
				<input
					className="ml-7 bg-gray-800 p-2.5 w-[100%] focus:outline-0"
					name="location"
					onChange={e => setLocationInput(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') handleLocationChange();
					}}
					placeholder={locationInformation}
					type="text"
					value={locationInput}
				/>
				<img
					className="absolute w-8 right-[-1rem] top-[50%] translate-y-[-50%] hover:cursor-pointer hover:opacity-50 "
					onClick={() => handleLocationChange()}
					src="src/assets/icons/search-icon.svg"
				/>
			</div>
		</div>
	);
};

export default SettingsWeather;
