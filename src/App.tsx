import { createContext, useEffect, useState } from 'react';
import Grid from './components/layout/Grid';
import Menu from './components/layout/Menu';
import SettingsPanel from './components/options/settings/SettingsPanel';
import {
	getBaseCryptoSettings,
	getBaseCurrencySettings,
	getLocationSettings,
	getNewsSourceSettings,
	getTimezoneSettings,
	setDefatuls,
	type TypeLocation,
} from './components/options/settings/settingsUtils';
import {
	fetchTime,
	fetchTimezone,
	type TypeFetchTime,
	type TypeFetchTimezone,
} from './components/tiles/time/timeUtils';
import { DEFAULT_SETTINGS } from './constants/defaultSettings';
import InfoPanel from './components/options/info/InfoPanel';

type TypeSettingsContext = {
	settingsDisplayed: boolean;
	setSettingsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
	clock: Date;
	setClock: React.Dispatch<React.SetStateAction<Date>>;
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
	timezoneInfo: TypeFetchTimezone;
	setTimezoneInfo: React.Dispatch<React.SetStateAction<TypeFetchTimezone>>;
	isTimeLoading: boolean;
	setIsTimeLoading: React.Dispatch<React.SetStateAction<boolean>>;
	currentNewsSource: string;
	setCurrentNewsSource: React.Dispatch<React.SetStateAction<string>>;
	weatherLocation: TypeLocation;
	setWeatherLocation: React.Dispatch<React.SetStateAction<TypeLocation>>;
	baseCurrency: string;
	setBaseCurrency: React.Dispatch<React.SetStateAction<string>>;
	baseCrypto: string;
	setBaseCrypto: React.Dispatch<React.SetStateAction<string>>;
	infoDisplayed: boolean;
	setInfoDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
	animationOn: boolean;
	setAnimationOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsContext = createContext<TypeSettingsContext>({
	settingsDisplayed: false,
	setSettingsDisplayed: () => false,
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
	setIsTimeLoading: () => false,
	currentNewsSource: '',
	setCurrentNewsSource: () => '',
	weatherLocation: { municipality: '', country: '' },
	setWeatherLocation: () => '',
	baseCurrency: '',
	setBaseCurrency: () => '',
	baseCrypto: '',
	setBaseCrypto: () => '',
	infoDisplayed: false,
	setInfoDisplayed: () => false,
	animationOn: true,
	setAnimationOn: () => true,
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
	const [currentNewsSource, setCurrentNewsSource] = useState<string>(
		getNewsSourceSettings() || DEFAULT_SETTINGS.newsSource
	);
	const [weatherLocation, setWeatherLocation] = useState<TypeLocation>(
		getLocationSettings() || DEFAULT_SETTINGS.location
	);
	const [baseCurrency, setBaseCurrency] = useState<string>(
		getBaseCurrencySettings() || DEFAULT_SETTINGS.baseCurrency
	);
	const [baseCrypto, setBaseCrypto] = useState<string>(
		getBaseCryptoSettings() || DEFAULT_SETTINGS.baseCrypto
	);
	const [infoDisplayed, setInfoDisplayed] = useState(false);
	const [animationOn, setAnimationOn] = useState(true);

	const hour: number = 0;
	const minute: number = 0;
	const seconds: number = 0;
	const day: number = 0;
	const month: number = 0;
	const year: number = 0;

	let clockErrorMessage: string = '';
	let timezoneErrorMessage: string = '';

	useEffect(() => {
		setDefatuls();

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
			<SettingsContext
				value={{
					settingsDisplayed,
					setSettingsDisplayed,
					clock,
					setClock,
					date,
					setDate,
					timezoneInfo,
					setTimezoneInfo,
					isTimeLoading,
					setIsTimeLoading,
					currentNewsSource,
					setCurrentNewsSource,
					weatherLocation,
					setWeatherLocation,
					baseCurrency,
					setBaseCurrency,
					baseCrypto,
					setBaseCrypto,
					infoDisplayed,
					setInfoDisplayed,
					animationOn,
					setAnimationOn,
				}}
			>
				<Menu />
				<SettingsPanel />
				<InfoPanel />
				<Grid
					clockErrorMessage={clockErrorMessage}
					timezoneErrorMessage={timezoneErrorMessage}
				/>
			</SettingsContext>
		</div>
	);
};

export default App;
