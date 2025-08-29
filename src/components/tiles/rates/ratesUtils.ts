import { CRYPTOS } from '../../../constants/cryptos';
import { CURRENCIES } from '../../../constants/currencies';

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
