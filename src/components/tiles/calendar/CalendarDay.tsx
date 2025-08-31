type TypeCalendarDay = {
	day: number;
	current: boolean;
	today: boolean;
};

const CalendarDay = ({ day, current, today }: TypeCalendarDay) => {
	return (
		<div
			className={`${current ? '' : 'opacity-50'} ${today ? 'font-bold' : ''}`}
		>
			{day}
		</div>
	);
};

export default CalendarDay;
