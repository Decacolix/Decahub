import { MONTHS_GENITIVE } from '../../../constants/months';
import { NAMEDAYS } from '../../../constants/namedays';
import { WEEKDAYS_ACCUSATIVE } from '../../../constants/weekdays';
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
	return (
		<div
			className={`${
				getBackgroundColor().name
			} h-[100px] w-[200px] flex flex-col justify-center items-center z-3 absolute translate-x-[-45%] pointer-events-none p-2 rounded-2xl select-none`}
			style={{ top: `${x}px`, left: `${y}px` }}
		>
			<p>{`V ${WEEKDAYS_ACCUSATIVE[weekday]} ${day + 1}. ${
				MONTHS_GENITIVE[month]
			}
			`}</p>
			<p>{NAMEDAYS[month][day]}</p>
		</div>
	);
};

export default CalendarDayInfo;
