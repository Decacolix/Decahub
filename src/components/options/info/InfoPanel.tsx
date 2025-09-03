import { use } from 'react';
import { SettingsContext } from '../../../App';
import { getLanguageSettings } from '../settings/settingsUtils';
import closeIcon from '../../../assets/icons/close-icon.svg';
import calendarDayImage from '../../../assets/images/calendar-day.png';
import calendarYearsImage from '../../../assets/images/calendar-years.png';
import pinImage from '../../../assets/images/pin.png';

/* Info panel containing the information about the page, displayed when user clicks on the info icon in the menu. */
const InfoPanel = () => {
	const imagePanelStyles: string = 'w-[200px] lg:w-[300px] p-4';
	const imageTextStyles: string = 'text-center pt-3';
	const linkStyles: string = 'underline';

	const { infoDisplayed, setInfoDisplayed } = use(SettingsContext);

	const infoStyles: string =
		(infoDisplayed ? 'pointer-events-auto' : 'pointer-events-none opacity-0') +
		' duration-500 overflow-y-auto overflow-x-auto bg-black/40 backdrop-blur-sm fixed top-[50%] left-[50%] translate-[-50%] z-30 w-[100vw] h-[100vh] lg:w-[1000px] lg:h-auto p-8 flex flex-col justify-center items-center pt-[75vh] sm:pt-15 lg:pt-10';

	/* Hide the info panel on click of the close icon. */
	const handleInfoClose = (): void => {
		setInfoDisplayed(prevInfoDisplayed => !prevInfoDisplayed);
	};

	return (
		<div className={infoStyles}>
			<div
				className="w-6 h-6 absolute top-10 lg:top-4 right-4 hover:cursor-pointer hover:opacity-50"
				onClick={() => handleInfoClose()}
				style={{ backgroundImage: `url("${closeIcon}")` }}
			/>
			<div className="flex justify-between w-[100%]">
				<div className={imagePanelStyles}>
					<img src={calendarDayImage} />
					<p className={imageTextStyles}>
						{getLanguageSettings() === 'cs'
							? 'Najeďte na den v kalendáři pro zobrazení svátku.'
							: 'Hover over a day in the calendar to display the name day'}
					</p>
				</div>
				<div className={imagePanelStyles}>
					<img src={calendarYearsImage} />
					<p className={imageTextStyles}>
						{getLanguageSettings() === 'cs'
							? 'Klikněte na rok v horní části kalendáře pro přepnutí zobrazení mezi měsíci a roky.'
							: 'Click on the year in the upper part of the calendar to switch the view between months and years.'}
					</p>
				</div>
				<div className={imagePanelStyles}>
					<img src={pinImage} />
					<p className={imageTextStyles}>
						{getLanguageSettings() === 'cs'
							? 'Pro připnutí měny na vrch seznamu klikněte na ikonu hvězdy.'
							: 'To pin the currency to the top of the list, click on the star icon.'}
					</p>
				</div>
			</div>
			<div className="flex justify-between w-[100%] px-2 lg:px-4 ">
				<div className="mt-6 px-2 lg:px-4">
					<p>
						{getLanguageSettings() === 'cs'
							? 'Použité technologie pro tvorbu stránky:'
							: 'Technologies used to build the website:'}
					</p>
					<ul className="list-disc list-inside mt-2">
						<li>
							<a
								className={linkStyles}
								href="https://www.typescriptlang.org/"
								target="_blank"
							>
								TypeScript
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako programovací jazyk'
								: 'as a programming language'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://react.dev/"
								target="_blank"
							>
								React
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako knihovna'
								: 'as a library'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://tailwindcss.com/"
								target="_blank"
							>
								Tailwind
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako CSS framework'
								: 'as a CSS framework'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://code.visualstudio.com/"
								target="_blank"
							>
								Visual Studio Code
							</a>{' '}
							{getLanguageSettings() === 'cs' ? 'jako editor' : 'as an editor'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.adobe.com/products/illustrator.html/"
								target="_blank"
							>
								Adobe Illustrator
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'pro tvorbu ikon a pozadí'
								: 'to create the icons and backgrounds'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://chatgpt.com/"
								target="_blank"
							>
								ChatGPT
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako AI pomocník'
								: 'as an AI helper'}
						</li>
					</ul>
				</div>
				<div className="mt-6 px-2 lg:px-4">
					<p>
						{getLanguageSettings() === 'cs' ? 'Zdroje dat:' : 'Data sources:'}
					</p>
					<ul className="list-disc list-inside mt-2">
						<li>
							<a
								className={linkStyles}
								href="https://open-meteo.com/"
								target="_blank"
							>
								Open Meteo
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako API pro počasí'
								: 'as an weather API'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.exchangerate-api.com/"
								target="_blank"
							>
								ExchangeRate-API
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako API pro kurzy měn'
								: 'as a currency API'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.cryptocompare.com/"
								target="_blank"
							>
								CryptoCompare
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako API pro kurzy kryptoměn'
								: 'as a cryptocurrency API'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.idnes.cz/"
								target="_blank"
							>
								iDNES
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako RSS zdroj zpráv'
								: 'as an RSS news source'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://ct24.ceskatelevize.cz/"
								target="_blank"
							>
								ČT24
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako RSS zdroj zpráv'
								: 'as an RSS news source'}
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.nytimes.com/"
								target="_blank"
							>
								The New York Times
							</a>{' '}
							{getLanguageSettings() === 'cs'
								? 'jako RSS zdroj zpráv'
								: 'as an RSS news source'}
						</li>
					</ul>
				</div>
			</div>
			<p className="mt-6">
				{getLanguageSettings() === 'cs'
					? 'Předchozí verze:'
					: 'Previous version:'}{' '}
				<a className={linkStyles} href="https://decahub.cz/v3" target="blank">
					Decahub.cz/v3
				</a>
			</p>
		</div>
	);
};

export default InfoPanel;
