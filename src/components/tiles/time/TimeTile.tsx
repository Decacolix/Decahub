import { use } from 'react';
import type { TypeGrid } from '../../layout/Grid';
import Clock from './Clock';
import Date from './Date';
import Loader from '../../layout/Loader';
import { TimeContext } from '../../../App';

const TimeTile = ({ clockErrorMessage, timezoneErrorMessage }: TypeGrid) => {
	const { isTimeLoading } = use(TimeContext);

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
					<Date />
				</>
			)}
		</div>
	);
};

export default TimeTile;
