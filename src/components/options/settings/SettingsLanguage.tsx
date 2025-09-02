import { use, useCallback } from 'react';
import { SettingsContext } from '../../../App';
import { setLanguageSettings, type TypeLanguage } from './settingsUtils';

const SettingsLanguage = () => {
	const { language, setLanguage } = use(SettingsContext);

	const handleLanguageChange = useCallback(
		(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
			setLanguage(e.currentTarget.textContent.toLowerCase() as TypeLanguage);
		},
		[setLanguageSettings(language)]
	);

	const languageStyles: string = 'cursor-pointer';

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
