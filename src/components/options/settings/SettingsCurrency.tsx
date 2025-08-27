import { use, useCallback } from 'react';
import { CURRENCIES } from '../../../constants/currencies';
import {
	getBaseCurrencySettings,
	setBaseCurrencySettings,
} from './settingsUtils';
import { SettingsContext } from '../../../App';

const SettingsCurrency = () => {
	const { baseCurrency, setBaseCurrency } = use(SettingsContext);

	const handleBaseCurrencyChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>): void => {
			setBaseCurrency(e.target.value.substring(0, 3));
		},
		[setBaseCurrencySettings(baseCurrency)]
	);

	return (
		<div className="pr-14">
			<h1 className="my-4 px-7 text-2xl">Základ měny</h1>
			<select
				className="border text-sm rounded-lg block w-[100%] ml-7 p-2.5 bg-gray-800 border-gray-800 placeholder-gray-400 text-white focus:outline-0 white cursor-pointer"
				onChange={e => handleBaseCurrencyChange(e)}
				value={getBaseCurrencySettings()}
			>
				{Object.keys(CURRENCIES).map(key => (
					<option key={key} value={key}>
						{key + ' | ' + CURRENCIES[key as keyof typeof CURRENCIES]}
					</option>
				))}
			</select>
		</div>
	);
};

export default SettingsCurrency;
