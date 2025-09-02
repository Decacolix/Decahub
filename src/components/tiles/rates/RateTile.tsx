import { use, useEffect, useState } from 'react';
import { SettingsContext } from '../../../App';
import { fetchCryptos, fetchCurrencies } from './ratesUtils';
import RateRow from './RateRow';
import { CURRENCIES, CURRENCIES_EN } from '../../../constants/currencies';
import Loader from '../../layout/Loader';
import {
	getPinnedCurrenciesSettings,
	getPinnedCryptosSettings,
	getLanguageSettings,
} from '../../options/settings/settingsUtils';
import { CRYPTOS } from '../../../constants/cryptos';

export type TypeRate = {
	code: string;
	value: number;
};

export type TypeRateSource = 'currency' | 'crypto';

type TypeRateTileProps = {
	source: TypeRateSource;
};

const displayRateRow = (
	source: TypeRateSource,
	rate: TypeRate,
	pinned: boolean
) => {
	return (
		(source === 'currency'
			? pinned
				? getPinnedCurrenciesSettings().includes(rate.code)
				: !getPinnedCurrenciesSettings().includes(rate.code)
			: pinned
			? getPinnedCryptosSettings().includes(rate.code)
			: !getPinnedCryptosSettings().includes(rate.code)) && (
			<RateRow
				code={rate.code}
				key={rate.code}
				name={
					source === 'currency'
						? getLanguageSettings() === 'cs'
							? CURRENCIES[rate.code as keyof typeof CURRENCIES]
							: CURRENCIES_EN[rate.code as keyof typeof CURRENCIES_EN]
						: CRYPTOS[rate.code as keyof typeof CRYPTOS]
				}
				pinned={pinned}
				source={source}
				value={rate.value}
			/>
		)
	);
};

const RateTile = ({ source }: TypeRateTileProps) => {
	const { baseCurrency, baseCrypto } = use(SettingsContext);
	const [rates, setRates] = useState<TypeRate[]>();
	const [isRatesLoading, setIsRatesLoading] = useState<boolean>(true);
	let ratesError: string = '';

	if (source === 'currency') {
		useEffect(() => {
			setIsRatesLoading(true);
			const fetchCurrenciesOnLoad = async () => {
				const currenciesFetched = await fetchCurrencies(baseCurrency);
				setRates(currenciesFetched.currencies);
				ratesError = currenciesFetched.error;
				setIsRatesLoading(false);
			};

			fetchCurrenciesOnLoad();
		}, [baseCurrency]);
	}

	if (source === 'crypto') {
		useEffect(() => {
			setIsRatesLoading(true);
			const fetchCryptosOnLoad = async () => {
				const cryptosFetched = await fetchCryptos(baseCrypto);
				setRates(cryptosFetched.currencies);
				ratesError = cryptosFetched.error;

				setIsRatesLoading(false);
			};

			fetchCryptosOnLoad();
		}, [baseCrypto]);
	}

	return ratesError ? (
		<p className="p-4">
			{getLanguageSettings() === 'cs'
				? 'Nepodařilo se načíst měny. Chyba: '
				: 'Could not load the currencies. Error: ' + ratesError}
		</p>
	) : isRatesLoading ? (
		<Loader />
	) : (
		<div className="list-none overflow-y-scroll w-[100%]">
			{rates?.map(rate => {
				return displayRateRow(source, rate, true);
			})}
			{rates?.map(rate => {
				return displayRateRow(source, rate, false);
			})}
		</div>
	);
};

export default RateTile;
