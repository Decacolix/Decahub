import { use } from 'react';
import SettingsCrypto from './SettingsCrypto';
import SettingsCurrency from './SettingsCurrency';
import SettingsTheme from './SettingsTheme';
import SettingsTime from './SettingsTime';
import SettingsWeather from './SettingsWeather';
import { SettingsDisplayedContext } from '../../../App';

const SettingsPanel = () => {
	const { settingsDisplayed, setSettingsDisplayed } = use(
		SettingsDisplayedContext
	);

	const handleSettingsClose = (): void => {
		setSettingsDisplayed(prevSettingsDisplayed => !prevSettingsDisplayed);
	};

	const panelStyles: string =
		(settingsDisplayed ? 'translate-x-0' : 'translate-x-full') +
		' absolute top-0 right-0 h-[100vh] w-[30vw] bg-black/30 backdrop-blur-sm z-50 duration-500';

	console.log(panelStyles);

	return (
		<div className={panelStyles}>
			<div
				className="bg-[url(./assets/icons/confirm-icon.svg)] bg-no-repeat bg-center h-5 w-5 absolute top-2 right-2 hover:cursor-pointer hover:opacity-50"
				onClick={() => handleSettingsClose()}
			/>
			<SettingsTheme />
			<SettingsTime />
			<SettingsWeather />
			<SettingsCurrency />
			<SettingsCrypto />
		</div>
	);
};

export default SettingsPanel;
