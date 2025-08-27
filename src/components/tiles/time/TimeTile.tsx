import { use } from 'react';
import type { TypeGrid } from '../../layout/Grid';
import Clock from './Clock';
import Day from './Day';
import Loader from '../../layout/Loader';
import { SettingsContext } from '../../../App';

const TimeTile = ({ clockErrorMessage, timezoneErrorMessage }: TypeGrid) => {
	const { isTimeLoading } = use(SettingsContext);

	return (
		<div className="text-center">
			{isTimeLoading ? (
				<Loader size={7} />
			) : (
				<>
					<Clock
						clockErrorMessage={clockErrorMessage}
						timezoneErrorMessage={timezoneErrorMessage}
					/>
					<Day />
				</>
			)}
		</div>
	);
};

export default TimeTile;
