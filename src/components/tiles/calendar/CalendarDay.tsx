type TypeCalendarDay = {
	day: number;
	current: boolean;
	today: boolean;
};

/* One calendar day displayed in the calendar. If the the is in current month, the text color is different. For the current day, the text is bold. */
const CalendarDay = ({ day, current, today }: TypeCalendarDay) => {
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
