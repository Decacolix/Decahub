import { use, useEffect, useState } from 'react';
import { SettingsContext } from '../../../App';
import { MONTHS_DEFAULT, MONTHS_EN } from '../../../constants/months';
import {
	calculateYearRange,
	getBackgroundColor,
	getCurrentMonthDays,
	getCurrentMonthFirstWeekday,
	getPreviousMonthDays,
} from './calendarUtils';
import CalendarDay from './CalendarDay';
import CalendarDayInfo from './CalendarDayInfo';
import { getLanguageSettings } from '../../options/settings/settingsUtils';

type TypeViews = 'month' | 'year' | 'years';

const startYear: number = 1900;
const endYear: number = 2151;

/* Calendar tile has three different views, that can be switched by clicking on the header of the calendar. Month view displays list of days of the current month, year view displays list of months of the year, and years view displays list of 12 years. */
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

	const [hoverInfo, setHoverInfo] = useState<{
		month: number;
		day: number;
		weekday: number;
		x: number;
		y: number;
		display: boolean;
	}>({ month: 1, day: 1, weekday: 0, x: 0, y: 0, display: false });

	/* Decrease the number of the current month or year or years, depending on the current view. */
	const handleLeftArrowClick = (): void => {
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

	/* Increase the number of the current month or year or years, depending on the current view. */
	const handleRightArrowClick = (): void => {
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

	/* Change the view between month, year and years view. */
	const handleViewChange = (): void => {
		if (currentView === 'month') setCurrentView('year');
		if (currentView === 'year') setCurrentView('years');
	};

	/* Display information about the day of the month when hovered with cursor. */
	const handleHoverDay = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void => {
		const month: number = e.currentTarget.id.split('-')[0] as unknown as number;
		const day: number = e.currentTarget.id.split('-')[1] as unknown as number;
		const weekday: number = e.currentTarget.id.split(
			'-'
		)[2] as unknown as number;

		setHoverInfo({
			month: month,
			weekday: weekday,
			day: day,
			x: e.currentTarget.offsetTop - 100,
			y: e.currentTarget.offsetLeft,
			display: true,
		});

		e.currentTarget.style.backgroundColor = getBackgroundColor().hex;
	};

	/* Set the displayed month days when the current month or year changes.  */
	useEffect(() => {
		setPreviousMonthDays([]);

		let firstWeekday: number = getCurrentMonthFirstWeekday(
			currentMonth,
			currentYear
		);
		firstWeekday = firstWeekday === 0 ? firstWeekday + 5 : firstWeekday - 2;

		for (let i: number = 0; i <= firstWeekday; i++) {
			setPreviousMonthDays(prevPreviousMonthDays => [
				...prevPreviousMonthDays,
				getPreviousMonthDays(currentMonth, currentYear) - firstWeekday + i,
			]);
		}
	}, [currentMonth, currentYear]);

	return (
		<div className="flex flex-col justify-between items-center h-[100%]">
			<div className="flex justify-between mt-4 2xl:mt-8">
				<div
					className={`${
						minimumReached
							? 'opacity-0 pointer-events-none'
							: 'opacity-100 pointer-events-auto'
					} bg-[url(src/assets/icons/arrow-left.svg)] h-[100%] w-14 bg-no-repeat bg-center bg-size-[30%] absolute left-0 top-[50%] translate-y-[-50%] hover:cursor-pointer hover:opacity-50`}
					onClick={() => handleLeftArrowClick()}
				/>
				<div
					className={`${
						currentView === 'years'
							? ''
							: 'hover:cursor-pointer hover:opacity-50'
					} text-2xl absolute left-[50%] translate-x-[-50%]`}
					onClick={() => handleViewChange()}
				>
					{currentView === 'month'
						? `${(getLanguageSettings() === 'cs'
								? MONTHS_DEFAULT[currentMonth]
								: MONTHS_EN[currentMonth]
						  ).toUpperCase()} ${currentYear}`
						: currentView === 'year'
						? currentYear
						: `${currentYearRange} – ${currentYearRange + 11}`}
				</div>
				<div
					className={`${
						maximumReached
							? 'opacity-0 pointer-events-none'
							: 'opacity-100 pointer-events-auto'
					} bg-[url(src/assets/icons/arrow-right.svg)] h-[100%] w-14 bg-no-repeat bg-center bg-size-[30%] absolute right-0 top-[50%] translate-y-[-50%] hover:cursor-pointer hover:opacity-50`}
					onClick={() => handleRightArrowClick()}
				/>
			</div>
			{currentView === 'month' ? (
				<div className="grid grid-cols-7 gap-3 2xl:gap-8 mb-8 text-center max-w-[75%]">
					{hoverInfo.display ? (
						<CalendarDayInfo
							day={hoverInfo.day - 1}
							month={hoverInfo.month - 1}
							weekday={hoverInfo.weekday}
							x={hoverInfo.x}
							y={hoverInfo.y}
						/>
					) : (
						''
					)}
					<div>{getLanguageSettings() === 'cs' ? 'PO' : 'MO'}</div>
					<div>{getLanguageSettings() === 'cs' ? 'ÚT' : 'TU'}</div>
					<div>{getLanguageSettings() === 'cs' ? 'ST' : 'WE'}</div>
					<div>{getLanguageSettings() === 'cs' ? 'ČT' : 'TH'}</div>
					<div>{getLanguageSettings() === 'cs' ? 'PÁ' : 'FR'}</div>
					<div>{getLanguageSettings() === 'cs' ? 'SO' : 'SA'}</div>
					<div>{getLanguageSettings() === 'cs' ? 'NE' : 'SU'}</div>
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
								className="rounded-b-2xl hover:cursor-pointer"
								id={`${currentMonth + 1}-${i + 1}-${new Date(
									currentYear,
									currentMonth,
									i
								).getDay()}`}
								key={i}
								onMouseLeave={e => {
									setHoverInfo({ ...hoverInfo, display: false });
									e.currentTarget.style.backgroundColor = 'inherit';
								}}
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
			) : null}
			{currentView === 'year' ? (
				<div className="grid grid-cols-3 gap-8 mb-12 text-center">
					{(getLanguageSettings() === 'cs' ? MONTHS_DEFAULT : MONTHS_EN).map(
						(month, index) => {
							return (
								<div
									className="my-6 hover:cursor-pointer hover:opacity-50"
									key={month}
									onClick={() => {
										setCurrentMonth(index);
										setCurrentView('month');
									}}
								>
									{month.toUpperCase()}
								</div>
							);
						}
					)}
				</div>
			) : null}
			{currentView === 'years' ? (
				<div className="grid grid-cols-3 gap-8 mb-12 text-center">
					{Array.from({ length: 12 }, (_, i) => (
						<div
							className="my-6 mx-8 hover:cursor-pointer hover:opacity-50"
							key={i}
							onClick={() => {
								setCurrentYear(currentYearRange + i);
								setCurrentView('year');
							}}
						>
							{currentYearRange + i}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default CalendarTile;
