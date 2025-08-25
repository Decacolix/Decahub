import type { TypeSettings } from '../components/options/settings/settingsUtils';

export const DEFAULT_SETTINGS: TypeSettings = {
	theme: 'pink',
	timezone: 'Europe/Prague',
	location: { municipality: 'Praha', country: 'Česko' },
	baseCurrency: 'CZK',
	baseCrypto: 'USD',
	newsSource: 'https://servis.idnes.cz/rss.aspx?c=zpravodaj',
};
