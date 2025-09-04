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
import SettingsLocalTime from './SettingsLocalTime';

/*
 *	Component that displays different settings sections.
 *	@returns {JSX:Element}
 */
const SettingsPanel = () => {
	const { settingsDisplayed, setSettingsDisplayed } = use(SettingsContext);

	const panelStyles: string =
		(settingsDisplayed
			? 'translate-x-0 pointer-events-auto'
			: 'translate-x-full pointer-events-none opacity-0') +
		' fixed top-0 right-0 h-[100vh] 2xl:w-[30vw] bg-black/40 backdrop-blur-sm pt-16 pb-16 lg:pb-4 z-20 duration-500 overflow-y-scroll';

	/*
	 *	Function that handles the closing of the settings panel.
	 *	@returns {void}
	 */
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
			<SettingsNews />
			<SettingsAnimation />
			<SettingsLocalTime />
			<SettingsTime />
			<SettingsCurrency />
			<SettingsCrypto />
			<SettingsWeather />
		</div>
	);
};

export default SettingsPanel;
