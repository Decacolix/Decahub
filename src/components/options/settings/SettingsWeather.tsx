import { use, useState } from 'react';
import { SettingsContext } from '../../../App';
import { fetchLocation } from '../../tiles/weather/weatherUtils';
import {
	getLanguageSettings,
	setLocationSettings,
	type TypeLocation,
} from './settingsUtils';
import searchIcon from '../../../assets/icons/search-icon.svg';

/*
 *	Component that displays a textbox for the location to set.
 *	@returns {JSX:Element}
 */
const SettingsWeather = () => {
	const { weatherLocation, setWeatherLocation } = use(SettingsContext);
	const [locationInput, setLocationInput] = useState<string>('');
	const [locationInformation, setLocationInformation] = useState<string>(
		`${weatherLocation.municipality}, ${weatherLocation.country}`
	);

	/*
	 *	Function that handles the change of the location and fetches the location data from the API.
	 *	@returns {Promise<void>}
	 */
	const handleLocationChange = async (): Promise<void> => {
		setLocationInput('');
		await fetchLocation(locationInput).then(async location => {
			if (location.failed) {
				setLocationInformation(
					getLanguageSettings() === 'cs'
						? 'Lokalita nebyla nalezena'
						: 'Location was not found'
				);
				setTimeout(() => {
					setLocationInformation(
						`${weatherLocation.municipality}, ${weatherLocation.country}`
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
			setLocationInformation(`${location.name}, ${location.country}`);
		});
	};

	return (
		<div className="pr-14">
			<h1 className="pl-7 my-4 text-2xl">
				{getLanguageSettings() === 'cs'
					? 'Lokalita počasí'
					: 'Weather location'}
			</h1>
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
					src={searchIcon}
				/>
			</div>
		</div>
	);
};

export default SettingsWeather;
