import { use } from 'react';
import SettingsIcon from '../options/settings/SettingsIcon';
import { SettingsContext } from '../../App';
import InfoIcon from '../options/info/InfoIcon';

/* Menu of the page, containing the settings icon and the info icon. The menu is displayed only if the settings panel and the info panel are not displayed. */
const Menu = () => {
	const { settingsDisplayed, infoDisplayed } = use(SettingsContext);

	const menuStyles: string =
		(settingsDisplayed || infoDisplayed
			? 'translate-y-[-150%] pointer-events-none opacity-0'
			: 'translate-y-0 pointer-events-auto') +
		' flex-col fixed right-2 top-4 bg-black/30 backdrop-blur-sm p-2 rounded-4xl z-10 duration-500';

	return (
		<div className={menuStyles}>
			<SettingsIcon />
			<InfoIcon />
		</div>
	);
};

export default Menu;
