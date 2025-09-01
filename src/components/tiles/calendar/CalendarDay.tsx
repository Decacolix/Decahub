type TypeCalendarDay = {
	day: number;
	current: boolean;
	today: boolean;
};

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
