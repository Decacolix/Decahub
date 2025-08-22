import { use } from 'react';
import { TimeContext } from '../../../App';
import { MONTHS_GENITIVE } from '../../../constants/months';
import { WEEKDAYS } from '../../../constants/weekdays';
import { NAMEDAYS } from '../../../constants/namedays';

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

const Day = () => {
	const { date } = use(TimeContext);

	let weekday: string = '';

	switch (date.getDay()) {
		case 0:
			weekday = WEEKDAYS[6];
			break;
		case 1:
			weekday = WEEKDAYS[0];
			break;
		case 2:
			weekday = WEEKDAYS[1];
			break;
		case 3:
			weekday = WEEKDAYS[2];
			break;
		case 4:
			weekday = WEEKDAYS[3];
			break;
		case 5:
			weekday = WEEKDAYS[4];
			break;
		case 6:
			weekday = WEEKDAYS[5];
			break;
		default:
			break;
	}

	const todayNameday: string = NAMEDAYS[date.getMonth()][date.getDate() - 1];
	const tomorrowNameday: string =
		date.getDate() === 31 && date.getMonth() === 11
			? NAMEDAYS[0][0]
			: NAMEDAYS[date.getMonth()][date.getDate()]
			? NAMEDAYS[date.getMonth()][date.getDate()]
			: NAMEDAYS[date.getMonth() + 1][0];

	return (
		<div className=" mt-5">
			<p className="text-4xl">
				{date.getDate()}. {MONTHS_GENITIVE[date.getMonth()]}{' '}
				{date.getFullYear()}
			</p>
			<p className="text-2xl mt-4">
				<span> {getWeekNumber(date)}. týden</span>
				<span className="mx-1"> &#9679; </span>
				<span>{weekday}</span>
			</p>
			<p className="mt-6 text-1xl">
				Dnes {todayNameday}, zítra {tomorrowNameday}
			</p>
		</div>
	);
};

export default Day;
