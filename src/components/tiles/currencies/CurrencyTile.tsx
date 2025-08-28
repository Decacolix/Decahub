import { use, useEffect, useState } from 'react';
import { SettingsContext } from '../../../App';
import { fetchCurrencies } from './currenciesUtils';
import RateRow from './RateRow';
import { CURRENCIES } from '../../../constants/currencies';
import Loader from '../../layout/Loader';
import { getPinnedCurrenciesSettings } from '../../options/settings/settingsUtils';

type TypeCurrency = {
	code: string;
	value: number;
};

const CurrencyTile = () => {
	const { baseCurrency } = use(SettingsContext);
	const [currencies, setCurrencies] = useState<TypeCurrency[]>();
	const [isCurrenciesLoading, setIsCurrenciesLoading] = useState<boolean>(true);
	let currenciesError: string = '';

	useEffect(() => {
		setIsCurrenciesLoading(true);
		const fetchCurrenciesOnLoad = async () => {
			const currenciesFetched = await fetchCurrencies(baseCurrency);
			setCurrencies(currenciesFetched.currencies);
			currenciesError = currenciesFetched.error;
			setIsCurrenciesLoading(false);
		};

		fetchCurrenciesOnLoad();
	}, [baseCurrency]);

	return currenciesError ? (
		<p className="p-4">
			{'Nepodařilo se načíst měny. Chyba: ' + currenciesError}
		</p>
	) : isCurrenciesLoading ? (
		<Loader size={7} />
	) : (
		<div className="list-none overflow-y-scroll w-[100%]">
			{currencies?.map(currency => {
				return (
					getPinnedCurrenciesSettings().includes(currency.code) && (
						<li className="my-3 mx-4" id={currency.code} key={currency.code}>
							<RateRow
								code={currency.code}
								name={CURRENCIES[currency.code as keyof typeof CURRENCIES]}
								pinned={true}
								value={currency.value}
							/>
						</li>
					)
				);
			})}
			{currencies?.map(currency => {
				return (
					!getPinnedCurrenciesSettings().includes(currency.code) && (
						<li className="my-3 mx-4" id={currency.code} key={currency.code}>
							<RateRow
								code={currency.code}
								name={CURRENCIES[currency.code as keyof typeof CURRENCIES]}
								pinned={false}
								value={currency.value}
							/>
						</li>
					)
				);
			})}
		</div>
	);
};

export default CurrencyTile;
