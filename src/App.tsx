import { createContext, useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import Grid from './components/layout/Grid';
import Menu from './components/layout/Menu';
import SettingsPanel from './components/options/settings/SettingsPanel';
import {
	getBaseCryptoSettings,
	getBaseCurrencySettings,
	getLocationSettings,
	getNewsSourceSettings,
	getSettings,
	getThemeSettings,
	getTimezoneSettings,
	setBaseCryptoSettings,
	setBaseCurrencySettings,
	setLocationSettings,
	setNewsSourceSettings,
	setTheme,
	setThemeSettings,
	setTimezoneSettings,
} from './components/options/settings/settingsUtils';
import {
	fetchTime,
	fetchTimezone,
	type TypeFetchTime,
	type TypeFetchTimezone,
} from './components/tiles/time/timeUtils';
import { DEFAULT_SETTINGS } from './constants/defaultSettings';

type TypeSettingsDisplayedContext = {
	settingsDisplayed: boolean;
	setSettingsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
};

type TypeTimeContext = {
	clock: Date;
	setClock: React.Dispatch<React.SetStateAction<Date>>;
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
	timezoneInfo: TypeFetchTimezone;
	setTimezoneInfo: React.Dispatch<React.SetStateAction<TypeFetchTimezone>>;
	isTimeLoading: boolean;
	setIsTimeLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type TypeNewsSourceContext = {
	currentNewsSource: string;
	setCurrentNewSource: React.Dispatch<React.SetStateAction<string>>;
};

export const SettingsDisplayedContext =
	createContext<TypeSettingsDisplayedContext>({
		settingsDisplayed: false,
		setSettingsDisplayed: () => '',
	});

export const TimeContext = createContext<TypeTimeContext>({
	clock: new Date(),
	setClock: () => '',
	date: new Date(),
	setDate: () => '',
	timezoneInfo: {
		failed: false,
		error: '',
	},
	setTimezoneInfo: () => '',
	isTimeLoading: false,
	setIsTimeLoading: () => '',
});

export const NewsSourceContext = createContext<TypeNewsSourceContext>({
	currentNewsSource: '',
	setCurrentNewSource: () => '',
});

const processFetchedTime = (
	hour: number,
	minute: number,
	seconds: number,
	day: number,
	month: number,
	year: number,
	setClock: React.Dispatch<React.SetStateAction<Date>>,
	setDate: React.Dispatch<React.SetStateAction<Date>>,
	clockFetch: TypeFetchTime
) => {
	hour = clockFetch.hour as number;
	minute = clockFetch.minute as number;
	seconds = clockFetch.seconds as number;
	day = clockFetch.day as number;
	month = clockFetch.month as number;
	year = clockFetch.year as number;

	const current: Date = new Date();

	setClock(() => {
		current.setHours(hour as number);
		current.setMinutes(minute as number);
		current.setSeconds(seconds as number);
		return current;
	});

	setDate(() => {
		current.setDate(day as number);
		current.setMonth((month - 1) as number);
		current.setFullYear(year as number);

		return current;
	});

	return current;
};

const App = () => {
	const [settingsDisplayed, setSettingsDisplayed] = useState(false);
	const [clock, setClock] = useState(new Date());
	const [date, setDate] = useState(new Date());
	const [timezoneInfo, setTimezoneInfo] = useState<TypeFetchTimezone>({
		failed: false,
		error: '',
	});
	const [isTimeLoading, setIsTimeLoading] = useState<boolean>(true);
	const [currentNewsSource, setCurrentNewSource] = useState<string>(
		getNewsSourceSettings() || DEFAULT_SETTINGS.newsSource
	);

	const hour: number = 0;
	const minute: number = 0;
	const seconds: number = 0;
	const day: number = 0;
	const month: number = 0;
	const year: number = 0;

	let clockErrorMessage: string = '';
	let timezoneErrorMessage: string = '';

	useEffect(() => {
		if (!Object.hasOwn(getSettings(), 'theme') || !getThemeSettings()) {
			setThemeSettings(DEFAULT_SETTINGS.theme);
		}

		if (!Object.hasOwn(getSettings(), 'timezone') || !getTimezoneSettings()) {
			setTimezoneSettings(DEFAULT_SETTINGS.timezone);
		}

		if (!Object.hasOwn(getSettings(), 'location') || !getLocationSettings()) {
			setLocationSettings(DEFAULT_SETTINGS.location);
		}

		if (
			!Object.hasOwn(getSettings(), 'baseCurrency') ||
			!getBaseCurrencySettings()
		) {
			setBaseCurrencySettings(DEFAULT_SETTINGS.baseCurrency);
		}

		if (
			!Object.hasOwn(getSettings(), 'baseCrypto') ||
			!getBaseCryptoSettings()
		) {
			setBaseCryptoSettings(DEFAULT_SETTINGS.baseCrypto);
		}

		if (
			!Object.hasOwn(getSettings(), 'newsSource') ||
			!getNewsSourceSettings()
		) {
			setNewsSourceSettings(DEFAULT_SETTINGS.newsSource);
		}

		document.body.style.overflowX = 'hidden';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundPosition = 'center';
		setTheme(getThemeSettings());

		const clockSetInterval = setInterval(async () => {
			const clockFetch: TypeFetchTime = await fetchTime(
				getTimezoneSettings() || DEFAULT_SETTINGS.timezone
			);

			if (clockFetch.failed) {
				clockErrorMessage = clockFetch.error as string;
				clearInterval(clockSetInterval);
				return;
			}

			processFetchedTime(
				hour,
				minute,
				seconds,
				day,
				month,
				year,
				setClock,
				setDate,
				clockFetch
			);
		}, 60000);

		return () => {
			clearInterval(clockSetInterval);
		};
	}, []);

	useEffect(() => {
		const fetchDataOnTimezoneChange = async () => {
			setIsTimeLoading(true);

			const clockFetch: TypeFetchTime = await fetchTime(
				!getTimezoneSettings()
					? DEFAULT_SETTINGS.timezone
					: getTimezoneSettings()
			);

			const timezoneFetch: TypeFetchTimezone = await fetchTimezone(
				getTimezoneSettings()
			);

			if (clockFetch.failed || timezoneFetch.failed) {
				clockErrorMessage = (clockFetch.error +
					' ' +
					timezoneFetch.error) as string;
				return;
			}

			clockErrorMessage = clockFetch.failed ? clockFetch.error : '';
			timezoneErrorMessage = timezoneFetch.failed ? timezoneFetch.error : '';

			if (clockFetch.failed && timezoneFetch.failed) return;

			processFetchedTime(
				hour,
				minute,
				seconds,
				day,
				month,
				year,
				setClock,
				setDate,
				clockFetch
			);

			setTimezoneInfo(timezoneFetch);
			setIsTimeLoading(false);
		};

		fetchDataOnTimezoneChange();
	}, [getTimezoneSettings()]);

	return (
		<div className="h-screen font-[Nata_Sans] text-white">
			<SettingsDisplayedContext
				value={{ settingsDisplayed, setSettingsDisplayed }}
			>
				<Menu />
				<NewsSourceContext value={{ currentNewsSource, setCurrentNewSource }}>
					<SettingsPanel />
					<TimeContext
						value={{
							clock,
							setClock,
							date,
							setDate,
							timezoneInfo,
							setTimezoneInfo,
							isTimeLoading,
							setIsTimeLoading,
						}}
					>
						<Grid
							clockErrorMessage={clockErrorMessage}
							timezoneErrorMessage={timezoneErrorMessage}
						/>
					</TimeContext>
				</NewsSourceContext>
			</SettingsDisplayedContext>
			<Footer />
		</div>
	);
};

export default App;
