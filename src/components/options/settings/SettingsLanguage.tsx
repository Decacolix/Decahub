import { use, useCallback } from 'react';
import { SettingsContext } from '../../../App';
import { setLanguageSettings, type TypeLanguage } from './settingsUtils';

/*
 *	Component that displays a switch to set the language to either Czech or English.
 *	@returns {JSX:Element}
 */
const SettingsLanguage = () => {
	const { language, setLanguage } = use(SettingsContext);

	const languageStyles: string = 'cursor-pointer';

	/*
	 *	Function that handles the change of the language.
	 *  @param {React.MouseEvent<HTMLSpanElement, MouseEvent>} e – Event of the clicked element.
	 *	@returns {void}
	 */
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
