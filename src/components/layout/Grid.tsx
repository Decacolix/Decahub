import CalendarTile from '../tiles/calendar/CalendarTile';
import CryptoTile from '../tiles/CryptoTile';
import CurrencyTile from '../tiles/CurrencyTile';
import NewsTile from '../tiles/news/NewsTile';
import TimeTile from '../tiles/time/TimeTile';
import WeatherTile from '../tiles/weather/WeatherTile';
import TileFrame from '../tiles/ui/TileFrame';

export type TypeGrid = {
	clockErrorMessage: string;
	timezoneErrorMessage: string;
};

const Grid = ({ clockErrorMessage, timezoneErrorMessage }: TypeGrid) => {
	return (
		<div className="grid grid-cols-3 gap-8 pt-4 px-20">
			<TileFrame>
				<CurrencyTile />
			</TileFrame>
			<TileFrame>
				<TimeTile
					clockErrorMessage={clockErrorMessage}
					timezoneErrorMessage={timezoneErrorMessage}
				/>
			</TileFrame>
			<TileFrame>
				<WeatherTile />
			</TileFrame>
			<TileFrame>
				<CryptoTile />
			</TileFrame>
			<TileFrame>
				<CalendarTile />
			</TileFrame>
			<TileFrame>
				<NewsTile />
			</TileFrame>
		</div>
	);
};

export default Grid;
