import { use } from 'react';
import { SettingsContext } from '../../../App';
import { MONTHS_EN, MONTHS_GENITIVE } from '../../../constants/months';
import { NAMEDAYS, NAMEDAYS_EN } from '../../../constants/namedays';
import {
	getLanguageSettings,
	getLocalTimeSettings,
} from '../../options/settings/settingsUtils';
import { getWeekday, getWeekNumber } from './timeUtils';

/*
 *	Component that displays the current date, week number, weekday, and nameday.
 *	@returns {JSX:Element}
 */
const TimeDate = () => {
	const { date, localTime } = use(SettingsContext);

	const displayedDate = getLocalTimeSettings() === 'on' ? localTime : date;
	const todayNameday: string =
		getLanguageSettings() === 'cs'
			? NAMEDAYS[displayedDate.getMonth()][displayedDate.getDate() - 1]
			: NAMEDAYS_EN[displayedDate.getMonth()][displayedDate.getDate() - 1];
	const tomorrowNameday: string =
		getLanguageSettings() === 'cs'
			? displayedDate.getDate() === 31 && displayedDate.getMonth() === 11
				? NAMEDAYS[0][0]
				: NAMEDAYS[displayedDate.getMonth()][displayedDate.getDate()]
				? NAMEDAYS[displayedDate.getMonth()][displayedDate.getDate()]
				: NAMEDAYS[displayedDate.getMonth() + 1][0]
			: displayedDate.getDate() === 31 && displayedDate.getMonth() === 11
			? NAMEDAYS_EN[0][0]
			: NAMEDAYS_EN[displayedDate.getMonth()][displayedDate.getDate()]
			? NAMEDAYS_EN[displayedDate.getMonth()][displayedDate.getDate()]
			: NAMEDAYS_EN[displayedDate.getMonth() + 1][0];

	return (
		<div className="mt-5">
			<p className="text-2xl 2xl:text-4xl">
				{displayedDate.getDate()}
				{getLanguageSettings() === 'cs'
					? '. ' + MONTHS_GENITIVE[displayedDate.getMonth()]
					: ' ' + MONTHS_EN[displayedDate.getMonth()]}{' '}
				{displayedDate.getFullYear()}
			</p>
			<p className="text-2xl mt-4">
				<span>
					{' '}
					{getLanguageSettings() === 'cs'
						? getWeekNumber(displayedDate) + '. týden'
						: 'Week ' + getWeekNumber(displayedDate)}
				</span>
				<span className="mx-1"> &#9679; </span>
				<span>{getWeekday(displayedDate)}</span>
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
