import { use, useCallback } from 'react';
import { CURRENCIES, CURRENCIES_EN } from '../../../constants/currencies';
import {
	getBaseCurrencySettings,
	getLanguageSettings,
	setBaseCurrencySettings,
} from './settingsUtils';
import { SettingsContext } from '../../../App';

/* Settings to set the base currency for the currencies on the page. */
const SettingsCurrency = () => {
	const { baseCurrency, setBaseCurrency } = use(SettingsContext);

	/* Set the base currency for currencies on change of the dropdown box with the list of base currencies. */
	const handleBaseCurrencyChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>): void => {
			setBaseCurrency(e.target.value.substring(0, 3));
		},
		[setBaseCurrencySettings(baseCurrency)]
	);

	return (
		<div className="pr-14">
			<h1 className="my-4 px-7 text-2xl">
				{getLanguageSettings() === 'cs' ? 'Základ měny' : 'Base currency'}
			</h1>
			<select
				className="border text-sm rounded-lg block w-[100%] ml-7 p-2.5 bg-gray-800 border-gray-800 placeholder-gray-400 text-white focus:outline-0 white cursor-pointer"
				onChange={e => handleBaseCurrencyChange(e)}
				value={getBaseCurrencySettings()}
			>
				{Object.keys(
					getLanguageSettings() === 'cs' ? CURRENCIES : CURRENCIES_EN
				).map(key => (
					<option key={key} value={key}>
						{key +
							' | ' +
							(getLanguageSettings() === 'cs'
								? CURRENCIES[key as keyof typeof CURRENCIES]
								: CURRENCIES_EN[key as keyof typeof CURRENCIES_EN])}
					</option>
				))}
			</select>
		</div>
	);
};

export default SettingsCurrency;
