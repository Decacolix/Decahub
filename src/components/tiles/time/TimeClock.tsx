import { use, useEffect } from 'react';
import { formatClock, formatTimezone } from './timeUtils';
import type { TypeGrid } from '../../layout/Grid';
import { SettingsContext } from '../../../App';
import { getLanguageSettings } from '../../options/settings/settingsUtils';

/* Display the clock with the current time based on the currently selected time zone. */
const TimeClock = ({ clockErrorMessage, timezoneErrorMessage }: TypeGrid) => {
	const { clock, setClock, timezoneInfo } = use(SettingsContext);

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
						<span>{formatTimezone(timezoneInfo.currentUtcOffset)}</span>
						<span>
							{timezoneInfo.isDayLightSavingActive
								? `${
										getLanguageSettings() === 'cs'
											? ' (letní čas)'
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
						{formatClock(
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
