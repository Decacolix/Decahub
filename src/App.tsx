import { createContext, useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import Grid from './components/layout/Grid';
import Menu from './components/layout/Menu';
import SettingsPanel from './components/options/settings/SettingsPanel';
import {
	getDefaultSettings,
	setDefaultSettings,
} from './components/options/settings/settingsUtils';

type TypeSettingsDisplayedContext = {
	settingsDisplayed: boolean;
	setSettingsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
};

type TypeSettingsLoadingContext = {
	settingsLoading: boolean;
	setSettingsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsDisplayedContext =
	createContext<TypeSettingsDisplayedContext>({
		settingsDisplayed: false,
		setSettingsDisplayed: () => '',
	});

export const SettingsLoadingContext = createContext<TypeSettingsLoadingContext>(
	{
		settingsLoading: false,
		setSettingsLoading: () => '',
	}
);

const App = () => {
	const [settingsDisplayed, setSettingsDisplayed] = useState(false);

	useEffect(() => {
		if (!getDefaultSettings() || Object.keys(getDefaultSettings()).length === 0)
			setDefaultSettings();

		document.body.style.overflowX = 'hidden';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundPosition = 'center';
	}, []);

	return (
		<div className="h-screen font-[Nata_Sans] text-white">
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
