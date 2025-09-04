import { TIME_ZONES, TIME_ZONES_EN } from '../../../constants/timeZones';
import {
	getLanguageSettings,
	getLocalTimeSettings,
	getTimezoneSettings,
	setTimezoneSettings,
} from './settingsUtils';

/*
 *	Component that displays a dropdown with time zones.
 *	@returns {JSX:Element}
 */
const SettingsTime = () => {
	/*
	 *	Function that handles the change of the time zone.
	 *  @param {React.ChangeEvent<HTMLSelectElement>} e – Event of the dropdown select element.
	 *	@returns {void}
	 */
	const handleTimezoneChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		setTimezoneSettings(e.target.value);
	};

	return (
		<div className="pr-14">
			<h1 className="my-4 px-7 text-2xl">
				{getLanguageSettings() === 'cs' ? 'Časové pásmo' : 'Time zone'}
			</h1>
			<select
				className={`${
					getLocalTimeSettings() === 'on'
						? 'cursor-not-allowed bg-gray-500 text-gray-400'
						: 'cursor-pointer bg-gray-800 text-white'
				}
					'border text-sm rounded-lg block w-[100%] ml-7 p-2.5  border-gray-800 placeholder-gray-400  focus:outline-0 white`}
				disabled={getLocalTimeSettings() === 'on' ? true : false}
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
