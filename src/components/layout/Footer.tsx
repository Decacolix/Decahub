const Footer = () => {
	return (
		<footer className="text-gray-700 text-center absolute left-[50vw] bottom-1 translate-[-50%]">
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
			</a>{' '}
			&#9679; Vytvořeno v jazyce TypeScript s použitím knihovny React
		</footer>
	);
};

export default Footer;