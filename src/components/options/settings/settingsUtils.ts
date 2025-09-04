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

export type TypeSwitch = 'on' | 'off';

export type TypeSettings = {
	theme: TypeTheme;
	timezone: string;
	location: TypeLocation;
	baseCurrency: string;
	baseCrypto: string;
	newsSource: string;
	pinnedCurrencies: string[];
	pinnedCryptos: string[];
	animation: TypeSwitch;
	language: TypeLanguage;
	localTime: TypeSwitch;
};

/*
 *	Function that sets an item in local storage.
 * 	@param {string} key – The key of the item.
 * 	@param {object} value – The value of the item.
 *	@returns {void}
 */
const setLocalStorageItem = (key: string, value: object): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

/*
 *	Function that returns an item from local storage.
 * 	@param {string} key – The key of the item.
 *	@returns {string}
 */
const getLocalStorageItem = (key: string): string => {
	return localStorage.getItem(key) || '{}';
};

/*
 *	Function that sets a specific value of the settings item in the local storage.
 * 	@param {'theme' | 'timezone' | 'location' | 'baseCurrency' | 'baseCrypto' | 'newsSource' | 'pinnedCurrencies' | 'pinnedCryptos' | 'animation' | 'language' | 'localTime'} property – The specific settings property to be set.
 * 	@param {string | string[] | TypeLocation | TypeTheme | TypeLanguage | TypeSwitch} value – The value of the property.
 *	@returns {TypeSettings}
 */
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
		| 'language'
		| 'localTime',
	value:
		| string
		| string[]
		| TypeLocation
		| TypeTheme
		| TypeLanguage
		| TypeSwitch
): TypeSettings => {
	const item: TypeSettings = {
		...JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)),
		[property]: value,
	};

	return item;
};

/*
 *	Function that sets the default settings value if no values are set.
 *	@returns {void}
 */
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

/*
 *	Function that returns the settings object from the local storage.
 *	@returns {TypeSettings}
 */
export const getSettings = (): TypeSettings => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY));
};

/*
 *	Function that gets the current theme settings.
 *	@returns {TypeTheme}
 */
export const getThemeSettings = (): TypeTheme => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).theme;
};

/*
 *	Function that sets the current theme settings.
 * 	@param {TypeTheme} value – The value of the theme.
 *	@returns {void}
 */
export const setThemeSettings = (value: TypeTheme): void => {
	setLocalStorageItem(STORAGE_SETTINGS_KEY, setSettingsValue('theme', value));
};

/*
 *	Function that sets the current theme for the document.
 * 	@param {TypeTheme} value – The value of the theme.
 *	@returns {void}
 */
export const setTheme = (value: TypeTheme): void => {
	if (value === 'pink')
		document.body.style.backgroundImage = `url("${pinkBackground}")`;
	if (value === 'green')
		document.body.style.backgroundImage = `url("${greenBackground}")`;
	if (value === 'blue')
		document.body.style.backgroundImage = `url("${blueBackground}")`;
};

/*
 *	Function that gets the current time zone settings.
 *	@returns {string}
 */
export const getTimezoneSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).timezone;
};

/*
 *	Function that sets the current time zone settings.
 * 	@param {string} value – The value of the time zone.
 *	@returns {void}
 */
export const setTimezoneSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('timezone', value)
	);
};

/*
 *	Function that gets the current location settings.
 *	@returns {TypeLocation}
 */
export const getLocationSettings = (): TypeLocation => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).location;
};

/*
 *	Function that sets the current location settings.
 * 	@param {TypeLocation} value – The value of the location.
 *	@returns {void}
 */
export const setLocationSettings = (value: TypeLocation): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('location', value)
	);
};

/*
 *	Function that gets the current base currency settings.
 *	@returns {string}
 */
export const getBaseCurrencySettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).baseCurrency;
};

/*
 *	Function that sets the current base currency settings.
 * 	@param {string} value – The value of the base currency.
 *	@returns {void}
 */
export const setBaseCurrencySettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('baseCurrency', value)
	);
};

/*
 *	Function that gets the current cryptocurrency settings.
 *	@returns {string}
 */
export const getBaseCryptoSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).baseCrypto;
};

/*
 *	Function that sets the current base cryptocurrency settings.
 * 	@param {string} value – The value of the base cryptocurrency.
 *	@returns {void}
 */
export const setBaseCryptoSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('baseCrypto', value)
	);
};

/*
 *	Function that gets the current news source settings.
 *	@returns {string}
 */
export const getNewsSourceSettings = (): string => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).newsSource;
};

/*
 *	Function that sets the current news source settings.
 * 	@param {string} value – The value of the news source.
 *	@returns {void}
 */
export const setNewsSourceSettings = (value: string): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('newsSource', value)
	);
};

/*
 *	Function that gets the current pinned currencies settings.
 *	@returns {string[]}
 */
export const getPinnedCurrenciesSettings = (): string[] => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).pinnedCurrencies;
};

/*
 *	Function that sets the current pinned currencies settings.
 * 	@param {string[]} value – The currencies to be pinned.
 *	@returns {void}
 */
export const setPinnedCurrenciesSettings = (value: string[]): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('pinnedCurrencies', value)
	);
};

/*
 *	Function that gets the current pinned cryptocurrencies settings.
 *	@returns {string[]}
 */
export const getPinnedCryptosSettings = (): string[] => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).pinnedCryptos;
};

/*
 *	Function that sets the current pinned cryptocurrencies settings.
 * 	@param {string[]} value – The cryptocurrencies to be pinned.
 *	@returns {void}
 */
export const setPinnedCryptosSettings = (value: string[]): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('pinnedCryptos', value)
	);
};

/*
 *	Function that gets the current animation settings.
 *	@returns {TypeSwitch}
 */
export const getAnimationSettings = (): TypeSwitch => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).animation;
};

/*
 *	Function that sets the animation to or on off settings.
 * 	@param {TypeSwitch} value – The value of the animation.
 *	@returns {void}
 */
export const setAnimationSettings = (value: TypeSwitch): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('animation', value)
	);
};

/*
 *	Function that gets the current language settings.
 *	@returns {TypeLanguage}
 */
export const getLanguageSettings = (): TypeLanguage => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).language;
};

/*
 *	Function that sets the language to either Czech or English settings.
 * 	@param {TypeLanguage} value – The value of the language.
 *	@returns {void}
 */
export const setLanguageSettings = (value: TypeLanguage): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('language', value)
	);
};

/*
 *	Function that gets the current local time settings.
 *	@returns {TypeSwitch}
 */
export const getLocalTimeSettings = (): TypeSwitch => {
	return JSON.parse(getLocalStorageItem(STORAGE_SETTINGS_KEY)).localTime;
};

/*
 *	Function that sets the local time to or on off settings.
 * 	@param {TypeSwitch} value – The value of the local time.
 *	@returns {void}
 */
export const setLocalTimeSettings = (value: TypeSwitch): void => {
	setLocalStorageItem(
		STORAGE_SETTINGS_KEY,
		setSettingsValue('localTime', value)
	);
};
