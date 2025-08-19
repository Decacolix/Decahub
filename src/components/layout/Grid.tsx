import CalendarTile from '../tiles/CalendarTile';
import CryptoTile from '../tiles/CryptoTile';
import CurrencyTile from '../tiles/CurrencyTile';
import NewsTile from '../tiles/NewsTile';
import TimeTile from '../tiles/time/TimeTile';
import WeatherTile from '../tiles/WeatherTile';
import TileFrame from '../tiles/ui/TileFrame';

const Grid = () => {
	return (
		<div className="grid grid-cols-3 gap-8 pt-4 px-20">
			<TileFrame>
				<CurrencyTile />
			</TileFrame>
			<TileFrame>
				<TimeTile />
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
