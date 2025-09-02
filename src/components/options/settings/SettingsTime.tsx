import { TIME_ZONES, TIME_ZONES_EN } from '../../../constants/timeZones';
import {
	getLanguageSettings,
	getTimezoneSettings,
	setTimezoneSettings,
} from './settingsUtils';

const handleTimezoneChange = (
	e: React.ChangeEvent<HTMLSelectElement>
): void => {
	setTimezoneSettings(e.target.value);
};

const SettingsTime = () => {
	return (
		<div className="pr-14">
			<h1 className="my-4 px-7 text-2xl">
				{getLanguageSettings() === 'cs' ? 'Časové pásmo' : 'Time zone'}
			</h1>
			<select
				className="border text-sm rounded-lg block w-[100%] ml-7 p-2.5 bg-gray-800 border-gray-800 placeholder-gray-400 text-white focus:outline-0 white cursor-pointer"
				onChange={e => handleTimezoneChange(e)}
				value={getTimezoneSettings()}
			>
				{(getLanguageSettings() === 'cs' ? TIME_ZONES : TIME_ZONES_EN).map(
					timezone => (
						<option key={timezone.code} value={timezone.code}>
							UTC{timezone.utc} | {timezone.name}
						</option>
					)
				)}
			</select>
		</div>
	);
};

export default SettingsTime;
