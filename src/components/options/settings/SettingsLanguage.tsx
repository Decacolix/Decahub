import { use, useCallback } from 'react';
import { SettingsContext } from '../../../App';
import { setLanguageSettings, type TypeLanguage } from './settingsUtils';

/* Settings to switch between the Czech and the English language. */
const SettingsLanguage = () => {
	const { language, setLanguage } = use(SettingsContext);

	const languageStyles: string = 'cursor-pointer';

	/* On click of either 'CS' or 'EN', switch to the clicked language. */
	const handleLanguageChange = useCallback(
		(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
			setLanguage(e.currentTarget?.textContent?.toLowerCase() as TypeLanguage);
		},
		[setLanguageSettings(language)]
	);

	return (
		<div className="absolute top-6 left-6">
			<span
				className={`${language === 'cs' ? 'font-bold' : ''} ${languageStyles}`}
				onClick={e => handleLanguageChange(e)}
			>
				CS
			</span>
			<span> | </span>
			<span
				className={`${language === 'en' ? 'font-bold' : ''} ${languageStyles}`}
				onClick={e => handleLanguageChange(e)}
			>
				EN
			</span>
		</div>
	);
};

export default SettingsLanguage;
