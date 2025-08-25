import { TIME_ZONES } from '../../../constants/timeZones';
import { getTimezoneSettings, setTimezoneSettings } from './settingsUtils';

const SettingsTime = () => {
	const handleTimezoneChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		setTimezoneSettings(e.target.value);
	};

	return (
		<div className="pr-14">
			<h1 className="my-4 px-7 text-2xl">Časové pásmo</h1>
			<select
				className="border text-sm rounded-lg block w-[100%] ml-7 p-2.5 bg-gray-800 border-gray-800 placeholder-gray-400 text-white focus:outline-0 white cursor-pointer"
				id="countries"
				onChange={e => handleTimezoneChange(e)}
				value={getTimezoneSettings()}
			>
				{TIME_ZONES.map(timezone => (
					<option key={timezone.code} value={timezone.code}>
						UTC{timezone.utc} | {timezone.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default SettingsTime;
