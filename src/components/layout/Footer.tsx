import { getThemeSettings } from '../options/settings/settingsUtils';

const Footer = () => {
	return (
		<footer
			className={
				(getThemeSettings() === 'green' ? 'text-gray-900' : 'text-gray-600') +
				' text-center absolute left-[50vw] bottom-1 translate-[-50%]'
			}
		>
			&copy; 2025 David Toman |{' '}
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
		</footer>
	);
};

export default Footer;
