import { NEWS_SOURCES } from '../../../constants/newsSources';
import { SettingsContext } from '../../../App';
import { use, useCallback } from 'react';
import { getLanguageSettings, setNewsSourceSettings } from './settingsUtils';
import newsSourceLogoA from '../../../assets/logos/idnes-logo.svg';
import newsSourceLogoB from '../../../assets/logos/ct24-logo.svg';
import newsSourceLogoC from '../../../assets/logos/newyorktimes-logo.svg';

export const newsSourceUrls: {
	source: string;
	url: string;
	page: string;
}[] = [
	{
		source: NEWS_SOURCES[0],
		url: newsSourceLogoA,
		page: 'https://www.idnes.cz/',
	},
	{
		source: NEWS_SOURCES[1],
		url: newsSourceLogoB,
		page: 'https://ct24.ceskatelevize.cz/',
	},
	{
		source: NEWS_SOURCES[2],
		url: newsSourceLogoC,
		page: 'https://www.nytimes.com/',
	},
];

/* Settings to select the source of the news on the page. */
const SettingsNews = () => {
	const { currentNewsSource, setCurrentNewsSource } = use(SettingsContext);

	/* On click of the news logo, switch to the clicked news source. */
	const handleNewsSourceChange = useCallback(
		(source: string): void => {
			setCurrentNewsSource(source);
		},
		[setNewsSourceSettings(currentNewsSource)]
	);

	return (
		<>
			<h1 className="my-4 px-7 text-2xl">
				{getLanguageSettings() === 'cs' ? 'Zdroj zpráv' : 'News source'}
			</h1>
			<div className="flex px-6">
				{newsSourceUrls.map(newsSourceUrl => (
					<li
						className={
							(newsSourceUrl.source === currentNewsSource
								? 'outline-2'
								: 'outline-0') +
							' ' +
							'bg-no-repeat bg-center bg-size-[65%] w-[50%] h-20 mx-2 hover:cursor-pointer hover:outline-2 list-none flex'
						}
						key={newsSourceUrl.source}
						onClick={() => {
							handleNewsSourceChange(newsSourceUrl.source);
						}}
						style={{ backgroundImage: `url("${newsSourceUrl.url}")` }}
					/>
				))}
			</div>
		</>
	);
};

export default SettingsNews;
