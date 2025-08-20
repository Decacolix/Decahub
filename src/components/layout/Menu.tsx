import { use } from 'react';
import Lock from '../options/lock/LockIcon';
import SettingsIcon from '../options/settings/SettingsIcon';
import { SettingsDisplayedContext } from '../../App';

const Menu = () => {
	const { settingsDisplayed } = use(SettingsDisplayedContext);

	const menuStyles: string =
		(settingsDisplayed ? 'translate-y-[-150%]' : 'translate-y-0') +
		' flex-col absolute right-2 top-4 bg-black/30 backdrop-blur-sm p-2 rounded-4xl z-50 duration-500';

	return (
		<div className={menuStyles}>
			<SettingsIcon />
			<Lock />
		</div>
	);
};

export default Menu;
