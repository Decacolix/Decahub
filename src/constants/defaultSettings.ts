import type { TypeSettings } from '../components/options/settings/settingsUtils';

export const DEFAULT_SETTINGS: TypeSettings = {
	theme: 'green',
	timezone: 'Europe/Prague',
	location: { municipality: 'Praha', country: 'Česko' },
	baseCurrency: 'CZK',
	baseCrypto: 'CZK',
	newsSource: 'https://servis.idnes.cz/rss.aspx?c=zpravodaj',
	pinnedCurrencies: [],
	pinnedCryptos: [],
	animation: 'on',
	language: 'cs',
	localTime: 'off',
};
