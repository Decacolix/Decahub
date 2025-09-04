import { use, useCallback } from 'react';
import { SettingsContext } from '../../../App';
import {
	getBaseCryptoSettings,
	getLanguageSettings,
	setBaseCryptoSettings,
} from './settingsUtils';
import {
	CRYPTO_BASE_VALUES,
	CRYPTO_BASE_VALUES_EN,
} from '../../../constants/cryptoBaseValues';

/*
 *	Component that displays a dropdown with base cryptocurrencies.
 *	@returns {JSX:Element}
 */
const SettingsCrypto = () => {
	const { baseCrypto, setBaseCrypto } = use(SettingsContext);

	/*
	 *	Function that handles the change of the dropdown.
	 *	@returns {void}
	 */
	const handleBaseCryptoChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>): void => {
			setBaseCrypto(e.target.value.substring(0, 3));
		},
		[setBaseCryptoSettings(baseCrypto)]
	);

	return (
		<div className="pr-14">
			<h1 className="my-4 px-7 text-2xl">
				{getLanguageSettings() === 'cs'
					? 'Základ kryptoměny'
					: 'Base cryptocurrency'}
			</h1>
			<select
				className="border text-sm rounded-lg block w-[100%] ml-7 p-2.5 bg-gray-800 border-gray-800 placeholder-gray-400 text-white focus:outline-0 white cursor-pointer"
				onChange={e => handleBaseCryptoChange(e)}
				value={getBaseCryptoSettings()}
			>
				{Object.keys(
					getLanguageSettings() === 'cs'
						? CRYPTO_BASE_VALUES
						: CRYPTO_BASE_VALUES_EN
				).map(key => (
					<option key={key} value={key}>
						{key +
							' | ' +
							(getLanguageSettings() === 'cs'
								? CRYPTO_BASE_VALUES[key as keyof typeof CRYPTO_BASE_VALUES]
								: CRYPTO_BASE_VALUES_EN[
										key as keyof typeof CRYPTO_BASE_VALUES_EN
								  ])}
					</option>
				))}
			</select>
		</div>
	);
};

export default SettingsCrypto;
