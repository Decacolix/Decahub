import { useCallback, useEffect, useState } from 'react';
import {
	getThemeSettings,
	setTheme,
	setThemeSettings,
	type TypeTheme,
} from './settingsUtils';

const SettingsTheme = () => {
	const themeStyles: string =
		'bg-no-repeat bg-center bg-cover w-[33%] h-20 list-none mx-2 hover:cursor-pointer hover:outline-2 ';
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
		setTheme(currentTheme);
	}, [currentTheme]);

	const handleThemeChange = useCallback(
		(theme: TypeTheme) => {
			setCurrentTheme(theme);
		},
		[setThemeSettings(currentTheme)]
	);

	return (
		<>
			<h1 className="px-7 mb-3 text-2xl">Téma</h1>
			<div className="flex px-6">
				{themeUrls.map(themeUrl => (
					<li
						className={
							(themeUrl.name === currentTheme ? 'outline-2' : 'outline-0') +
							' ' +
							themeStyles +
							' ' +
							themeUrl.url
						}
						key={themeUrl.name}
						onClick={() => handleThemeChange(themeUrl.name as TypeTheme)}
					/>
				))}
			</div>
		</>
	);
};

export default SettingsTheme;
