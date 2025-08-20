import { useCallback, useEffect, useState } from 'react';
import {
	getThemeSettings,
	setThemeSettings,
	type TypeTheme,
} from './settingsUtils';

const SettingsTheme = () => {
	const themeStyles: string =
		'bg-no-repeat bg-center w-40 h-20 list-none mx-2 hover:cursor-pointer ';
	const themeUrls: { name: string; url: string }[] = [
		{
			name: 'pink',
			url: 'bg-[url(./assets/backgrounds/background-pink.svg)]',
		},
		{
			name: 'green',
			url: 'bg-[url(./assets/backgrounds/background-green.svg)]',
		},
		{
			name: 'blue',
			url: 'bg-[url(./assets/backgrounds/background-blue.svg)]',
		},
	];

	const [currentTheme, setCurrentTheme] = useState<TypeTheme>(
		getThemeSettings()
	);

	useEffect(() => {
		document.body.style.backgroundImage = `url("./src/assets/backgrounds/background-${currentTheme}.svg")`;
	}, [currentTheme]);

	const handleThemeChange = useCallback(
		(theme: TypeTheme) => {
			setCurrentTheme(theme);
		},
		[setThemeSettings(currentTheme)]
	);

	return (
		<div className="flex px-4">
			{themeUrls.map(themeUrl => (
				<li
					className={themeStyles + ' ' + themeUrl.url}
					key={themeUrl.name}
					onClick={() => handleThemeChange(themeUrl.name as TypeTheme)}
				/>
			))}
		</div>
	);
};

export default SettingsTheme;
