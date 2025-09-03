import { DEFAULT_SETTINGS } from '../../../constants/defaultSettings';
import { STORAGE_SETTINGS_KEY } from '../../../constants/storageSettingsKey';
import pinkBackground from '../../../assets/backgrounds/background-pink.svg';
import greenBackground from '../../../assets/backgrounds/background-green.svg';
import blueBackground from '../../../assets/backgrounds/background-blue.svg';

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

/* Set a local storage item with key and value. */
const setLocalStorageItem = (key: string, value: object): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

/* Get a local storage item by key. */
const getLocalStorageItem = (key: string): string => {
	return localStorage.getItem(key) || '{}';
};

/* Set a specific value of the local storage settings item with property and value. */
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

/* Set default settings. Check if settings for a specific value exists, if not, set it to its default value. Also set the document styles and theme. */
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
};

/* Get the settings local storage item. */
export const getSettings = (): TypeSettings => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY));
};

/* Get the set theme. */
export const getThemeSettings = (): TypeTheme => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).theme;
};

/* Set the theme in the local storage. */
export const setThemeSettings = (value: TypeTheme): void => {
	setLocalStorageItem(STORAGE_SETTINGS_KEY, setSettingsValue('theme', value));
};

/* Set the theme for the document. */
export const setTheme = (value: TypeTheme): void => {
	if (value === 'pink')
		document.body.style.backgroundImage = `url("${pinkBackground}")`;
	if (value === 'green')
		document.body.style.backgroundImage = `url("${greenBackground}")`;
	if (value === 'blue')
		document.body.style.backgroundImage = `url("${blueBackground}")`;
};

/* Get the set time zone. */
export const getTimezoneSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).timezone;
};

/* Set the time zone. */
export const setTimezoneSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('timezone', value)
	);
};

/* Get the set location. */
export const getLocationSettings = (): TypeLocation => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).location;
};

/* Set the location. */
export const setLocationSettings = (value: TypeLocation): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('location', value)
	);
};

/* Get the set base currency. */
export const getBaseCurrencySettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).baseCurrency;
};

/* Set the base currency. */
export const setBaseCurrencySettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('baseCurrency', value)
	);
};

/* Get the set base cryptocurrency. */
export const getBaseCryptoSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).baseCrypto;
};

/* Set the base cryptocurrency. */
export const setBaseCryptoSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('baseCrypto', value)
	);
};

/* Get the set news source. */
export const getNewsSourceSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).newsSource;
};

/* Set the news source. */
export const setNewsSourceSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('newsSource', value)
	);
};

/* Get the set pinned currencies. */
export const getPinnedCurrenciesSettings = (): string[] => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).pinnedCurrencies;
};

/* Set the pinnec currencies.*/
export const setPinnedCurrenciesSettings = (value: string[]): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('pinnedCurrencies', value)
	);
};

/* Get the set pinned cryptocurrencies. */
export const getPinnedCryptosSettings = (): string[] => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).pinnedCryptos;
};

/* Set the pinnec cryptocurrencies. */
export const setPinnedCryptosSettings = (value: string[]): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('pinnedCryptos', value)
	);
};

/* Get the set animation on/off. */
export const getAnimationSettings = (): boolean => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).animation;
};

/* Set the animation on/off. */
export const setAnimationSettings = (value: boolean): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('animation', value)
	);
};

/* Get the set language. */
export const getLanguageSettings = (): TypeLanguage => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).language;
};

/* Set the language. */
export const setLanguageSettings = (value: TypeLanguage): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('language', value)
	);
};
