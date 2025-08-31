import { use, useEffect } from 'react';
import { formatClock } from './timeUtils';
import type { TypeGrid } from '../../layout/Grid';
import { SettingsContext } from '../../../App';

const formatTimezone = (value: number | undefined): string => {
	if (!value) return '';

	const isNegative: boolean = value < 0 ? true : false;
	const utcNegative: string = 'UTC: -';
	const uctPositive: string = 'UTC: +';

	let convertedValue: string = (value / 3600).toString();

	if (isNegative) {
		convertedValue = convertedValue.substring(1);
	}

	if (convertedValue.includes('.')) {
		const index: number = convertedValue.indexOf('.');
		const resultLeft: string = convertedValue.slice(0, index);
		const resultRight: string = convertedValue.slice(index + 1);

		return (
			(isNegative ? utcNegative : uctPositive) +
			resultLeft.padStart(2, '0') +
			':' +
			(('.' + resultRight) as unknown as number) * 60
		);
	}

	return (
		(isNegative ? utcNegative : uctPositive) +
		convertedValue.padStart(2, '0') +
		':' +
		'00'
	);
};

const TimeClock = ({ clockErrorMessage, timezoneErrorMessage }: TypeGrid) => {
	const { clock, setClock, timezoneInfo } = use(SettingsContext);

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
						{'Nepodařilo se načíst časová pásma. Chyba: ' +
							timezoneErrorMessage}
					</p>
				) : (
					<p>
						<span>{formatTimezone(timezoneInfo.currentUtcOffset)}</span>
						<span>
							{timezoneInfo.isDayLightSavingActive ? ' (letní čas)' : ''}
						</span>
					</p>
				)}
			</div>
			<div>
				{clockErrorMessage ? (
					<p>{'Nepodařilo se načíst hodiny. Chyba: ' + clockErrorMessage}</p>
				) : (
					<p className="font-[Chivo_Mono] text-7xl">
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
