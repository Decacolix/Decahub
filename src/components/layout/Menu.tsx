import { use } from 'react';
import Lock from '../options/lock/LockIcon';
import SettingsIcon from '../options/settings/SettingsIcon';
import { SettingsDisplayedContext } from '../../App';

const Menu = () => {
	const { settingsDisplayed } = use(SettingsDisplayedContext);

	return (
		!settingsDisplayed && (
			<div className="flex-col absolute right-2 top-4 bg-black/30 backdrop-blur-sm p-2 rounded-4xl z-50">
				<SettingsIcon />
				<Lock />
			</div>
		)
	);
};

export default Menu;
