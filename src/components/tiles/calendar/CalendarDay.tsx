type TypeCalendarDayProps = {
	day: number;
	current: boolean;
	today: boolean;
};

/*
 *	Component that displays a calendar day. Calendar day displayed in the calendar. If the the is in current month, the text color is different. For the current day, the text is bold.
 *	@typedef {object} TypeCalendarDayProps
 *	@property {number} day – The day.
 *	@property {boolean} current – If the day is in current month.
 *	@property {boolean} today – If the day is today.
 *	@returns {JSX:Element}
 */
const CalendarDay = ({ day, current, today }: TypeCalendarDayProps) => {
	return (
		<div
			className={`${current ? '' : 'opacity-50'} ${
				today ? 'font-bold' : ''
			} py-1 px-2 flex justify-center items-center`}
		>
			{day}
		</div>
	);
};

export default CalendarDay;
