import { use } from 'react';
import { SettingsContext } from '../../../App';

/* Info icon for the menu. */
const InfoIcon = () => {
	const { setInfoDisplayed } = use(SettingsContext);

	/* Set the info panel to be displayed on click of the icon. */
	const handleInfoOpen = (): void => {
		setInfoDisplayed(prevInfoDisplayed => !prevInfoDisplayed);
	};

	return (
		<div
			className="bg-[url(./assets/icons/info-icon.svg)] bg-no-repeat bg-center h-6 w-7 mb-2 hover:cursor-pointer hover:opacity-50"
			onClick={() => handleInfoOpen()}
		/>
	);
};

export default InfoIcon;
