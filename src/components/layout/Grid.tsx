import CalendarTile from '../tiles/calendar/CalendarTile';
import NewsTile from '../tiles/news/NewsTile';
import TimeTile from '../tiles/time/TimeTile';
import WeatherTile from '../tiles/weather/WeatherTile';
import TileFrame from '../tiles/ui/TileFrame';
import RateTile from '../tiles/rates/RateTile';

export type TypeGridProps = {
	clockErrorMessage: string;
	timezoneErrorMessage: string;
};

/*
 *	Component that displays the grid of the page, containing the tiles. On the largest screens, the grid has 2 rows and 3 columns, on medium to large screens, it has 3 rows and 2 columns, and on the smallest screens, it has 6 rows and 1 column.
 *	@typedef {object} TypeGridProps
 *	@property {string} clockErrorMessage – Error message if the clock is not loaded.
 *	@property {string} timezoneErrorMessage – Error message if the timezone is not loaded.
 *	@returns {JSX:Element}
 */
const Grid = ({ clockErrorMessage, timezoneErrorMessage }: TypeGridProps) => {
	const topHeight: string = 'h-[25rem] 2xl:h-[25rem]';
	const bottomHeight: string = 'h-[25rem] 2xl:h-[35rem]';

	return (
		<div className="grid lg:grid-cols-3 gap-4 lg:gap-4 2xl:gap-8 py-4 2xl:py-6 lg:px-4 2xl:px-20">
			<div className="order-3 lg:order-1">
				<TileFrame height={topHeight} z="z-1">
					<WeatherTile />
				</TileFrame>
			</div>
			<div className="order-1 lg:order-2">
				<TileFrame height={topHeight} z="z-1">
					<TimeTile
						clockErrorMessage={clockErrorMessage}
						timezoneErrorMessage={timezoneErrorMessage}
					/>
				</TileFrame>
			</div>
			<div className="order-4 lg:order-3">
				<TileFrame height={topHeight} z="z-1">
					<NewsTile />
				</TileFrame>
			</div>
			<div className="order-5 lg:order-4">
				<TileFrame height={bottomHeight} z="z-1">
					<RateTile source="currency" />
				</TileFrame>
			</div>
			<div className="order-2 lg:order-5">
				<TileFrame height={bottomHeight} z="z-2">
					<CalendarTile />
				</TileFrame>
			</div>
			<div className="order-6 lg:order-6">
				<TileFrame height={bottomHeight} z="z-1">
					<RateTile source="crypto" />
				</TileFrame>
			</div>
		</div>
	);
};

export default Grid;
