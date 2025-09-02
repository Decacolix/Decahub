import { use } from 'react';
import { SettingsContext } from '../../../App';
import { MONTHS_EN, MONTHS_GENITIVE } from '../../../constants/months';
import { WEEKDAYS_DEFAULT, WEEKDAYS_EN } from '../../../constants/weekdays';
import { NAMEDAYS, NAMEDAYS_EN } from '../../../constants/namedays';
import { getLanguageSettings } from '../../options/settings/settingsUtils';

const getWeekNumber = (date: Date): number => {
	const firstYearDay: Date = new Date(date.getFullYear(), 0, 1);
	const today: Date = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	);
	const dayOfYear: number =
		(today.getTime() - firstYearDay.getTime() + 86400000) / 86400000;
	return Math.ceil(dayOfYear / 7);
};

const TimeDate = () => {
	const { date } = use(SettingsContext);

	let weekday: string = '';

	switch (date.getDay()) {
		case 0:
			weekday =
				getLanguageSettings() === 'cs' ? WEEKDAYS_DEFAULT[6] : WEEKDAYS_EN[6];
			break;
		case 1:
			weekday =
				getLanguageSettings() === 'cs' ? WEEKDAYS_DEFAULT[0] : WEEKDAYS_EN[0];
			break;
		case 2:
			weekday =
				getLanguageSettings() === 'cs' ? WEEKDAYS_DEFAULT[1] : WEEKDAYS_EN[1];
			break;
		case 3:
			weekday =
				getLanguageSettings() === 'cs' ? WEEKDAYS_DEFAULT[2] : WEEKDAYS_EN[2];
			break;
		case 4:
			weekday =
				getLanguageSettings() === 'cs' ? WEEKDAYS_DEFAULT[3] : WEEKDAYS_EN[3];
			break;
		case 5:
			weekday =
				getLanguageSettings() === 'cs' ? WEEKDAYS_DEFAULT[4] : WEEKDAYS_EN[4];
			break;
		case 6:
			weekday =
				getLanguageSettings() === 'cs' ? WEEKDAYS_DEFAULT[5] : WEEKDAYS_EN[5];
			break;
		default:
			break;
	}

	const todayNameday: string =
		getLanguageSettings() === 'cs'
			? NAMEDAYS[date.getMonth()][date.getDate() - 1]
			: NAMEDAYS_EN[date.getMonth()][date.getDate() - 1];
	const tomorrowNameday: string =
		getLanguageSettings() === 'cs'
			? date.getDate() === 31 && date.getMonth() === 11
				? NAMEDAYS[0][0]
				: NAMEDAYS[date.getMonth()][date.getDate()]
				? NAMEDAYS[date.getMonth()][date.getDate()]
				: NAMEDAYS[date.getMonth() + 1][0]
			: date.getDate() === 31 && date.getMonth() === 11
			? NAMEDAYS_EN[0][0]
			: NAMEDAYS_EN[date.getMonth()][date.getDate()]
			? NAMEDAYS_EN[date.getMonth()][date.getDate()]
			: NAMEDAYS_EN[date.getMonth() + 1][0];

	return (
		<div className=" mt-5">
			<p className="text-4xl">
				{date.getDate()}
				{getLanguageSettings() === 'cs'
					? '. ' + MONTHS_GENITIVE[date.getMonth()]
					: ' ' + MONTHS_EN[date.getMonth()]}{' '}
				{date.getFullYear()}
			</p>
			<p className="text-2xl mt-4">
				<span>
					{' '}
					{getLanguageSettings() === 'cs'
						? getWeekNumber(date) + ' . týden'
						: 'Week ' + getWeekNumber(date)}
				</span>
				<span className="mx-1"> &#9679; </span>
				<span>{weekday}</span>
			</p>
			<p className="mt-6 px-1 text-1xl">
				{getLanguageSettings() === 'cs'
					? `Dnes ${todayNameday}, zítra ${tomorrowNameday}`
					: `Today ${todayNameday}, tomorrow ${tomorrowNameday}`}
			</p>
		</div>
	);
};

export default TimeDate;
