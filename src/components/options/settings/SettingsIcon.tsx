import { use } from 'react';
import { SettingsContext } from '../../../App';

/*
 *	Component that displays an icon for settings.
 *	@returns {JSX:Element}
 */
const SettingsIcon = () => {
	const { setSettingsDisplayed } = use(SettingsContext);

	/*
	 *	Function that handles the click on the icon.
	 *	@returns {void}
	 */
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
