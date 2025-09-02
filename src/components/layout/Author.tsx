import { getLanguageSettings } from '../options/settings/settingsUtils';

/* Display the information about the author and personal links. */
const Footer = () => {
	return (
		<div className="absolute top-2 text-center text-sm text-gray-800">
			{getLanguageSettings() === 'cs'
				? 'Vytvořil David Toman v roce 2025'
				: 'Created by David Toman in 2025'}{' '}
			|{' '}
			<a href="mailto:davidtoman1997@gmail.com" target="_blank">
				<u>E-mail</u>
			</a>{' '}
			|{' '}
			<a href="https://www.linkedin.com/in/dtoman1997/" target="_blank">
				<u>LinkedIn</u>
			</a>{' '}
			|{' '}
			<a href="https://github.com/Decacolix/" target="_blank">
				<u>GitHub</u>
			</a>
		</div>
	);
};

export default Footer;
