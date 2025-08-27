import { CURRENCIES } from '../../../constants/currencies';

export type TypeCurrency = {
	code: string;
	value: number;
};

export type TypeCurrencies = {
	failed: boolean;
	error: string;
	currencies?: TypeCurrency[];
	date?: Date;
};

export const fetchCurrencies = async (
	base: string
): Promise<TypeCurrencies> => {
	let result: TypeCurrencies = {
		failed: true,
		error: 'fetch',
	};

	await fetch(`https://open.er-api.com/v6/latest/${base}`)
		.then(response => response.json())
		.then(data => {
			const rates: TypeCurrency[] = [];

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
