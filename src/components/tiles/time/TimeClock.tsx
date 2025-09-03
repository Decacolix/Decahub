import { use, useEffect } from 'react';
import { formatClock, formatTimezone } from './timeUtils';
import type { TypeGrid } from '../../layout/Grid';
import { SettingsContext } from '../../../App';
import {
	getLanguageSettings,
	getLocalTimeSettings,
} from '../../options/settings/settingsUtils';

/* Display the clock with the current time based on the currently selected time zone. */
const TimeClock = ({ clockErrorMessage, timezoneErrorMessage }: TypeGrid) => {
	const { clock, setClock, timezoneInfo, localTime, setLocalTime } =
		use(SettingsContext);

	/* Update the clock every second by incrementing the second. */
	useEffect(() => {
		const clockUpdateInterval = setInterval(async () => {
			await setClock(() => {
				const current: Date = new Date();
				current.setHours(clock.getHours());
				current.setMinutes(clock.getMinutes());
				current.setSeconds(clock.getSeconds() + 1);
				return current;
			});
		}, 1000);

		return () => {
			clearInterval(clockUpdateInterval);
		};
	}, [clock]);

	/* Update the local clock every 500 milliseconds for better precision. */
	useEffect(() => {
		const localClockUpdateInterval = setInterval(async () => {
			setLocalTime(new Date());
		}, 500);

		return () => {
			clearInterval(localClockUpdateInterval);
		};
	}, [localTime]);

	return (
		<>
			<div className="absolute bottom-2 left-[50%] translate-x-[-50%]">
				{timezoneErrorMessage ? (
					<p>
						{(getLanguageSettings() === 'cs'
							? 'Nepodařilo se načíst časová pásma. Chyba: '
							: 'Could not load the time zones. Error: ') +
							timezoneErrorMessage}
					</p>
				) : (
					<p>
						<span>
							{getLocalTimeSettings() === 'on'
								? ''
								: formatTimezone(timezoneInfo.currentUtcOffset)}
						</span>
						<span>
							{timezoneInfo.isDayLightSavingActive
								? `${
										getLanguageSettings() === 'cs'
											? getLocalTimeSettings() === 'on'
												? '(lokální čas)'
												: ' (letní čas)'
											: getLocalTimeSettings() === 'on'
											? '(local time)'
											: ' (summer time)'
								  }`
								: ''}
						</span>
					</p>
				)}
			</div>
			<div>
				{clockErrorMessage ? (
					<p>
						{(getLanguageSettings() === 'cs'
							? 'Nepodařilo se načíst hodiny. Chyba: '
							: 'Could not load the clock. Error: ') + clockErrorMessage}
					</p>
				) : (
					<p className="font-[Chivo_Mono] text-5xl 2xl:text-7xl">
						{getLocalTimeSettings() === 'on'
							? formatClock(
									localTime.getHours(),
									localTime.getMinutes(),
									localTime.getSeconds()
							  )
							: formatClock(
									clock.getHours(),
									clock.getMinutes(),
									clock.getSeconds()
							  )}
					</p>
				)}
			</div>
		</>
	);
};

export default TimeClock;
