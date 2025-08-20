import { createContext, useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import Grid from './components/layout/Grid';
import Menu from './components/layout/Menu';
import SettingsPanel from './components/options/settings/SettingsPanel';
import { setDefaultSettings } from './components/options/settings/settingsUtils';

type TypeSettingsDisplayedContext = {
	settingsDisplayed: boolean;
	setSettingsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsDisplayedContext =
	createContext<TypeSettingsDisplayedContext>({
		settingsDisplayed: false,
		setSettingsDisplayed: () => '',
	});

const App = () => {
	useEffect(() => {
		setDefaultSettings();

		document.body.style.overflowX = 'hidden';
	}, []);

	const [settingsDisplayed, setSettingsDisplayed] = useState(false);

	return (
		<div className="bg-[url(./assets/backgrounds/background-pink.svg)] bg-no-repeat bg-cover h-screen font-[Nata_Sans] text-white">
			<SettingsDisplayedContext
				value={{ settingsDisplayed, setSettingsDisplayed }}
			>
				<Menu />

				<SettingsPanel />
			</SettingsDisplayedContext>
			<Grid />
			<Footer />
		</div>
	);
};

export default App;
