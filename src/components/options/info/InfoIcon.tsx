import { use } from 'react';
import { SettingsContext } from '../../../App';

const InfoIcon = () => {
	const { setInfoDisplayed } = use(SettingsContext);

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
