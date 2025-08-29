import CalendarTile from '../tiles/calendar/CalendarTile';
import NewsTile from '../tiles/news/NewsTile';
import TimeTile from '../tiles/time/TimeTile';
import WeatherTile from '../tiles/weather/WeatherTile';
import TileFrame from '../tiles/ui/TileFrame';
import RateTile from '../tiles/rates/RateTile';

export type TypeGrid = {
	clockErrorMessage: string;
	timezoneErrorMessage: string;
};

const Grid = ({ clockErrorMessage, timezoneErrorMessage }: TypeGrid) => {
	const topHeight: string = 'h-[25rem]';
	const bottomHeight: string = 'h-[35rem]';

	return (
		<div className="grid grid-cols-3 gap-8 py-6 px-20">
			<TileFrame height={topHeight}>
				<WeatherTile />
			</TileFrame>

			<TileFrame height={topHeight}>
				<TimeTile
					clockErrorMessage={clockErrorMessage}
					timezoneErrorMessage={timezoneErrorMessage}
				/>
			</TileFrame>
			<TileFrame height={topHeight}>
				<NewsTile />
			</TileFrame>
			<TileFrame height={bottomHeight}>
				<RateTile source="currency" />
			</TileFrame>
			<TileFrame height={bottomHeight}>
				<CalendarTile />
			</TileFrame>
			<TileFrame height={bottomHeight}>
				<RateTile source="crypto" />
			</TileFrame>
		</div>
	);
};

export default Grid;
