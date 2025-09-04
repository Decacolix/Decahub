import { CRYPTOS } from '../../../constants/cryptos';
import { CURRENCIES } from '../../../constants/currencies';
import {
	getLanguageSettings,
	setPinnedCryptosSettings,
	setPinnedCurrenciesSettings,
} from '../../options/settings/settingsUtils';
import type { TypeRateSource } from './RateTile';

export type TypeRate = {
	code: string;
	value: number;
};

export type TypeRates = {
	failed: boolean;
	error: string;
	currencies?: TypeRate[];
	date?: Date;
};

/*
 *	Function that fetches the currencies for the currently selected base currency.
 *	@param {string} base – Base currency.
 *	@returns {Promise<TypeRates>}
 */
export const fetchCurrencies = async (base: string): Promise<TypeRates> => {
	let result: TypeRates = {
		failed: true,
		error: 'fetch',
	};

	await fetch(`https://open.er-api.com/v6/latest/${base}`)
		.then(response => response.json())
		.then(data => {
			const rates: TypeRate[] = [];

			Object.keys(CURRENCIES).forEach(key => {
				rates.push({
					code: key,
					value: 1 / data.rates[key],
				});
			});

			result = {
				failed: false,
				error: '',
				currencies: rates,
				date: data.time_last_update_unix,
			};
		})
		.catch(error => {
			result = {
				failed: true,
				error: error,
			};
		});

	return result;
};

/*
 *	Function that fetches the cryptocurrencies for the currently selected base cryptocurrency.
 *	@param {string} base – Base currency.
 *	@returns {Promise<TypeRates>}
 */
export const fetchCryptos = async (base: string): Promise<TypeRates> => {
	let result: TypeRates = {
		failed: true,
		error: 'fetch',
	};

	await fetch(
		`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,USDT,BNB,SOL,USDC,DOGE,TRX,ADA,LINK,HYPE,USDe,SUI,XLM,BCH,AVAX,CRO,HBAR,LEO,LTC,TON,SHIB,DOT,UNI,DAI,BGB,XMR,AAVE,ENA,PEPE,MNT,OKB,ETC,TAO,NEAR,APT,ONDO,PI,ICP,ARB,POL,USD1,KAS,ATOM,VET,ALGO,GT,IP,PENGU,RENDER,WLD,SEI,KCS,BONK,TRUMP,FIL,JUP,FLR,SKY,FET,FDUSD,FORM,XDC,INJ,TIA,QNT,OP,PYTH&tsyms=${base}`
	)
		.then(response => response.json())
		.then(data => {
			const rates: TypeRate[] = [];

			Object.keys(CRYPTOS).forEach(key => {
				rates.push({
					code: key,
					value: data[key][base],
				});
			});

			result = {
				failed: false,
				error: '',
				currencies: rates,
				date: data.time_last_update_unix,
			};
		})
		.catch(error => {
			result = {
				failed: true,
				error: error,
			};
		});

	return result;
};

/*
 *	Function that sets the pinned rates for either currencies or cryptocurrencies.
 *	@param {string[]} currentRates – Current pinned rates.
 *	@param {string | undefined} rateCode – The code of the selected rate.
 *	@param {TypeRateSource} source – The source of the selected rate.
 *	@param {React.MouseEvent<HTMLDivElement>} e – Event of the clicked element.
 *	@returns {Promise<TypeRates>}
 */
export const setPinnedRates = (
	currentRates: string[],
	rateCode: string | undefined,
	source: TypeRateSource,
	e: React.MouseEvent<HTMLDivElement>
) => {
	if (currentRates.includes(rateCode as string)) {
		if (source === 'currency')
			setPinnedCurrenciesSettings(
				currentRates.filter(item => item !== rateCode)
			);
		if (source === 'crypto')
			setPinnedCryptosSettings(currentRates.filter(item => item !== rateCode));

		(e.target as HTMLDivElement).classList.add('pinned');
	}

	if (!currentRates.includes(rateCode as string)) {
		currentRates.push(rateCode as string);

		if (source === 'currency') setPinnedCurrenciesSettings(currentRates.sort());
		if (source === 'crypto') setPinnedCryptosSettings(currentRates.sort());

		(e.target as HTMLDivElement).classList.remove('pinned');
	}
};

/*
 *	Function that sets the value to have a fixed number of decimal digits.
 *	@param {number} value – The value to be set.
 *	@returns {string}
 */
export const setDisplayedValue = (value: number): string => {
	if (value.toFixed(2) === '0.00') return value.toFixed(3);
	if (value.toFixed(3) === '0.000') return value.toFixed(4);

	return value.toFixed(2);
};

/*
 *	Function that formats the date, if the language is Czech, use decimal comma, if the language is English, use decimal point. Also add a space separator for thousdands (example: 1000000 is changed to 1 000 000).
 *	@param {string} value – The value to be formatted.
 *	@returns {string}
 */
export const formatRate = (value: string): string => {
	return (
		value.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
		(getLanguageSettings() === 'cs' ? ',' : '.') +
		value.split('.')[1]
	);
};
