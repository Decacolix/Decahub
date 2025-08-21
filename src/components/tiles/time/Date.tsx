import { use } from 'react';
import { TimeContext } from '../../../App';
import { MONTHS_GENITIVE } from '../../../constants/months';
import { WEEKDAYS } from '../../../constants/weekdays';

const Date = () => {
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

	return (
		<div className=" mt-5">
			<p className="text-2xl">{weekday}</p>
			<p className="text-3xl">{`${date.getDate()}. ${
				MONTHS_GENITIVE[date.getMonth()]
			} ${date.getFullYear()}`}</p>
		</div>
	);
};

export default Date;
