import { use } from 'react';
import { SettingsContext } from '../../../App';

/* Settings icon in the menu to display the settings panel. */
const SettingsIcon = () => {
	const { setSettingsDisplayed } = use(SettingsContext);

	/* Display the settings panel on click of the icon. */
	const handleSettingsOpen = (): void => {
		setSettingsDisplayed(prevSettingsDisplayed => !prevSettingsDisplayed);
	};

	return (
		<div
			className="bg-[url(./assets/icons/settings-icon.svg)] bg-no-repeat bg-center h-6 w-6 mt-2 mb-4 ml-0.5 rounded-4xl hover:cursor-pointer hover:opacity-50"
			onClick={() => handleSettingsOpen()}
		/>
	);
};

export default SettingsIcon;
