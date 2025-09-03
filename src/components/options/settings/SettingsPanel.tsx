import { use } from 'react';
import SettingsCrypto from './SettingsCrypto';
import SettingsCurrency from './SettingsCurrency';
import SettingsTheme from './SettingsTheme';
import SettingsTime from './SettingsTime';
import SettingsWeather from './SettingsWeather';
import { SettingsContext } from '../../../App';
import SettingsNews from './SettingsNews';
import SettingsAnimation from './SettingsAnimation';
import SettingsLanguage from './SettingsLanguage';
import confirmIcon from '../../../assets/icons/confirm-icon.svg';

/* Settings panel containing multiple settings for different sections of the page.  */
const SettingsPanel = () => {
	const { settingsDisplayed, setSettingsDisplayed } = use(SettingsContext);

	const panelStyles: string =
		(settingsDisplayed
			? 'translate-x-0 pointer-events-auto'
			: 'translate-x-full pointer-events-none opacity-0') +
		' fixed top-0 right-0 h-[100vh] 2xl:w-[30vw] bg-black/40 backdrop-blur-sm pt-16 pb-4 z-20 duration-500 overflow-y-scroll';

	/* Hide the settings panel on click of the check icon. */
	const handleSettingsClose = (): void => {
		setSettingsDisplayed(prevSettingsDisplayed => !prevSettingsDisplayed);
	};

	return (
		<div className={panelStyles}>
			<div
				className="bg-no-repeat bg-center h-6 w-6 absolute top-6 right-6 hover:cursor-pointer hover:opacity-50"
				onClick={() => handleSettingsClose()}
				style={{ backgroundImage: `url("${confirmIcon}")` }}
			/>
			<SettingsLanguage />
			<SettingsTheme />
			<SettingsTime />
			<SettingsNews />
			<SettingsWeather />
			<SettingsCurrency />
			<SettingsCrypto />
			<SettingsAnimation />
		</div>
	);
};

export default SettingsPanel;
