import { DEFAULT_SETTINGS } from '../../../constants/defaultSettings';
import { STORAGE_SETTINGS_KEY } from '../../../constants/storageSettingsKey';

export type TypeSettings = {
	theme: 'pink' | 'green' | 'blue';
	timezone: string;
	location: string;
	baseCurrency: string;
	baseCrypto: string;
};

const setLocalStorageItem = (key: string, value: object): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItem = (key: string): string => {
	return localStorage.getItem(key) || '{}';
};

const setSettingsValue = (
	property: 'theme' | 'timezone' | 'location' | 'baseCurrency' | 'baseCrypto',
	value: string
): TypeSettings => {
	const item: TypeSettings = {
		...JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)),
		[property]: value,
	};

	return item;
};

export const setDefaultSettings = (): void => {
	setLocalStorageItem(STORAGE_SETTINGS_KEY, DEFAULT_SETTINGS);
};

export const setThemeSettings = (value: 'pink' | 'green' | 'blue'): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('timezone', value)
	);
};

export const setTimezoneSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('timezone', value)
	);
};

export const setLocationSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('location', value)
	);
};

export const setBaseCurrencySettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('baseCurrency', value)
	);
};

export const setBaseCryptoSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('baseCrypto', value)
	);
};
