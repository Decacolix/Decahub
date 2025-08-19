import { useEffect } from 'react';
import { fetchTime } from './components/tiles/time/timeUtils';

const Test = () => {
	useEffect(() => {
		(async () => {
			try {
				const time = await fetchTime('Europe/Prague');
				if (time.failed) {
					throw new Error();
				} else {
					console.log(time.year);
				}
			} catch (error) {
				console.log('FETCH ERROR :' + error);
			}
		})();
	}, []);

	return <div>Test</div>;
};

export default Test;
