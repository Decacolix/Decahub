import { use } from 'react';
import type { TypeGrid } from '../../layout/Grid';
import TimeClock from './TimeClock';
import TimeDay from './TimeDate';
import Loader from '../../layout/Loader';
import { SettingsContext } from '../../../App';
import Author from '../../layout/Author';
import {
	getLanguageSettings,
	getLocalTimeSettings,
} from '../../options/settings/settingsUtils';

/* The tile to display the clock and the date, and also the information about the author. */
const TimeTile = ({ clockErrorMessage, timezoneErrorMessage }: TypeGrid) => {
	const { isTimeLoading } = use(SettingsContext);

	return (
		<>
			<Author />
			<div className="text-center">
				{isTimeLoading && getLocalTimeSettings() === 'off' ? (
					<Loader
						infoText={
							getLanguageSettings() === 'cs'
								? 'Pokud se čas načítá příliš dlouho, v nastavení můžete přepnout na lokální čas.'
								: 'If the time takes too long to load, you can switch to local time in the settings.'
						}
					/>
				) : (
					<>
						<TimeClock
							clockErrorMessage={clockErrorMessage}
							timezoneErrorMessage={timezoneErrorMessage}
						/>
						<TimeDay />
					</>
				)}
			</div>
		</>
	);
};

export default TimeTile;
