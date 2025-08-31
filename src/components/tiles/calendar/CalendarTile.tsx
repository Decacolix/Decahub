import { use, useEffect, useState } from 'react';
import { SettingsContext } from '../../../App';
import { MONTHS_DEFAULT } from '../../../constants/months';
import {
	calculateYearRange,
	getCurrentMonthDays,
	getCurrentMonthFirstWeekday,
	getPreviousMonthDays,
} from './calendarUtils';
import CalendarDay from './CalendarDay';
import { NAMEDAYS } from '../../../constants/namedays';

type TypeViews = 'month' | 'year' | 'years';

const startYear: number = 1900;
const endYear: number = 2151;

const CalendarTile = () => {
	const { date } = use(SettingsContext);
	const [currentView, setCurrentView] = useState<TypeViews>('month');
	const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
	const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());
	const [currentYearRange, setCurrentYearRange] = useState<number>(
		calculateYearRange(date.getFullYear())
	);
	const [minimumReached, setMinimumReached] = useState<boolean>(false);
	const [maximumReached, setMaximumReached] = useState<boolean>(false);

	const [previousMonthDays, setPreviousMonthDays] = useState<number[]>([]);

	const handleLeftArrowClick = () => {
		setMaximumReached(false);

		if (
			currentView === 'month' &&
			!(currentMonth === 0 && currentYear === startYear)
		) {
			setCurrentMonth(prevCurrentMonth =>
				currentMonth === 0 ? 11 : prevCurrentMonth - 1
			);
			setCurrentYear(prevCurrentYear =>
				currentMonth === 0 ? prevCurrentYear - 1 : prevCurrentYear
			);
			setCurrentYearRange(calculateYearRange(currentYear));
		}

		if (currentView === 'year' && currentYear !== startYear) {
			setCurrentYear(prevCurrentYear => prevCurrentYear - 1);
			setCurrentYearRange(calculateYearRange(currentYear));
		}

		if (currentView === 'years' && currentYearRange !== startYear) {
			setCurrentYearRange(prevCurrentYearRange => prevCurrentYearRange - 12);
		}

		if (
			(currentView === 'month' &&
				currentMonth === 0 &&
				currentYear === startYear) ||
			(currentView === 'years' && currentYearRange === startYear) ||
			(currentView === 'years' && currentYearRange === startYear + 12)
		) {
			setMinimumReached(true);
		}
	};

	const handleRightArrowClick = () => {
		setMinimumReached(false);

		if (
			currentView === 'month' &&
			!(currentMonth === 1 && currentYear === endYear)
		) {
			setCurrentMonth(prevCurrentMonth =>
				currentMonth === 11 ? 0 : prevCurrentMonth + 1
			);
			setCurrentYear(prevCurrentYear =>
				currentMonth === 11 ? prevCurrentYear + 1 : prevCurrentYear
			);
			setCurrentYearRange(calculateYearRange(currentYear));
		}

		if (currentView === 'year' && currentYear !== endYear) {
			setCurrentYear(prevCurrentYear => prevCurrentYear + 1);
			setCurrentYearRange(calculateYearRange(currentYear));
		}

		if (currentView === 'years' && currentYearRange !== endYear - 11) {
			setCurrentYearRange(prevCurrentYearRange => prevCurrentYearRange + 12);
		}

		if (
			(currentView === 'month' &&
				currentMonth === 1 &&
				currentYear === endYear) ||
			(currentView === 'years' && currentYear === endYear) ||
			(currentView === 'years' && currentYearRange === endYear - 12 - 11)
		) {
			setMaximumReached(true);
		}
	};

	const handleViewChange = () => {
		if (currentView === 'month') setCurrentView('year');
		if (currentView === 'year') setCurrentView('years');
	};

	const handleHoverDay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const month: number = e.currentTarget.id.split('-')[0] as unknown as number;
		const day: number = e.currentTarget.id.split('-')[1] as unknown as number;
		console.log(NAMEDAYS[month - 1][day - 1]);
		console.log(e.currentTarget.getBoundingClientRect().x);
		console.log(e.currentTarget.getBoundingClientRect().y);
	};

	useEffect(() => {
		setPreviousMonthDays([]);

		let firstWeekday: number = getCurrentMonthFirstWeekday(
			currentMonth,
			currentYear
		);
		firstWeekday = firstWeekday === 0 ? firstWeekday + 5 : firstWeekday - 2;

		for (let i = 0; i <= firstWeekday; i++) {
			setPreviousMonthDays(prevPreviousMonthDays => [
				...prevPreviousMonthDays,
				getPreviousMonthDays(currentMonth, currentYear) - firstWeekday + i,
			]);
		}
	}, [currentMonth]);

	return (
		<>
			<div className="flex justify-between items-center w-[100%]">
				<div
					className={`${
						minimumReached
							? 'opacity-0 pointer-events-none'
							: 'opacity-100 pointer-events-auto'
					} bg-[url(src/assets/icons/arrow-left.svg)] ml-12 h-8 w-8 bg-no-repeat bg-center hover:cursor-pointer hover:opacity-50 '}`}
					onClick={() => handleLeftArrowClick()}
				/>
				<div
					className={`${
						currentView === 'years'
							? ''
							: 'hover:cursor-pointer hover:opacity-50'
					} text-2xl`}
					onClick={() => handleViewChange()}
				>
					{currentView === 'month'
						? `${MONTHS_DEFAULT[currentMonth].toUpperCase()} ${currentYear}`
						: currentView === 'year'
						? currentYear
						: `${currentYearRange} – ${currentYearRange + 11}`}
				</div>
				<div
					className={`${
						maximumReached
							? 'opacity-0 pointer-events-none'
							: 'opacity-100 pointer-events-auto'
					} bg-[url(src/assets/icons/arrow-right.svg)] mr-12 h-8 w-8 bg-no-repeat bg-center hover:cursor-pointer hover:opacity-50 '}`}
					onClick={() => handleRightArrowClick()}
				/>
			</div>
			<div className="grid grid-cols-7 gap-8 mt-12 text-center">
				<div>PO</div>
				<div>ÚT</div>
				<div>ST</div>
				<div>ČT</div>
				<div>PÁ</div>
				<div>SO</div>
				<div>NE</div>
				{previousMonthDays.map(i => {
					return (
						<div key={i}>
							<CalendarDay current={false} day={i} today={false} />
						</div>
					);
				})}
				{Array.from(
					{ length: getCurrentMonthDays(currentMonth, currentYear) },
					(_, i) => (
						<div
							className="hover: cursor-pointer"
							id={`${currentMonth + 1}-${i + 1}`}
							key={i}
							onMouseOver={e => handleHoverDay(e)}
						>
							<CalendarDay
								current={true}
								day={i + 1}
								today={
									currentYear === date.getFullYear() &&
									currentMonth === date.getMonth() &&
									i + 1 === date.getDate()
										? true
										: false
								}
							/>
						</div>
					)
				)}
				{Array.from(
					{
						length:
							42 -
							(previousMonthDays.length +
								getCurrentMonthDays(currentMonth, currentYear)),
					},
					(_, i) => (
						<div key={i}>
							<CalendarDay current={false} day={i + 1} today={false} />
						</div>
					)
				)}
			</div>
		</>
	);
};

export default CalendarTile;
