import { useCallback, useEffect, useState } from 'react';
import {
	getLanguageSettings,
	getThemeSettings,
	setTheme,
	setThemeSettings,
	type TypeTheme,
} from './settingsUtils';
import pinkBackground from '../../../assets/backgrounds/background-pink.svg';
import greenBackground from '../../../assets/backgrounds/background-green.svg';
import blueBackground from '../../../assets/backgrounds/background-blue.svg';
import { DEFAULT_SETTINGS } from '../../../constants/defaultSettings';

/*
 *	Component that displays images of different themes to set one of them.
 *	@returns {JSX:Element}
 */
const SettingsTheme = () => {
	const [currentTheme, setCurrentTheme] = useState<TypeTheme>(
		getThemeSettings()
	);

	const themeUrls: { name: string; url: string }[] = [
		{
			name: 'pink',
			url: pinkBackground,
		},
		{
			name: 'green',
			url: greenBackground,
		},
		{
			name: 'blue',
			url: blueBackground,
		},
	];

	/*
	 *	Hook that handles setting the theme when it changes.
	 */
	useEffect(() => {
		setTheme(currentTheme || DEFAULT_SETTINGS.theme);
	}, [currentTheme]);

	/*
	 *	Function that handles the change of the theme.
	 * 	@param {TypeTheme} theme – The selected theme.
	 *	@returns {void}
	 */
	const handleThemeChange = useCallback(
		(theme: TypeTheme): void => {
			setCurrentTheme(theme);
		},
		[setThemeSettings(currentTheme || DEFAULT_SETTINGS.theme)]
	);

	return (
		<>
			<h1 className="px-7 mb-3 text-2xl">
				{getLanguageSettings() === 'cs' ? 'Téma' : 'Theme'}
			</h1>
			<div className="flex px-6">
				{themeUrls.map(themeUrl => (
					<li
						className={
							(themeUrl.name === (currentTheme || DEFAULT_SETTINGS.theme)
								? 'outline-2'
								: 'outline-0') +
							' ' +
							'bg-no-repeat bg-center bg-cover w-[33%] h-20 list-none mx-2 hover:cursor-pointer hover:outline-2 '
						}
						key={themeUrl.name}
						onClick={() => handleThemeChange(themeUrl.name as TypeTheme)}
						style={{ backgroundImage: `url("${themeUrl.url}")` }}
					/>
				))}
			</div>
		</>
	);
};

export default SettingsTheme;
