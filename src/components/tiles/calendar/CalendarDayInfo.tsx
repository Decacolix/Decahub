import { MONTHS_EN, MONTHS_GENITIVE } from '../../../constants/months';
import { NAMEDAYS, NAMEDAYS_EN } from '../../../constants/namedays';
import { WEEKDAYS_ACCUSATIVE, WEEKDAYS_EN } from '../../../constants/weekdays';
import { getLanguageSettings } from '../../options/settings/settingsUtils';
import { getBackgroundColor } from './calendarUtils';

type TypeCalendarDayInfo = {
	month: number;
	day: number;
	weekday: number;
	x: number;
	y: number;
};

const CalendarDayInfo = ({
	month,
	day,
	weekday,
	x,
	y,
}: TypeCalendarDayInfo) => {
	console.log();
	return (
		<div
			className={`${
				getBackgroundColor().name
			} h-[100px] w-[200px] flex flex-col justify-center items-center z-3 absolute translate-x-[-45%] pointer-events-none p-2 rounded-2xl select-none`}
			style={{ top: `${x}px`, left: `${y}px` }}
		>
			{getLanguageSettings() === 'cs' ? (
				<>
					<p>{`${+weekday === 2 || +weekday === 3 ? 'Ve' : 'V'} ${
						WEEKDAYS_ACCUSATIVE[weekday]
					} ${day + 1}. ${MONTHS_GENITIVE[month]}
			`}</p>
					<p>{NAMEDAYS[month][day]}</p>
				</>
			) : (
				<>
					<p>{`${WEEKDAYS_EN[weekday]}, ${day + 1} ${MONTHS_EN[month]}
			`}</p>
					<p>{NAMEDAYS_EN[month][day]}</p>
				</>
			)}
		</div>
	);
};

export default CalendarDayInfo;
