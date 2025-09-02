import { DEFAULT_SETTINGS } from '../../../constants/defaultSettings';
import { STORAGE_SETTINGS_KEY } from '../../../constants/storageSettingsKey';

export type TypeTheme = 'pink' | 'green' | 'blue';

export type TypeLocation = {
	municipality: string;
	country: string;
};

export type TypeLanguage = 'cs' | 'en';

export type TypeSettings = {
	theme: TypeTheme;
	timezone: string;
	location: TypeLocation;
	baseCurrency: string;
	baseCrypto: string;
	newsSource: string;
	pinnedCurrencies: string[];
	pinnedCryptos: string[];
	animation: boolean;
	language: TypeLanguage;
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
		| 'pinnedCurrencies'
		| 'pinnedCryptos'
		| 'animation'
		| 'language',
	value: string | string[] | TypeLocation | TypeTheme | TypeLanguage | boolean
): TypeSettings => {
	const item: TypeSettings = {
		...JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)),
		[property]: value,
	};

	return item;
};

export const setDefatuls = (): void => {
	if (!Object.hasOwn(getSettings(), 'theme') || !getThemeSettings())
		setThemeSettings(DEFAULT_SETTINGS.theme);

	if (!Object.hasOwn(getSettings(), 'timezone') || !getTimezoneSettings())
		setTimezoneSettings(DEFAULT_SETTINGS.timezone);

	if (!Object.hasOwn(getSettings(), 'location') || !getLocationSettings())
		setLocationSettings(DEFAULT_SETTINGS.location);

	if (
		!Object.hasOwn(getSettings(), 'baseCurrency') ||
		!getBaseCurrencySettings()
	)
		setBaseCurrencySettings(DEFAULT_SETTINGS.baseCurrency);

	if (!Object.hasOwn(getSettings(), 'baseCrypto') || !getBaseCryptoSettings())
		setBaseCryptoSettings(DEFAULT_SETTINGS.baseCrypto);

	if (!Object.hasOwn(getSettings(), 'newsSource') || !getNewsSourceSettings())
		setNewsSourceSettings(DEFAULT_SETTINGS.newsSource);

	if (
		!Object.hasOwn(getSettings(), 'pinnedCurrencies') ||
		!getPinnedCurrenciesSettings()
	)
		setPinnedCurrenciesSettings(DEFAULT_SETTINGS.pinnedCurrencies);

	if (
		!Object.hasOwn(getSettings(), 'pinnedCryptos') ||
		!getPinnedCryptosSettings()
	)
		setPinnedCryptosSettings(DEFAULT_SETTINGS.pinnedCryptos);

	if (!Object.hasOwn(getSettings(), 'animation') || !getAnimationSettings())
		setAnimationSettings(DEFAULT_SETTINGS.animation);

	if (!Object.hasOwn(getSettings(), 'language') || !getLanguageSettings())
		setLanguageSettings(DEFAULT_SETTINGS.language);

	document.body.style.overflowX = 'hidden';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundSize = 'cover';
	document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundAttachment = 'fixed';
	setTheme(getThemeSettings());
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

export const getPinnedCryptosSettings = (): string[] => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).pinnedCryptos;
};

export const setPinnedCryptosSettings = (value: string[]) => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('pinnedCryptos', value)
	);
};

export const getAnimationSettings = (): boolean => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).animation;
};

export const setAnimationSettings = (value: boolean) => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('animation', value)
	);
};

export const getLanguageSettings = (): TypeLanguage => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).language;
};

export const setLanguageSettings = (value: TypeLanguage) => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('language', value)
	);
};

export const formatNumber = (value: string): string => {
	return (
		value.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
		',' +
		value.split('.')[1]
	);
};
