import { use } from 'react';
import { SettingsContext } from '../../../App';

const InfoPanel = () => {
	const imagePanelStyles: string = 'w-[200px] lg:w-[300px] p-4';
	const imageTextStyles: string = 'text-center pt-3';
	const linkStyles: string = 'underline';

	const { infoDisplayed, setInfoDisplayed } = use(SettingsContext);

	const handleInfoClose = (): void => {
		setInfoDisplayed(prevInfoDisplayed => !prevInfoDisplayed);
	};

	const infoStyles: string =
		(infoDisplayed ? 'pointer-events-auto' : 'pointer-events-none opacity-0') +
		' duration-500 overflow-y-auto overflow-x-auto bg-black/40 backdrop-blur-sm fixed top-[50%] left-[50%] translate-[-50%] z-30 w-[100vw] h-[100vh] lg:w-[1000px] lg:h-auto p-8 flex flex-col justify-center items-center pt-35 sm:pt-15 lg:pt-10';

	return (
		<div className={infoStyles}>
			<div
				className="bg-[url(src/assets/icons/close-icon.svg)] w-6 h-6 absolute top-4 right-4 hover:cursor-pointer hover:opacity-50"
				onClick={() => handleInfoClose()}
			/>
			<div className="flex justify-between w-[100%]">
				<div className={imagePanelStyles}>
					<img src="src/assets/images/calendar-day.png" />
					<p className={imageTextStyles}>
						Najeďte na den v kalendáři pro zobrazení svátku.
					</p>
				</div>
				<div className={imagePanelStyles}>
					<img src="src/assets/images/calendar-years.png" />
					<p className={imageTextStyles}>
						Klikněte na rok v horní části kalendáře pro přepnutí zobrazení mezi
						měsíci a roky.
					</p>
				</div>
				<div className={imagePanelStyles}>
					<img src="src/assets/images/pin.png" />
					<p className={imageTextStyles}>
						Pro připnutí měny na vrch seznamu klikněte na ikonu hvězdy.
					</p>
				</div>
			</div>
			<div className="flex justify-between w-[100%] px-4 ">
				<div className="mt-6 px-4">
					<p>Použité technologie pro tvorbu stránky:</p>
					<ul className="list-disc list-inside mt-2">
						<li>
							<a
								className={linkStyles}
								href="https://www.typescriptlang.org/"
								target="_blank"
							>
								TypeScript
							</a>{' '}
							jako programovací jazyk
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://react.dev/"
								target="_blank"
							>
								React
							</a>{' '}
							jako knihovna
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://tailwindcss.com/"
								target="_blank"
							>
								Tailwind
							</a>{' '}
							jako CSS framework
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://code.visualstudio.com/"
								target="_blank"
							>
								Visual Studio Code
							</a>{' '}
							jako editor
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.adobe.com/products/illustrator.html"
								target="_blank"
							>
								Adobe Illustrator
							</a>{' '}
							pro tvorbu ikon
						</li>
					</ul>
				</div>
				<div className="mt-6 px-4">
					<p>Zdroje dat:</p>
					<ul className="list-disc list-inside mt-2">
						<li>
							<a
								className={linkStyles}
								href="https://open-meteo.com/"
								target="_blank"
							>
								Open Meteo
							</a>{' '}
							jako API pro počasí
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.exchangerate-api.com/"
								target="_blank"
							>
								ExchangeRate-API
							</a>{' '}
							jako API pro kurzy měn
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.cryptocompare.com/"
								target="_blank"
							>
								CryptoCompare
							</a>{' '}
							jako API pro kurzy kryptoměn
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://www.idnes.cz/"
								target="_blank"
							>
								iDNES
							</a>{' '}
							jako RSS zdroj zpráv
						</li>
						<li>
							<a
								className={linkStyles}
								href="https://ct24.ceskatelevize.cz/"
								target="_blank"
							>
								ČT24
							</a>{' '}
							jako RSS zdroj zpráv
						</li>
					</ul>
				</div>
			</div>
			<p className="mt-6">
				Předchozí verze:{' '}
				<a className={linkStyles} href="https://decahub.cz/v3" target="blank">
					Decahub.cz/v3
				</a>
			</p>
		</div>
	);
};

export default InfoPanel;
