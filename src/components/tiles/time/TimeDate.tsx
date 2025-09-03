import { use } from 'react';
import { SettingsContext } from '../../../App';
import { MONTHS_EN, MONTHS_GENITIVE } from '../../../constants/months';
import { NAMEDAYS, NAMEDAYS_EN } from '../../../constants/namedays';
import { getLanguageSettings } from '../../options/settings/settingsUtils';
import { getWeekday, getWeekNumber } from './timeUtils';

/* Display the current date, week number, weekday, and nameday. */
const TimeDate = () => {
	const { date } = use(SettingsContext);

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
						? getWeekNumber(date) + '. týden'
						: 'Week ' + getWeekNumber(date)}
				</span>
				<span className="mx-1"> &#9679; </span>
				<span>{getWeekday(date)}</span>
			</p>
			<p className="mt-6 px-2 text-1xl">
				{getLanguageSettings() === 'cs'
					? `Dnes ${todayNameday}, zítra ${tomorrowNameday}`
					: `Today ${todayNameday}, tomorrow ${tomorrowNameday}`}
			</p>
		</div>
	);
};

export default TimeDate;
