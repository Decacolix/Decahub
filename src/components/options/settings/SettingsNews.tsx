import { NEWS_SOURCES } from '../../../constants/newsSources';
import { SettingsContext } from '../../../App';
import { use, useCallback } from 'react';
import { setNewsSourceSettings } from './settingsUtils';

export const newsSourceUrls: {
	source: string;
	urlBg: string;
	urlImg: string;
	page: string;
}[] = [
	{
		source: NEWS_SOURCES[0],
		urlBg: 'bg-[url(src/assets/logos/idnes-logo.svg)]',
		urlImg: 'src/assets/logos/idnes-logo.svg',
		page: 'https://www.idnes.cz/',
	},
	{
		source: NEWS_SOURCES[1],
		urlBg: 'bg-[url(src/assets/logos/ct24-logo.svg)]',
		urlImg: 'src/assets/logos/ct24-logo.svg',
		page: 'https://ct24.ceskatelevize.cz/',
	},
];

const SettingsNews = () => {
	const newsStyles: string =
		'bg-no-repeat bg-center bg-size-[65%] w-[50%] h-20 mx-2 hover:cursor-pointer hover:outline-2 list-none flex';

	const { currentNewsSource, setCurrentNewsSource } = use(SettingsContext);

	const handleNewsSourceChange = useCallback(
		(source: string): void => {
			setCurrentNewsSource(source);
		},
		[setNewsSourceSettings(currentNewsSource)]
	);

	return (
		<>
			<h1 className="my-4 px-7 text-2xl">Zdroj zpráv</h1>
			<div className="flex px-6">
				{newsSourceUrls.map(newsSourceUrl => (
					<li
						className={
							(newsSourceUrl.source === currentNewsSource
								? 'outline-2'
								: 'outline-0') +
							' ' +
							newsStyles +
							' ' +
							newsSourceUrl.urlBg
						}
						key={newsSourceUrl.source}
						onClick={() => {
							handleNewsSourceChange(newsSourceUrl.source);
						}}
					/>
				))}
			</div>
		</>
	);
};

export default SettingsNews;
