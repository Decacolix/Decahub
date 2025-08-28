import { STORAGE_SETTINGS_KEY } from '../../../constants/storageSettingsKey';

export type TypeTheme = 'pink' | 'green' | 'blue';

export type TypeLocation = {
	municipality: string;
	country: string;
};

export type TypeSettings = {
	theme: TypeTheme;
	timezone: string;
	location: TypeLocation;
	baseCurrency: string;
	baseCrypto: string;
	newsSource: string;
	pinnedCurrencies: string[];
};

const setLocalStorageItem = (key: string, value: object): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItem = (key: string): string => {
	return localStorage.getItem(key) || '{}';
};

const setSettingsValue = (
	property:
		| 'theme'
		| 'timezone'
		| 'location'
		| 'baseCurrency'
		| 'baseCrypto'
		| 'newsSource'
		| 'pinnedCurrencies',
	value: string | string[] | TypeLocation | TypeTheme
): TypeSettings => {
	const item: TypeSettings = {
		...JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)),
		[property]: value,
	};

	return item;
};

export const getSettings = (): TypeSettings => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY));
};

export const getThemeSettings = (): TypeTheme => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).theme;
};

export const setThemeSettings = (value: TypeTheme): void => {
	setLocalStorageItem(STORAGE_SETTINGS_KEY, setSettingsValue('theme', value));
};

export const setTheme = (value: TypeTheme): void => {
	document.body.style.backgroundImage = `url("./src/assets/backgrounds/background-${value}.svg")`;
};

export const getTimezoneSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).timezone;
};

export const setTimezoneSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('timezone', value)
	);
};

export const getLocationSettings = (): TypeLocation => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).location;
};

export const setLocationSettings = (value: TypeLocation): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('location', value)
	);
};

export const getBaseCurrencySettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).baseCurrency;
};

export const setBaseCurrencySettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('baseCurrency', value)
	);
};

export const getBaseCryptoSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).baseCrypto;
};

export const setBaseCryptoSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('baseCrypto', value)
	);
};

export const getNewsSourceSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).newsSource;
};

export const setNewsSourceSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('newsSource', value)
	);
};

export const getPinnedCurrenciesSettings = (): string[] => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).pinnedCurrencies;
};

export const setPinnedCurrenciesSettings = (value: string[]) => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('pinnedCurrencies', value)
	);
};
